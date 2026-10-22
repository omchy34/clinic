// GET -> current token price. PUT { "rupees": 25 } -> price badlo (sirf naye bookings pe lagega).

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import authAdmin from "@/middlewere/authAdmin";

const DEFAULT_TOKEN_PRICE = 2000; // paise (₹20), agar admin ne abhi tak set nahi kiya

async function requireAdmin(): Promise<{ userId: string } | { error: NextResponse }> {
  const { userId } = await auth();
  if (!userId) return { error: NextResponse.json({ message: "Unauthorized" }, { status: 401 }) };

  const isAdmin = await authAdmin(userId);
  if (!isAdmin) return { error: NextResponse.json({ message: "Not authorized" }, { status: 403 }) };

  return { userId };
}

export async function GET() {
  const ctx = await requireAdmin();
  if ("error" in ctx) return ctx.error;

  try {
    const s = await prisma.platformSetting.findUnique({ where: { id: "global" } });
    const paise = s?.tokenPrice ?? DEFAULT_TOKEN_PRICE;
    return NextResponse.json(
      { tokenPrice: paise, rupees: paise / 100, updatedAt: s?.updatedAt ?? null },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("GET /api/admin/settings/token-price", err);
    return NextResponse.json({ message: "Could not load the price." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const ctx = await requireAdmin();
  if ("error" in ctx) return ctx.error;

  const body = await request.json().catch(() => null);
  const rupees = Number(body?.rupees);

  if (!Number.isFinite(rupees) || rupees < 0 || rupees > 10000) {
    return NextResponse.json({ message: "Enter a valid price in rupees." }, { status: 400 });
  }
  const paise = Math.round(rupees * 100);
  // 0 = free tokens, warna minimum ₹1 (Razorpay ka minimum order)
  if (paise !== 0 && paise < 100) {
    return NextResponse.json({ message: "Minimum price is ₹1 (or 0 for free)." }, { status: 400 });
  }

  try {
    const s = await prisma.platformSetting.upsert({
      where: { id: "global" },
      update: { tokenPrice: paise, updatedBy: ctx.userId },
      create: { id: "global", tokenPrice: paise, updatedBy: ctx.userId },
    });
    return NextResponse.json({ tokenPrice: s.tokenPrice, rupees: s.tokenPrice / 100 });
  } catch (err) {
    console.error("PUT /api/admin/settings/token-price", err);
    return NextResponse.json({ message: "Could not save the price." }, { status: 500 });
  }
}