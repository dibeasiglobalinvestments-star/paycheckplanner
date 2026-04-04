"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function UpdatePasswordPage() {
  const supabase = createClient()
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [sessionReady, setSessionReady] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        setSessionReady(true)
      } else {
        alert("Invalid or expired reset link")
        router.push("/login")
      }
    }

    checkSession()
  }, [])

  const handleUpdatePassword = async () => {
    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert("Password updated!")
      router.push("/login")
    }
  }

  if (!sessionReady) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1F3A]">
      <div className="bg-[#0F2A4A] p-8 rounded-xl w-[350px] text-center text-white">

        <h1 className="text-xl mb-4">Set New Password</h1>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-white/10 border border-white/20"
        />

        <button
          onClick={handleUpdatePassword}
          disabled={loading}
          className="w-full bg-green-500 text-black py-3 rounded-lg"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

      </div>
    </div>
  )
}