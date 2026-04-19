"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (!error) {
      router.push("/dashboard")
    } else {
      alert(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <div className="bg-white p-8 rounded-xl w-full max-w-md">
        <h2 className="text-black text-xl font-semibold mb-4">Login</h2>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-4"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  )
}