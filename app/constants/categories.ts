import type { TransactionCategory } from '@/app/types/transaction';

export const INCOME_CATEGORIES: TransactionCategory[] = [
  '給与',
  '副業',
  'その他収入',
];

export const EXPENSE_CATEGORIES: TransactionCategory[] = [
  '食費',
  '交通費',
  '光熱費',
  '通信費',
  '娯楽',
  '医療',
  '教育',
  '衣類',
  'その他支出',
];

export const CATEGORY_COLORS: Record<TransactionCategory, string> = {
  '給与': '#10b981',
  '副業': '#3b82f6',
  'その他収入': '#8b5cf6',
  '食費': '#ef4444',
  '交通費': '#f59e0b',
  '光熱費': '#06b6d4',
  '通信費': '#84cc16',
  '娯楽': '#ec4899',
  '医療': '#f97316',
  '教育': '#6366f1',
  '衣類': '#14b8a6',
  'その他支出': '#64748b',
};
