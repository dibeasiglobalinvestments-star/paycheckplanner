"use client"

import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="grid grid-cols-2 min-h-screen">

      {/* LEFT SIDE */}
      <div className="bg-blue-600 flex items-center justify-center px-12">
        <div className="max-w-md text-white">
          <h1 className="text-4xl font-bold mb-6">
            Take Control of Your Money
          </h1>
          <p className="text-lg">
            Plan your paycheck, eliminate debt, and build wealth smarter.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-gray-100 flex items-center justify-center">

        <div className="bg-white p-8 rounded-xl w-full max-w-md shadow">

          {/* LOGO */}
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="Paycheck Planner"
              width={80}   // 🔥 MATCH THIS SIZE
              height={80}
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-3 border rounded"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-3 border rounded"
          />

          <button className="w-full bg-black text-white py-3 rounded mb-3">
            Login
          </button>

          <button className="w-full bg-red-500 text-white py-3 rounded">
            Continue with Google
          </button>

        </div>
      </div>

    </div>
  )
}