"use client"

import Image from "next/image"

export default function PricingPage() {

  const handleCheckout = async (priceId: string) => {
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
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 pt-6 pb-12">

      {/* LOGO */}
      <div className="flex justify-center mb-6">
        <Image
          src="/logo.png"
          alt="Paycheck Planner"
          width={300}
          height={300}
          priority
        />
      </div>

      <h1 className="text-4xl text-center font-bold mb-8">
        Choose Your Plan
      </h1>

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
          <p className="text-3xl mb-6">$3/mo</p>

          <ul className="space-y-2 text-sm mb-6">
            <li>✔ Up to 10 debts</li>
            <li>✔ Charts & visual insights</li>
            <li>✔ Snowball & Avalanche tools</li>
            <li>✔ Payment planning system</li>
            <li>✔ Monthly progress tracking</li>
            <li>✔ Goal setting</li>
            <li className="text-gray-500">✖ AI insights</li>
            <li className="text-gray-500">✖ Advanced analytics</li>
            <li className="text-gray-500">✖ Export reports</li>
          </ul>

          <button
            onClick={() => handleCheckout("price_1TIwD3FNVPZvQT3GJ5vGJ4kR")}
            className="w-full bg-green-500 py-2 rounded font-semibold"
          >
            Upgrade to Starter
          </button>
        </div>

        {/* PREMIUM */}
        <div className="border border-green-500 rounded-xl p-6 bg-[#0f172a]">
          <h2 className="text-xl mb-2">Premium</h2>
          <p className="text-3xl mb-6">$6/mo</p>

          <ul className="space-y-2 text-sm mb-6">
            <li>✔ Unlimited debts</li>
            <li>✔ Charts & deep analytics</li>
            <li>✔ Snowball & Avalanche tools</li>
            <li>✔ AI financial insights</li>
            <li>✔ Smart payoff recommendations</li>
            <li>✔ Advanced analytics dashboard</li>
            <li>✔ Export reports (PDF/CSV)</li>
            <li>✔ Priority support</li>
            <li>✔ Early access to new features</li>
          </ul>

          <button
            onClick={() => handleCheckout("price_1TIwE2FNVPZvQT3G1Wf7uVcb")}
            className="w-full bg-green-500 py-2 rounded font-semibold"
          >
            Upgrade to Premium
          </button>
        </div>

      </div>
    </div>
  )
}