import "./globals.css"

export const metadata = {
  title: "Paycheck Planner",
  description: "Financial planning made simple",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  )
}