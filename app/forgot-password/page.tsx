"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function ForgotPassword() {
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const handleReset = async () => {
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    })

    setSent(true)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded w-full max-w-md">

        <img
          src="/logo.png"
          alt="Paycheck Planner"
          style={{ height: "64px", margin: "0 auto 20px" }}
        />

        {sent ? (
          <p className="text-green-600 text-center">
            Check your email
          </p>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleReset}
              className="w-full bg-black text-white py-2 rounded"
            >
              Send Reset Link
            </button>
          </>
        )}
      </div>
    </div>
  )
}