'use client';

import { useState } from 'react';
import type { Transaction, TransactionCategory } from '@/app/types/transaction';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '@/app/constants/categories';

interface HistoryTabProps {
  transactions: Transaction[];
  selectedMonth: string;
  onUpdateTransaction: (id: string, updates: Partial<Transaction>) => void;
  onDeleteTransaction: (id: string) => void;
}

export function HistoryTab({
  transactions,
  selectedMonth,
  onUpdateTransaction,
  onDeleteTransaction,
}: HistoryTabProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const filteredTransactions = transactions
    .filter((t) => t.date.startsWith(selectedMonth))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleEdit = (transaction: Transaction) => {
    setEditingId(transaction.id);
  };

  const handleSave = () => {
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('この取引を削除しますか？')) {
      onDeleteTransaction(id);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">取引履歴</h2>

      {filteredTransactions.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <p className="text-slate-500">この月の取引はまだありません</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                    日付
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                    種類
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                    カテゴリ
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                    説明
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">
                    金額
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {editingId === transaction.id ? (
                        <input
                          type="date"
                          defaultValue={transaction.date}
                          onChange={(e) =>
                            onUpdateTransaction(transaction.id, { date: e.target.value })
                          }
                          className="px-2 py-1 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      ) : (
                        transaction.date
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          transaction.type === 'income'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {transaction.type === 'income' ? '収入' : '支出'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {editingId === transaction.id ? (
                        <select
                          defaultValue={transaction.category}
                          onChange={(e) =>
                            onUpdateTransaction(transaction.id, {
                              category: e.target.value as TransactionCategory,
                            })
                          }
                          className="px-2 py-1 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                          {(transaction.type === 'income'
                            ? INCOME_CATEGORIES
                            : EXPENSE_CATEGORIES
                          ).map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      ) : (
                        transaction.category
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {editingId === transaction.id ? (
                        <input
                          type="text"
                          defaultValue={transaction.description}
                          onChange={(e) =>
                            onUpdateTransaction(transaction.id, { description: e.target.value })
                          }
                          className="w-full px-2 py-1 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      ) : (
                        transaction.description || '-'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {editingId === transaction.id ? (
                        <input
                          type="number"
                          defaultValue={transaction.amount}
                          onChange={(e) =>
                            onUpdateTransaction(transaction.id, {
                              amount: parseFloat(e.target.value),
                            })
                          }
                          className="w-24 px-2 py-1 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-right"
                        />
                      ) : (
                        <span
                          className={`text-sm font-semibold ${
                            transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {transaction.type === 'income' ? '+' : '-'}¥
                          {transaction.amount.toLocaleString()}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      {editingId === transaction.id ? (
                        <button
                          onClick={handleSave}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          保存
                        </button>
                      ) : (
                        <div className="flex gap-3 justify-end">
                          <button
                            onClick={() => handleEdit(transaction)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            編集
                          </button>
                          <button
                            onClick={() => handleDelete(transaction.id)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            削除
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
