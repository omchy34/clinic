// inngest/function.ts


import { prisma } from "@/lib/prisma";
import { inngest } from "./client";
import { razorpay } from "@/lib/razorpay";

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
        const {data} = event ;
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
                    sessionId: true,
                    payment: { select: { id: true, razorpayOrderId: true } },
                },
            });

            let expired = 0;
            let confirmed = 0;

            for (const b of stale) {
                // Razorpay se poocho: kya is order pe paisa kat chuka hai?
                let captured: any = null;
                if (b.payment) {
                    try {
                        const res: any = await razorpay.orders.fetchPayments(b.payment.razorpayOrderId);
                        captured = res.items?.find((p: any) => p.status === "captured") ?? null;
                    } catch (err) {
                        // Razorpay se jawab nahi mila: expire mat karo, agli baar dobara dekhenge
                        console.error("expireUnpaidTokens: Razorpay check failed", b.id, err);
                        continue;
                    }
                }

                // Paisa kata hua hai: token confirm karo (webhook/verify miss ho gaye the)
                if (captured && b.payment) {
                    const payment = b.payment;
                    const ok = await prisma.$transaction(async (tx) => {
                        const upd = await tx.booking.updateMany({
                            where: { id: b.id, status: "PENDING_PAYMENT" },
                            data: { status: "CONFIRMED", expiresAt: null },
                        });
                        if (upd.count !== 1) return false;

                        await tx.payment.update({
                            where: { id: payment.id },
                            data: {
                                status: "PAID",
                                razorpayPaymentId: captured.id,
                                gatewayFee: captured.fee ?? 0,
                                gatewayTax: captured.tax ?? 0,
                                method: captured.method ?? null,
                                paidAt: new Date(),
                            },
                        });
                        await tx.doctorSession.update({
                            where: { id: b.sessionId },
                            data: { queueVersion: { increment: 1 } },
                        });
                        return true;
                    });
                    if (ok) confirmed++;
                    continue;
                }

                // Paisa nahi kata: token expire
                const upd = await prisma.booking.updateMany({
                    where: { id: b.id, status: "PENDING_PAYMENT" },
                    data: { status: "EXPIRED", cancelledBy: "SYSTEM", cancelReason: "PAYMENT_TIMEOUT" },
                });
                expired += upd.count;
            }

            return { checked: stale.length, expired, confirmed };
        });
    }
);