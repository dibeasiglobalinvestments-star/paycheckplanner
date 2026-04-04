"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleUpdate = async () => {
    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    setLoading(false)

    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Password updated. You can now log in.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">

      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-xl w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4">Set New Password</h2>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg text-black mb-4"
        />

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full bg-green-600 py-3 rounded-lg"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        {message && (
          <p className="mt-4 text-sm text-gray-300">{message}</p>
        )}
      </div>
    </div>
  )
}