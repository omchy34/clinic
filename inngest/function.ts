// inngest/function.ts

import { prisma } from "@/lib/prisma";
import { inngest } from "./client";
import { fetchPayments } from "@/lib/cashfree";
import { applySuccessfulPayment } from "@/lib/payment-confirm";

// inggest create user data

export const syncUserCreate = inngest.createFunction({
    id: "sync-user-create",
    triggers: [
        {
            event: "clerk/user.created",
        }
    ]
},

    async ({ event }) => {
        const { data } = event;
        await prisma.user.create({
            data: {
                id: data.id,
                email: data.email_addresses[0].email_address,
                name: `${data.first_name} ${data.last_name}`,
                image: data.image_url,
            }
        })
    }
)


// inggest update user data

export const syncUserDataUpdate = inngest.createFunction(
    {
        id: "sync-user-update",
        triggers: [{
            event: "clerk/user.updated"
        }]
    },

    async ({ event }) => {
        const { data } = event;

        await prisma.user.update({
            where: { id: data.id },
            data: {
                email: data.email_addresses[0].email_address,
                name: `${data.first_name} ${data.last_name}`,
                image: data.image_url,
            }
        })
    }
)

// inngest delete user 

export const syncUserDeletion = inngest.createFunction(
    {
        id: "sync-user-delete",
        triggers: [{
            event: "clerk/user.deleted"
        }]
    },

    async ({ event }) => {
        const { data } = event;

        await prisma.user.delete({
            where: { id: data.id },
        })
    }
)

// Unpaid tokens saaf karo (har 5 min). Payment window 10 min + 2 min grace.

const GRACE_MS = 2 * 60 * 1000;
const BATCH = 50;

export const expireUnpaidTokens = inngest.createFunction(
    {
        id: "expire-unpaid-tokens",
        triggers: [{ cron: "*/5 * * * *" }],
    },

    async ({ step }) => {
        return step.run("expire-unpaid", async () => {
            const stale = await prisma.booking.findMany({
                where: {
                    status: "PENDING_PAYMENT",
                    expiresAt: { lt: new Date(Date.now() - GRACE_MS) },
                },
                orderBy: { expiresAt: "asc" },
                take: BATCH,
                select: {
                    id: true,
                    payment: { select: { cashfreeOrderId: true } },
                },
            });

            let expired = 0;
            let confirmed = 0;

            for (const b of stale) {
                // Cashfree se poocho: kya is order pe paisa kat chuka hai?
                if (b.payment) {
                    let success: Awaited<ReturnType<typeof fetchPayments>>[number] | undefined;
                    try {
                        const attempts = await fetchPayments(b.payment.cashfreeOrderId);
                        success = attempts.find((a) => a.payment_status === "SUCCESS");
                    } catch (err) {
                        // Cashfree se jawab nahi mila: expire mat karo, agli baar dobara dekhenge
                        console.error("expireUnpaidTokens: Cashfree check failed", b.id, err);
                        continue;
                    }

                    // Paisa kata hua hai: token confirm karo (webhook/verify miss ho gaye the)
                    if (success) {
                        const result = await applySuccessfulPayment(b.payment.cashfreeOrderId, {
                            cfPaymentId: String(success.cf_payment_id),
                            amountRupees: success.payment_amount,
                            method: success.payment_group,
                        });
                        if (result === "CONFIRMED") confirmed++;
                        continue; // confirm ho gaya, ya koi dikkat hai: dono me expire nahi karna
                    }
                }

               
                // Paisa nahi kata: token expire (number free ho jata hai)
                const upd = await prisma.booking.updateMany({
                    where: { id: b.id, status: "PENDING_PAYMENT" },
                    data: {
                        status: "EXPIRED",
                        activeTokenNumber: null,
                        cancelledBy: "SYSTEM",
                        cancelReason: "PAYMENT_TIMEOUT",
                    },
                });
                expired += upd.count;
            }

            return { checked: stale.length, expired, confirmed };
        });
    }
);