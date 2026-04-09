import "./globals.css"
import Image from "next/image"
import Link from "next/link"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-white">

        {/* HEADER */}
        <header className="w-full border-b border-white/10">
          <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">

            {/* LOGO — FIXED PROPERLY */}
            <Link href="/" className="flex items-center gap-4">
              <div className="relative w-[120px] h-[50px]"> 
                <Image
                  src="/logo.png"
                  alt="Paycheck Planner"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            <nav className="flex gap-6 text-sm text-white/70">
              <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
              <Link href="/pricing" className="hover:text-white">Pricing</Link>
            </nav>

          </div>
        </header>

        <main>{children}</main>

      </body>
    </html>
  )
}