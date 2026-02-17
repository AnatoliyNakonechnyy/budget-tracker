export interface Transaction {
  id: string;
  createdAt: string;
  amount: number;
  description: string;
  type: 'income' | 'expense';
  notes: string;
  paymentType: 'cash' | 'card';
}
