'use client';

import type { Transaction } from '@/app/types/transaction';
import { TransactionForm } from './TransactionForm';

interface OverviewTabProps {
  transactions: Transaction[];
  selectedMonth: string;
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

export function OverviewTab({ transactions, selectedMonth, onAddTransaction }: OverviewTabProps) {
  const filteredTransactions = transactions.filter((t) =>
    t.date.startsWith(selectedMonth)
  );

  const monthlyIncome = filteredTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpense = filteredTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = monthlyIncome - monthlyExpense;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">{selectedMonth.replace('-', '年')}月の収支</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-600">収入</h3>
            <span className="text-2xl">📈</span>
          </div>
          <p className="text-3xl font-bold text-green-600">¥{monthlyIncome.toLocaleString()}</p>
          <p className="text-xs text-slate-500 mt-1">{filteredTransactions.filter(t => t.type === 'income').length}件の取引</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-600">支出</h3>
            <span className="text-2xl">📉</span>
          </div>
          <p className="text-3xl font-bold text-red-600">¥{monthlyExpense.toLocaleString()}</p>
          <p className="text-xs text-slate-500 mt-1">{filteredTransactions.filter(t => t.type === 'expense').length}件の取引</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-600">収支</h3>
            <span className="text-2xl">💰</span>
          </div>
          <p className={`text-3xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            {balance >= 0 ? '' : '-'}¥{Math.abs(balance).toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 mt-1">収支</p>
        </div>
      </div>

      <TransactionForm onAddTransaction={onAddTransaction} />
    </div>
  );
}
