import "./globals.css"
import Link from "next/link"
import Logo from "./components/Logo"
import { createClient } from "@/lib/supabase/server"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <html lang="en">
      <body className="bg-[#020617] text-white">

        <header className="border-b border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

            <Link href="/" className="flex items-center">
              <Logo size="lg" />
            </Link>

            <div className="flex gap-6">
              <Link href="/pricing">Pricing</Link>

              {user && <Link href="/dashboard">Dashboard</Link>}
              {!user && <Link href="/login">Login</Link>}
            </div>

          </div>
        </header>

        {children}
      </body>
    </html>
  )
}