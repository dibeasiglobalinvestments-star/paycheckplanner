"use client"

export default function PricingPage() {
  const handleCheckout = async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
    })

    const data = await res.json()

    if (data.url) {
      window.location.href = data.url
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">

        <h1 className="text-3xl font-bold text-center mb-10">
          Upgrade Your Financial Control
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          {/* FREE PLAN */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-semibold mb-4">Free</h2>
            <p className="text-gray-400 mb-6">$0/month</p>

            <ul className="space-y-2 text-sm text-gray-300">
              <li>✔ Track debts, bills, assets</li>
              <li>✔ Basic dashboard</li>
              <li>✔ Net worth tracking</li>
            </ul>
          </div>

          {/* PREMIUM PLAN */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-green-500 relative">
            <span className="absolute top-3 right-3 text-xs bg-green-500 px-2 py-1 rounded">
              Most Popular
            </span>

            <h2 className="text-xl font-semibold mb-4">Premium</h2>
            <p className="text-2xl font-bold mb-6">$9/month</p>

            <ul className="space-y-2 text-sm text-gray-300 mb-6">
              <li>✔ AI financial insights</li>
              <li>✔ Smart savings optimization</li>
              <li>✔ Advanced projections</li>
              <li>✔ Priority support</li>
            </ul>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-500 hover:bg-green-600 text-black py-3 rounded-lg font-medium"
            >
              Upgrade Now
            </button>
          </div>

        </div>

        <p className="text-center text-xs text-gray-500 mt-10">
          Paycheck Planner is a product of DiBeasi Global Investments LLC
        </p>

      </div>
    </div>
  )
}