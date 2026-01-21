'use client';

import { useState } from 'react';
import type { Transaction, TransactionType, TransactionCategory } from '@/app/types/transaction';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '@/app/constants/categories';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

export function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<TransactionCategory>('食費');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      return;
    }

    onAddTransaction({
      type,
      amount: parseFloat(amount),
      category,
      description,
      date,
    });

    setAmount('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">+ 新しい取引を追加</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">取引種類</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="income"
                checked={type === 'income'}
                onChange={(e) => {
                  setType(e.target.value as TransactionType);
                  setCategory(INCOME_CATEGORIES[0]);
                }}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-slate-700">収入</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={type === 'expense'}
                onChange={(e) => {
                  setType(e.target.value as TransactionType);
                  setCategory(EXPENSE_CATEGORIES[0]);
                }}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-slate-700">支出</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">金額</label>
          <div className="flex items-center gap-2">
            <span className="text-slate-700">¥</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">日付</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">カテゴリ</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as TransactionCategory)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">説明 (任意)</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="詳細を入力してください"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors"
        >
          追加
        </button>
      </div>
    </div>
  );
}
