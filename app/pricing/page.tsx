"use client"

import { useState } from "react"

const FEATURES = [
  "Up to 3 debts",
  "Manual tracking",
  "Basic dashboard",
  "Charts",
  "Snowball & Avalanche",
  "AI insights",
  "Advanced analytics",
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)

  return (
    <div className="text-center">

      <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>

      {/* TOGGLE */}
      <div className="mb-10">
        <button
          onClick={() => setAnnual(false)}
          className={`mr-3 ${!annual ? "text-white" : "text-white/50"}`}
        >
          Monthly
        </button>
        <button
          onClick={() => setAnnual(true)}
          className={`${annual ? "text-white" : "text-white/50"}`}
        >
          Annual (Save 17%)
        </button>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6 text-left">

        {/* FREE */}
        <PlanCard
          title="Free"
          price="$0"
          features={[true, true, true, false, false, false, false]}
          buttonText="Current Plan"
          disabled
        />

        {/* STARTER */}
        <PlanCard
          title="Starter"
          price={annual ? "$30/year" : "$3/mo"}
          features={[true, true, true, true, true, false, false]}
          buttonText="Upgrade to Starter"
        />

        {/* PREMIUM */}
        <PlanCard
          title="Premium"
          price={annual ? "$60/year" : "$6/mo"}
          features={[true, true, true, true, true, true, true]}
          buttonText="Upgrade to Premium"
          highlight
        />

      </div>
    </div>
  )
}

/* COMPONENT */
function PlanCard({
  title,
  price,
  features,
  buttonText,
  disabled,
  highlight,
}: {
  title: string
  price: string
  features: boolean[]
  buttonText: string
  disabled?: boolean
  highlight?: boolean
}) {
  return (
    <div
      className={`border rounded-xl p-6 ${
        highlight ? "border-green-500" : "border-white/20"
      }`}
    >
      <h2 className="text-xl mb-2">{title}</h2>
      <p className="text-2xl font-bold mb-4">{price}</p>

      <ul className="space-y-2 mb-6">
        {FEATURES.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <span>{features[i] ? "✔️" : "❌"}</span>
            <span className={features[i] ? "" : "text-white/40"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        disabled={disabled}
        className={`w-full py-2 rounded ${
          disabled
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {buttonText}
      </button>
    </div>
  )
}