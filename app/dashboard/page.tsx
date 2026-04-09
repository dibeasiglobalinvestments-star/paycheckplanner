import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 🔥 HARD BLOCK
  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single()

  const plan = profile?.plan ?? "free"

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <p>Your plan: <strong>{plan}</strong></p>

        {plan === "free" && (
          <p className="text-red-400 mt-2">Upgrade required</p>
        )}
      </div>

    </div>
  )
}