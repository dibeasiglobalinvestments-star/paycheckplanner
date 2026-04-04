"use client"

import { safeArray } from "@/lib/safeArray"

type Debt = {
  id: string
  name: string
  balance: number
  interest_rate: number
}

export default function DebtList({ debts }: { debts: Debt[] }) {
  const safeDebts = safeArray(debts)

  if (safeDebts.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-2">Debts</h2>
        <p className="text-gray-500">No debts added yet</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-semibold mb-4">Debts</h2>

      <div className="space-y-3">
        {safeDebts.map((debt) => (
          <div
            key={debt.id}
            className="flex justify-between border-b pb-2"
          >
            <div>
              <p className="font-medium">{debt.name}</p>
              <p className="text-sm text-gray-500">
                {debt.interest_rate}% APR
              </p>
            </div>

            <p className="font-semibold">
              ${Number(debt.balance).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}