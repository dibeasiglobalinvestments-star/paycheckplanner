"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function ForgotPasswordPage() {
  const supabase = createClient()

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleReset = async () => {
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/update-password",
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Check your email for reset link")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-lg w-full max-w-md">
        <h2 className="text-white text-xl mb-4">Reset Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mb-4 p-2 rounded bg-slate-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-green-500 text-black py-2 rounded"
        >
          {loading ? "Sending..." : "Send Reset Email"}
        </button>
      </div>
    </div>
  )
}