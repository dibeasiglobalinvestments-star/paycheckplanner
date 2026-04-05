"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function DashboardClient() {
  const supabase = createClient()

  const [email, setEmail] = useState<string | null>(null)

  const [debts, setDebts] = useState<any[]>([])
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")

  const [income, setIncome] = useState<any[]>([])
  const [incomeAmount, setIncomeAmount] = useState("")

  const [monthlyPayment, setMonthlyPayment] = useState("")

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser()
      setEmail(data.user?.email || null)
      fetchDebts()
      fetchIncome()
    }
    load()
  }, [])

  const fetchDebts = async () => {
    const { data } = await supabase.from("debts").select("*")
    setDebts(data || [])
  }

  const fetchIncome = async () => {
    const { data } = await supabase.from("income").select("*")
    setIncome(data || [])
  }

  const addDebt = async () => {
    if (!name.trim() || !amount) return

    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) return

    await supabase.from("debts").insert([
      {
        user_id: userData.user.id,
        name: name.trim(),
        balance: parseFloat(amount),
        interest: 0,
      },
    ])

    setName("")
    setAmount("")
    fetchDebts()
  }

  const deleteDebt = async (id: string) => {
    await supabase.from("debts").delete().eq("id", id)
    fetchDebts()
  }

  const addIncome = async () => {
    if (!incomeAmount) return

    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) return

    await supabase.from("income").insert([
      {
        user_id: userData.user.id,
        amount: parseFloat(incomeAmount),
      },
    ])

    setIncomeAmount("")
    fetchIncome()
  }

  const totalDebt = debts.reduce((sum, d) => sum + Number(d.balance), 0)
  const totalIncome = income.reduce((sum, i) => sum + Number(i.amount), 0)

  // 💰 PAYOFF CALCULATOR
  const monthsToPayoff =
    monthlyPayment && totalDebt > 0
      ? Math.ceil(totalDebt / Number(monthlyPayment))
      : 0

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#020617] border-r border-white/10 p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8">Paycheck Planner</h2>

        <nav className="space-y-4 text-gray-400">
          <p className="hover:text-white cursor-pointer">Overview</p>
          <p className="hover:text-white cursor-pointer">Debts</p>
          <p className="hover:text-white cursor-pointer">Income</p>
          <p className="hover:text-white cursor-pointer">Insights</p>
        </nav>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-gray-500 text-sm">{email}</p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-[#020617] border border-white/10 p-6 rounded-xl">
            <h3 className="text-gray-400 text-sm">Total Debt</h3>
            <p className="text-3xl font-bold mt-2">
              ${totalDebt.toFixed(2)}
            </p>
          </div>

          <div className="bg-[#020617] border border-white/10 p-6 rounded-xl">
            <h3 className="text-gray-400 text-sm">Monthly Income</h3>
            <p className="text-3xl font-bold mt-2">
              ${totalIncome.toFixed(2)}
            </p>
          </div>

          <div className="bg-[#020617] border border-white/10 p-6 rounded-xl">
            <h3 className="text-gray-400 text-sm">Savings Rate</h3>
            <p className="text-3xl font-bold mt-2">
              {totalIncome > 0
                ? ((totalIncome - totalDebt) / totalIncome * 100).toFixed(0)
                : 0}%
            </p>
          </div>

        </div>

        {/* PAYOFF CALCULATOR */}
        <div className="mt-10 bg-[#020617] border border-white/10 p-6 rounded-xl max-w-md">
          <h3 className="mb-4 font-semibold">Debt Payoff Calculator</h3>

          <input
            placeholder="Monthly Payment"
            type="number"
            className="w-full mb-4 p-2 rounded bg-white/5 border border-white/10"
            value={monthlyPayment}
            onChange={(e) => setMonthlyPayment(e.target.value)}
          />

          <p className="text-gray-400">
            Months to Payoff:{" "}
            <span className="text-white font-semibold">
              {monthsToPayoff}
            </span>
          </p>
        </div>

        {/* ADD DEBT */}
        <div className="mt-10 bg-[#020617] border border-white/10 p-6 rounded-xl max-w-md">
          <h3 className="mb-4 font-semibold">Add Debt</h3>

          <input
            placeholder="Debt Name"
            className="w-full mb-2 p-2 rounded bg-white/5 border border-white/10"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Amount"
            type="number"
            className="w-full mb-4 p-2 rounded bg-white/5 border border-white/10"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            onClick={addDebt}
            className="bg-green-500 text-black px-4 py-2 rounded w-full"
          >
            Save Debt
          </button>
        </div>

        {/* ADD INCOME */}
        <div className="mt-6 bg-[#020617] border border-white/10 p-6 rounded-xl max-w-md">
          <h3 className="mb-4 font-semibold">Add Income</h3>

          <input
            placeholder="Amount"
            type="number"
            className="w-full mb-4 p-2 rounded bg-white/5 border border-white/10"
            value={incomeAmount}
            onChange={(e) => setIncomeAmount(e.target.value)}
          />

          <button
            onClick={addIncome}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Save Income
          </button>
        </div>

        {/* DEBT LIST */}
        <div className="mt-10 max-w-md">
          <h3 className="mb-4 font-semibold">Your Debts</h3>

          {debts.map((d) => (
            <div
              key={d.id}
              className="bg-[#020617] border border-white/10 p-3 rounded mb-2 flex justify-between"
            >
              <div>
                <p>{d.name}</p>
                <p className="text-gray-400">${d.balance}</p>
              </div>

              <button
                onClick={() => deleteDebt(d.id)}
                className="text-red-400"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}