import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(req: Request) {
  try {
    console.log("🔥 API HIT")

    // ✅ SAFE JSON PARSE (prevents crash)
    let body: any = {}
    try {
      body = await req.json()
    } catch {
      body = {}
    }

    const priceId = body.priceId

    console.log("PRICE RECEIVED:", priceId)

    if (!priceId) {
      return NextResponse.json(
        { error: "Missing priceId" },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/dashboard",
      cancel_url: "http://localhost:3000/pricing",
    })

    console.log("✅ SESSION CREATED:", session.url)

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error("❌ STRIPE ERROR:", err.message)

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}