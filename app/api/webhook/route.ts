import { headers } from "next/headers"
import Stripe from "stripe"
import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = headers().get("stripe-signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
  } catch (err) {
    console.error("Webhook signature error:", err)
    return new NextResponse("Invalid signature", { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session

        const userId = session.metadata?.user_id
        const customerId = session.customer as string
        const subscriptionId = session.subscription as string

        if (!userId) break

        await supabase.from("subscriptions").upsert({
          user_id: userId,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          status: "active",
        })

        break
      }

      case "customer.subscription.deleted":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription

        const customerId = subscription.customer as string

        await supabase
          .from("subscriptions")
          .update({
            status: subscription.status,
          })
          .eq("stripe_customer_id", customerId)

        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error("Webhook processing error:", err)
    return new NextResponse("Webhook error", { status: 500 })
  }
}