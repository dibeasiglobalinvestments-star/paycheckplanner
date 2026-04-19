export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
      <div className="text-center max-w-xl px-6">
        <h1 className="text-4xl font-bold mb-4">
          Paycheck Planner
        </h1>

        <p className="text-white/70 mb-6">
          Plan every paycheck. Eliminate debt faster.
        </p>

        <a
          href="/pricing"
          className="inline-block bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-lg"
        >
          View Plans
        </a>
      </div>
    </main>
  )
}