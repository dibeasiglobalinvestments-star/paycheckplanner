"use client"

import { useState } from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (!error) {
      router.push("/dashboard")
    } else {
      alert(error.message)
    }
  }

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    })
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white">
        <h1 className="text-4xl font-bold mb-6 leading-tight">
          Take Control of Your Money
        </h1>

        <p className="mb-8 text-lg text-blue-100">
          Plan your paycheck, eliminate debt, and build wealth with a smarter financial strategy.
        </p>

        <div className="space-y-6">
          <Feature title="Budgeting Made Easy" text="Track income and expenses automatically." />
          <Feature title="Smart Savings Advice" text="Optimize your money without thinking." />
          <Feature title="Secure & Private" text="Bank-level security and encryption." />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center bg-gray-100 px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">

          {/* LOGO */}
          <div className="flex justify-center mb-4">
            <Image
  src="/logo.png"
  alt="Paycheck Planner"
  width={220}
  height={220}
  style={{ width: "auto", height: "auto" }}
  priority
            />
          </div>

          {/* SUBTEXT */}
          <p className="text-center text-sm text-gray-500 mb-6">
            Smart financial planning for real life
          </p>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-700 text-white py-3 rounded-lg mb-4 hover:bg-blue-800 transition font-medium"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* GOOGLE BUTTON */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg mb-4 hover:bg-gray-50 transition font-medium"
          >
            Continue with Google
          </button>

          {/* LINKS */}
          <div className="text-center text-sm space-y-2">
            <p className="text-gray-600">
              Don’t have an account?{" "}
              <a href="/signup" className="text-blue-600 hover:underline">
                Create account
              </a>
            </p>

            <a href="/forgot-password" className="text-blue-600 hover:underline block">
              Forgot password?
            </a>
          </div>

          {/* TERMS */}
          <p className="text-xs text-gray-500 text-center mt-6">
            By continuing, you agree to our{" "}
            <a href="/terms" className="underline">Terms</a>{" "}
            and{" "}
            <a href="/privacy" className="underline">Privacy Policy</a>.
          </p>

          {/* BRAND */}
          <p className="text-xs text-gray-400 text-center mt-2">
            Paycheck Planner is a product of DiBeasi Global Investments LLC
          </p>

        </div>
      </div>
    </div>
  )
}

/* FEATURE COMPONENT */
function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-blue-100 text-sm">{text}</p>
    </div>
  )
}