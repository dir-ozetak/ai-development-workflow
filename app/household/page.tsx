'use client';

import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import type { Transaction } from '@/app/types/transaction';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';
import { OverviewTab } from '@/app/components/OverviewTab';
import { HistoryTab } from '@/app/components/HistoryTab';
import { BreakdownTab } from '@/app/components/BreakdownTab';

export default function HouseholdPage() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('household-transactions', []);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions([...transactions, newTransaction]);
  };

  const handleUpdateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📊</span>
              <h1 className="text-3xl font-bold text-slate-900">家計簿アプリ</h1>
            </div>
            <div>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          <p className="text-slate-600 mt-2">収入と支出を記録して、家計を管理しましょう</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs.Root defaultValue="overview" className="w-full">
          {/* Tab Navigation */}
          <Tabs.List className="flex gap-1 bg-white rounded-lg p-1 shadow-sm mb-8">
            <Tabs.Trigger
              value="overview"
              className="flex-1 px-6 py-3 rounded-md text-sm font-medium transition-colors data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:text-slate-900"
            >
              📈 概要
            </Tabs.Trigger>
            <Tabs.Trigger
              value="history"
              className="flex-1 px-6 py-3 rounded-md text-sm font-medium transition-colors data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:text-slate-900"
            >
              📋 取引履歴
            </Tabs.Trigger>
            <Tabs.Trigger
              value="breakdown"
              className="flex-1 px-6 py-3 rounded-md text-sm font-medium transition-colors data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:text-slate-900"
            >
              🍰 カテゴリ内訳
            </Tabs.Trigger>
          </Tabs.List>

          {/* Tab Content */}
          <Tabs.Content value="overview">
            <OverviewTab
              transactions={transactions}
              selectedMonth={selectedMonth}
              onAddTransaction={handleAddTransaction}
            />
          </Tabs.Content>

          <Tabs.Content value="history">
            <HistoryTab
              transactions={transactions}
              selectedMonth={selectedMonth}
              onUpdateTransaction={handleUpdateTransaction}
              onDeleteTransaction={handleDeleteTransaction}
            />
          </Tabs.Content>

          <Tabs.Content value="breakdown">
            <BreakdownTab transactions={transactions} selectedMonth={selectedMonth} />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}
