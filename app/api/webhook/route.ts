import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json({ error: "Webhook error" }, { status: 400 })
  }

  // 🔥 SUCCESSFUL PAYMENT
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any

    const userId = session.metadata.userId
    const priceId = session.items?.data?.[0]?.price?.id

    let plan = "free"

    if (priceId === "price_STARTER_ID") plan = "starter"
    if (priceId === "price_PREMIUM_ID") plan = "premium"

    await supabase
      .from("profiles")
      .update({ plan })
      .eq("id", userId)
  }

  return NextResponse.json({ received: true })
}