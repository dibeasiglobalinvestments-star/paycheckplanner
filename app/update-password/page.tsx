"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function UpdatePasswordPage() {
  const supabase = createClient()

  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleUpdatePassword = async () => {
    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Password updated successfully")
      window.location.href = "/dashboard"
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-lg w-full max-w-md">
        <h2 className="text-white text-xl mb-4">Set New Password</h2>

        <input
          type="password"
          placeholder="New password"
          className="w-full mb-4 p-2 rounded bg-slate-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleUpdatePassword}
          disabled={loading}
          className="w-full bg-green-500 text-black py-2 rounded"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  )
}