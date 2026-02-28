import { LineChart } from '@mui/x-charts/LineChart';
import type { Transaction } from '../../features/transaction/model/types';
import { useAppSelector } from '../../app/hooks';
import type { RootState } from '../../app/store';

export default function BasicLineChart() {
  const transactions: Transaction[] = useAppSelector(
    (state: RootState) => state.transaction.transactions,
  );

  const transactionsData = transactions.map(
    (transaction) => transaction.amount,
  );

  const xAxisData = transactions.map((_, i) => i + 1);

  return (
    <LineChart
      xAxis={[
        {
          data: [...xAxisData],
        },
      ]}
      series={[
        {
          data: [...transactionsData],
        },
      ]}
      height={300}
    />
  );
}
