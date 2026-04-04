"use client"

import { safeArray } from "@/lib/safeArray"
import { Debt, calculateTotalDebt } from "@/lib/financeEngine"

type Props = {
  debts?: Debt[] | null
}

export default function DebtList({ debts }: Props) {
  const safeDebts = safeArray(debts)

  const totalDebt = calculateTotalDebt(safeDebts)

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

      <div className="space-y-3 mb-4">
        {safeDebts.map((debt) => (
          <div
            key={debt.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-medium">{debt.name}</p>
              <p className="text-sm text-gray-500">
                {debt.interest_rate}% APR
              </p>
            </div>

            <p className="font-semibold">
              ${debt.balance.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t">
        <p className="font-semibold">
          Total Debt: ${totalDebt.toLocaleString()}
        </p>
      </div>
    </div>
  )
}