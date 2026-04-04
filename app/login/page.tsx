"use client"

import { createClient } from "@/lib/supabase/client"
import Image from "next/image"
import { useState } from "react"

export default function LoginPage() {
  const supabase = createClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
      },
    })

    if (error) alert(error.message)
  }

  const handleEmailLogin = async () => {
    if (!email || !password) {
      alert("Enter email and password")
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) alert(error.message)
  }

  return (
    <div className="min-h-screen flex">
      {/* LEFT */}
      <div className="hidden md:flex w-1/2 bg-blue-600 text-white flex-col justify-center p-12">
        <h1 className="text-4xl font-bold mb-6">
          Take Control of Your Money
        </h1>
        <p className="mb-6 text-lg">
          Plan your paycheck, eliminate debt, and build wealth smarter.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-[380px] text-center">

          <Image
            src="/logo.png"
            alt="logo"
            width={150}
            height={150}
            className="mx-auto mb-4"
          />

          <h2 className="text-xl font-semibold mb-4">
            Sign in to your account
          </h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 px-4 py-2 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-3 px-4 py-2 border rounded-lg"
          />

          <button
            onClick={handleEmailLogin}
            className="w-full bg-black text-white py-3 rounded-lg mb-3"
          >
            Login
          </button>

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white py-3 rounded-lg mb-4"
          >
            Continue with Google
          </button>

          <p className="text-sm">
            <a href="/forgot-password" className="text-blue-600">
              Forgot password?
            </a>
          </p>

          <p className="text-sm mt-2">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600">
              Create account
            </a>
          </p>

          {/* ✅ TERMS (your code goes HERE) */}
          <p className="text-xs text-gray-400 mt-6">
            By continuing, you agree to our{" "}
            <a href="/terms" className="underline text-blue-500">
              Terms
            </a>{" "}
            &{" "}
            <a href="/privacy" className="underline text-blue-500">
              Privacy Policy
            </a>
            .
          </p>

          <p className="text-xs text-gray-400 mt-2">
            Paycheck Planner is a product of DiBeasi Global Investments LLC
          </p>

        </div>
      </div>
    </div>
  )
}