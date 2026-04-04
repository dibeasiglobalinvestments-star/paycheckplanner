"use client"

import { useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function SuccessPage() {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const upgradeUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        await supabase
          .from("profiles")
          .update({ plan: "premium" })
          .eq("id", user.id)
      }

      router.push("/dashboard")
    }

    upgradeUser()
  }, [])

  return (
    <div className="p-10 text-center">
      <p>Upgrading your account...</p>
    </div>
  )
}