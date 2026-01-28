'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { Transaction } from '@/app/types/transaction';
import { CATEGORY_COLORS } from '@/app/constants/categories';

interface BreakdownTabProps {
  transactions: Transaction[];
  selectedMonth: string;
}

export function BreakdownTab({ transactions, selectedMonth }: BreakdownTabProps) {
  const filteredTransactions = transactions.filter((t) => t.date.startsWith(selectedMonth));

  const incomeByCategory = filteredTransactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const expenseByCategory = filteredTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const incomeData = Object.entries(incomeByCategory).map(([category, amount]) => ({
    name: category,
    value: amount,
    color: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS],
  }));

  const expenseData = Object.entries(expenseByCategory).map(([category, amount]) => ({
    name: category,
    value: amount,
    color: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS],
  }));

  const totalIncome = incomeData.reduce((sum, item) => sum + item.value, 0);
  const totalExpense = expenseData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-slate-900">カテゴリ内訳</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 収入の内訳 */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">収入の内訳</h3>

          {incomeData.length === 0 ? (
            <p className="text-center text-slate-500 py-12">収入データがありません</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={incomeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {incomeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => `¥${value.toLocaleString()}`}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 font-semibold">
                  <span className="text-sm text-slate-700">カテゴリ</span>
                  <span className="text-sm text-slate-700">金額</span>
                </div>
                {incomeData
                  .sort((a, b) => b.value - a.value)
                  .map((item) => (
                    <div key={item.name} className="flex justify-between items-center py-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-slate-700">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">
                        ¥{item.value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                <div className="flex justify-between items-center pt-2 border-t border-slate-200 font-bold">
                  <span className="text-sm text-slate-900">合計</span>
                  <span className="text-sm text-green-600">¥{totalIncome.toLocaleString()}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 支出の内訳 */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">支出の内訳</h3>

          {expenseData.length === 0 ? (
            <p className="text-center text-slate-500 py-12">支出データがありません</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => `¥${value.toLocaleString()}`}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 font-semibold">
                  <span className="text-sm text-slate-700">カテゴリ</span>
                  <span className="text-sm text-slate-700">金額</span>
                </div>
                {expenseData
                  .sort((a, b) => b.value - a.value)
                  .map((item) => (
                    <div key={item.name} className="flex justify-between items-center py-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-slate-700">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">
                        ¥{item.value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                <div className="flex justify-between items-center pt-2 border-t border-slate-200 font-bold">
                  <span className="text-sm text-slate-900">合計</span>
                  <span className="text-sm text-red-600">¥{totalExpense.toLocaleString()}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
