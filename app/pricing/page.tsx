"use client"

import { useState } from "react"
import Image from "next/image"

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)

  const handleCheckout = async (priceId: string, plan: string) => {
    if (loading) return
    setLoading(plan)

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || "Checkout failed")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    }

    setLoading(null)
  }

  // ✅ YOUR REAL PRICE IDS
  const PRICES = {
    starterMonthly: "price_1TIwD3FNVPZvQT3GJ5vGJ4kR",
    starterAnnual: "price_1TIyAEFNVPZvQT3GLjhBbiVy",
    premiumMonthly: "price_1TIwE2FNVPZvQT3G1Wf7uVcb",
    premiumAnnual: "price_1TIy9dFNVPZvQT3GXT5XzHLV",
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 pt-6 pb-12">

      {/* LOGO */}
      <div className="flex justify-center mb-4">
        <Image
          src="/logo.png"
          alt="Paycheck Planner"
          width={300}
          height={300}
          priority
        />
      </div>

      <h1 className="text-4xl text-center font-bold mb-6">
        Choose Your Plan
      </h1>

      {/* TOGGLE */}
      <div className="flex justify-center mb-10">
        <div className="bg-[#0f172a] p-1 rounded-lg flex">
          <button
            onClick={() => setAnnual(false)}
            className={`px-6 py-2 rounded ${
              !annual ? "bg-green-500" : "text-gray-400"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-6 py-2 rounded ${
              annual ? "bg-green-500" : "text-gray-400"
            }`}
          >
            Annual (Save ~8%)
          </button>
        </div>
      </div>

      {/* PLANS */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {/* FREE */}
        <div className="border border-gray-700 rounded-xl p-6 bg-[#0f172a]">
          <h2 className="text-xl mb-2">Free</h2>
          <p className="text-3xl mb-6">$0</p>

          <ul className="space-y-2 text-sm mb-6">
            <li>✔ Up to 3 debts</li>
            <li>✔ Manual tracking</li>
            <li>✔ Basic dashboard</li>
            <li className="text-gray-500">✖ Charts</li>
            <li className="text-gray-500">✖ Snowball / Avalanche</li>
            <li className="text-gray-500">✖ AI insights</li>
            <li className="text-gray-500">✖ Advanced analytics</li>
            <li className="text-gray-500">✖ Export reports</li>
            <li className="text-gray-500">✖ Priority support</li>
          </ul>

          <button className="w-full bg-gray-600 py-2 rounded">
            Current Plan
          </button>
        </div>

        {/* STARTER */}
        <div className="border border-gray-700 rounded-xl p-6 bg-[#0f172a]">

          <h2 className="text-xl mb-2">Starter</h2>

          <p className="text-3xl font-bold">
            {annual ? "$33/year" : "$3/mo"}
          </p>

          {annual && (
            <p className="text-green-400 text-sm mb-4">
              Save $3/year vs monthly
            </p>
          )}

          <ul className="space-y-2 text-sm mb-6">
            <li>✔ Up to 10 debts</li>
            <li>✔ Charts & visual insights</li>
            <li>✔ Snowball & Avalanche tools</li>
            <li>✔ Payment planning system</li>
            <li>✔ Monthly progress tracking</li>
            <li>✔ Goal setting</li>
            <li>✔ Debt payoff timeline</li>
            <li className="text-gray-500">✖ AI insights</li>
            <li className="text-gray-500">✖ Advanced analytics</li>
          </ul>

          <button
            onClick={() =>
              handleCheckout(
                annual
                  ? PRICES.starterAnnual
                  : PRICES.starterMonthly,
                "starter"
              )
            }
            className="w-full bg-green-500 py-2 rounded font-semibold"
          >
            {loading === "starter" ? "Loading..." : "Upgrade to Starter"}
          </button>
        </div>

        {/* PREMIUM */}
        <div className="border border-green-500 rounded-xl p-6 bg-[#0f172a]">

          <h2 className="text-xl mb-2">Premium</h2>

          <p className="text-3xl font-bold">
            {annual ? "$66/year" : "$6/mo"}
          </p>

          {annual && (
            <p className="text-green-400 text-sm mb-4">
              Save $6/year vs monthly
            </p>
          )}

          <ul className="space-y-2 text-sm mb-6">
            <li>✔ Unlimited debts</li>
            <li>✔ AI financial insights</li>
            <li>✔ Smart payoff recommendations</li>
            <li>✔ Advanced analytics dashboard</li>
            <li>✔ Export reports (PDF/CSV)</li>
            <li>✔ Priority support</li>
            <li>✔ Early access to new features</li>
            <li>✔ Custom financial insights</li>
            <li>✔ Advanced projections</li>
          </ul>

          <button
            onClick={() =>
              handleCheckout(
                annual
                  ? PRICES.premiumAnnual
                  : PRICES.premiumMonthly,
                "premium"
              )
            }
            className="w-full bg-green-500 py-2 rounded font-semibold"
          >
            {loading === "premium" ? "Loading..." : "Upgrade to Premium"}
          </button>
        </div>

      </div>
    </div>
  )
}