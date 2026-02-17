export interface Transaction {
  id: string;
  createdAt: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  notes: string;
  paymentType: 'cash' | 'card';
}
