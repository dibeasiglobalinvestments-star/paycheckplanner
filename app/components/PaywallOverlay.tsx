"use client"

type Props = {
  children: React.ReactNode
  show: boolean
}

export default function PaywallOverlay({ children, show }: Props) {
  return (
    <div className="relative">
      
      {/* CONTENT */}
      <div className={show ? "blur-sm pointer-events-none select-none" : ""}>
        {children}
      </div>

      {/* OVERLAY */}
      {show && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-slate-900/95 border border-slate-700 rounded-2xl p-6 text-center max-w-sm shadow-xl">
            
            <h3 className="text-lg font-semibold mb-2">
              Unlock Full Financial Plan
            </h3>

            <p className="text-sm text-slate-400 mb-4">
              See your exact debt-free date, savings, and optimization strategy.
            </p>

            <button
              onClick={() => (window.location.href = "/api/checkout")}
              className="bg-emerald-500 text-black px-4 py-2 rounded-lg font-semibold w-full"
            >
              Upgrade Now
            </button>

          </div>
        </div>
      )}
    </div>
  )
}