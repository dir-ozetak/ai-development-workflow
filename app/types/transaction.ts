export type TransactionType = 'income' | 'expense';

export type TransactionCategory =
  | '給与'
  | '副業'
  | 'その他収入'
  | '食費'
  | '交通費'
  | '光熱費'
  | '通信費'
  | '娯楽'
  | '医療'
  | '教育'
  | '衣類'
  | 'その他支出';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: TransactionCategory;
  description: string;
  date: string;
}
