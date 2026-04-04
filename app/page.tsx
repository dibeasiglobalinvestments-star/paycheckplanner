'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      router.push('/dashboard')
    }
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })

    if (error) {
      alert(error.message)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-blue-900 text-white p-12 flex-col justify-center">
        <h1 className="text-4xl font-bold mb-6">
          Take Control of Your Money
        </h1>

        <p className="text-lg mb-8">
          Plan your paycheck, eliminate debt, and build wealth with a smarter financial strategy.
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Budgeting Made Easy</h3>
            <p className="text-sm opacity-80">
              Track income and expenses automatically.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Smart Savings Advice</h3>
            <p className="text-sm opacity-80">
              Optimize your money without thinking.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Secure & Private</h3>
            <p className="text-sm opacity-80">
              Bank-level security and encryption.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-center">
            Paycheck Planner
          </h2>

          <input
            className="w-full border p-3 rounded"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border p-3 rounded"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-3 rounded"
            disabled={loading}
          >
            Login
          </button>

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white py-3 rounded font-semibold"
          >
            Continue with Google
          </button>

          <div className="text-center text-sm space-y-2">
            <a href="/signup" className="text-blue-600 block">
              Create account
            </a>

            <a href="/forgot-password" className="text-blue-600 block">
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}