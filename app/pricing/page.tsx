"use client"

import { useState } from "react"

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly")

  const plans = [
    {
      name: "Free",
      priceMonthly: "$0",
      priceAnnual: "$0",
      features: [
        { name: "Up to 3 debts", included: true },
        { name: "Manual tracking", included: true },
        { name: "Basic dashboard", included: true },
        { name: "Charts", included: false },
        { name: "Snowball & Avalanche", included: false },
        { name: "AI insights", included: false },
        { name: "Advanced analytics", included: false },
      ],
      button: "Current Plan",
      disabled: true,
    },
    {
      name: "Starter",
      priceMonthly: "$3/mo",
      priceAnnual: "$33/year",
      priceIdMonthly: process.env.NEXT_PUBLIC_STRIPE_STARTER_MONTHLY!,
      priceIdAnnual: process.env.NEXT_PUBLIC_STRIPE_STARTER_YEARLY!,
      features: [
        { name: "Up to 10 debts", included: true },
        { name: "Manual tracking", included: true },
        { name: "Basic dashboard", included: true },
        { name: "Charts", included: true },
        { name: "Snowball & Avalanche", included: false }, // LOCKED
        { name: "AI insights", included: false },
        { name: "Advanced analytics", included: false },
      ],
      button: "Upgrade to Starter",
    },
    {
      name: "Premium",
      priceMonthly: "$6/mo",
      priceAnnual: "$66/year",
      priceIdMonthly: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY!,
      priceIdAnnual: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY!,
      features: [
        { name: "Unlimited debts", included: true },
        { name: "Manual tracking", included: true },
        { name: "Basic dashboard", included: true },
        { name: "Charts", included: true },
        { name: "Snowball & Avalanche", included: true },
        { name: "AI insights", included: true },
        { name: "Advanced analytics", included: true },
      ],
      button: "Upgrade to Premium",
      highlight: true,
    },
  ]

  const handleCheckout = async (priceId: string) => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    })

    const data = await res.json()
    window.location.href = data.url
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">
        Choose Your Plan
      </h1>

      {/* TOGGLE */}
      <div className="flex justify-center mb-10">
        <div className="bg-[#0f172a] p-1 rounded-lg flex">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-4 py-2 rounded-md ${
              billing === "monthly"
                ? "bg-white text-black"
                : "text-gray-400"
            }`}
          >
            Monthly
          </button>

          <button
            onClick={() => setBilling("annual")}
            className={`px-4 py-2 rounded-md ${
              billing === "annual"
                ? "bg-white text-black"
                : "text-gray-400"
            }`}
          >
            Annual (1 month free)
          </button>
        </div>
      </div>

      {/* PLANS */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, idx) => {
          const price =
            billing === "monthly"
              ? plan.priceMonthly
              : plan.priceAnnual

          const priceId =
            billing === "monthly"
              ? plan.priceIdMonthly
              : plan.priceIdAnnual

          return (
            <div
              key={idx}
              className={`relative border rounded-xl p-6 ${
                plan.highlight
                  ? "border-green-500"
                  : "border-gray-700"
              }`}
            >
              {/* MOST POPULAR BADGE */}
              {plan.highlight && (
                <div className="absolute -top-3 right-4 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}

              <h2 className="text-xl font-semibold mb-2">
                {plan.name}
              </h2>

              <div className="mb-4">
                <p className="text-3xl font-bold">{price}</p>

                {billing === "annual" && plan.name === "Starter" && (
                  <p className="text-green-400 text-sm">Save $3</p>
                )}

                {billing === "annual" && plan.name === "Premium" && (
                  <p className="text-green-400 text-sm">Save $6</p>
                )}
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((f, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-2 ${
                      f.included
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {f.included ? "✔" : "✖"} {f.name}
                  </li>
                ))}
              </ul>

              <button
                disabled={plan.disabled}
                onClick={() =>
                  priceId && handleCheckout(priceId)
                }
                className={`w-full py-2 rounded-lg ${
                  plan.disabled
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {plan.button}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}