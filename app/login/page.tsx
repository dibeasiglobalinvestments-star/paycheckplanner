"use client"

import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-6">

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Plan Every Paycheck.
            <br />
            Eliminate Debt Faster.
          </h1>

          <p className="text-gray-400 text-lg mb-8 max-w-md">
            Stop guessing where your money goes. Build a system that tracks,
            prioritizes, and accelerates your path to financial freedom.
          </p>

          <button
            onClick={() => router.push("/onboarding")}
            className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-lg font-semibold"
          >
            Get Started
          </button>
        </div>

        {/* RIGHT SIDE (LOGO CARD ONLY) */}
        <div className="bg-white rounded-xl p-8 text-center">
          <img
            src="/logo.png"
            alt="Paycheck Planner"
            style={{
              height: 90,
              width: "auto",
              margin: "0 auto",
            }}
          />

          <p className="text-gray-600 mt-6">
            Start your financial system in minutes.
          </p>
        </div>

      </div>
    </div>
  )
}