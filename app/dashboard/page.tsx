import { createClient } from "@/lib/supabase/server"
import DashboardClient from "./DashboardClient"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return <div className="p-6 text-white">Not authenticated</div>
  }

  const [debtsRes, billsRes, assetsRes] = await Promise.all([
    supabase.from("debts").select("*").eq("user_id", user.id),
    supabase.from("bills").select("*").eq("user_id", user.id),
    supabase.from("assets").select("*").eq("user_id", user.id),
  ])

  return (
    <DashboardClient
      debts={debtsRes.data || []}
      bills={billsRes.data || []}
      assets={assetsRes.data || []}
      email={user.email}
    />
  )
}