"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase"
import { calculatePayoff } from "@/lib/payoffEngine"

export default function DebtStrategyRace() {

  const [snowballMonths, setSnowballMonths] = useState<number | null>(null)
  const [avalancheMonths, setAvalancheMonths] = useState<number | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {

    try {

      const supabase = createClient()

      const { data } = await supabase
        .from("debts")
        .select("*")

      if (!data || data.length === 0) {
        setSnowballMonths(0)
        setAvalancheMonths(0)
        return
      }

      const snowball = [...data].sort(
        (a: any, b: any) => a.balance - b.balance
      )

      const avalanche = [...data].sort(
        (a: any, b: any) => b.interest_rate - a.interest_rate
      )

      const snowballResult = calculatePayoff(snowball)
      const avalancheResult = calculatePayoff(avalanche)

      setSnowballMonths(snowballResult.months)
      setAvalancheMonths(avalancheResult.months)

    } catch (err) {
      console.error("StrategyRace error:", err)
      setSnowballMonths(0)
      setAvalancheMonths(0)
    }

  }

  return (

    <div className="bg-white p-6 rounded-2xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Debt Strategy Race
      </h2>

      <div className="space-y-2">

        <p>
          Snowball Payoff Time:
          <strong> {snowballMonths ?? "..."} months</strong>
        </p>

        <p>
          Avalanche Payoff Time:
          <strong> {avalancheMonths ?? "..."} months</strong>
        </p>

      </div>

    </div>

  )

}