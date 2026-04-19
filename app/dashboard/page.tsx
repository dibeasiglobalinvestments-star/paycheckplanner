import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

import SummaryCards from "@/app/components/SummaryCards"
import DebtList from "@/app/components/DebtList"
import DebtStrategyRace from "@/app/components/DebtStrategyRace"
import PaywallOverlay from "@/app/components/PaywallOverlay"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single()

  const plan = profile?.plan || "free"

  const canUseCharts = plan === "starter" || plan === "premium"
  const canUseSnowball = plan === "premium"
  const canUseAI = plan === "premium"

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400 mt-1">
          Plan: <span className="text-white capitalize">{plan}</span>
        </p>
      </div>

      <SummaryCards />
      <DebtList />

      {/* CHARTS → STARTER OR PREMIUM */}
      <div className="relative bg-[#0f172a] border border-gray-700 rounded-xl p-6 overflow-hidden">
        <h2 className="text-lg font-semibold mb-4">Charts</h2>

        <div className={!canUseCharts ? "opacity-40 pointer-events-none" : ""}>
          <div>{/* chart component */}</div>
        </div>

        {!canUseCharts && (
          <PaywallOverlay
            priceId="price_1TO2RmFv1EcTs6LYp5OOlvOK" // Starter Monthly
            title="Unlock Charts"
            description="Upgrade to Starter to access charts."
          />
        )}
      </div>

      {/* SNOWBALL → PREMIUM ONLY */}
      <div className="relative bg-[#0f172a] border border-gray-700 rounded-xl p-6 overflow-hidden">
        <h2 className="text-lg font-semibold mb-4">
          Snowball & Avalanche
        </h2>

        <div className={!canUseSnowball ? "opacity-40 pointer-events-none" : ""}>
          <DebtStrategyRace plan={plan} />
        </div>

        {!canUseSnowball && (
          <PaywallOverlay
            priceId="price_1TO2SSFv1EcTs6LYVswF0AwU" // Premium Monthly
            title="Unlock Debt Strategies"
            description="Premium plan required."
          />
        )}
      </div>

      {/* AI → PREMIUM */}
      <div className="relative bg-[#0f172a] border border-gray-700 rounded-xl p-6 overflow-hidden">
        <h2 className="text-lg font-semibold mb-4">AI Insights</h2>

        <div className={!canUseAI ? "opacity-40 pointer-events-none" : ""}>
          <div>{/* AI component */}</div>
        </div>

        {!canUseAI && (
          <PaywallOverlay
            priceId="price_1TO2SSFv1EcTs6LYVswF0AwU" // Premium Monthly
            title="Unlock AI Insights"
          />
        )}
      </div>

    </div>
  )
}