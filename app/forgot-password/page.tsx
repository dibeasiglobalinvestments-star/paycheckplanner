'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')

  const handleReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Password reset email sent')
    }
  }

  return (
    <div className="p-10 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Reset Password</h1>

      <input
        className="w-full border p-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleReset}
        className="w-full bg-black text-white p-2"
      >
        Send Reset Email
      </button>
    </div>
  )
}