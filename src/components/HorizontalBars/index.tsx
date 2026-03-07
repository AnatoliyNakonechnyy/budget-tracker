import { BarChart } from '@mui/x-charts/BarChart';
import type { Transaction } from '../../features/transaction/model/types';
import type { RootState } from '../../app/store';
import { useAppSelector } from '../../app/hooks';
import type { Dayjs } from 'dayjs';

function valueFormatter(value: number | null) {
  return `${value}`;
}

const chartSetting = {
  xAxis: [
    {
      label: 'amount',
    },
  ],
  height: 400,
  margin: { left: 0 },
};

export default function HorizontalBars() {
  const transactions: Transaction[] = useAppSelector(
    (state: RootState) => state.transaction.transactions,
  );

  const startDate: Dayjs | null = useAppSelector(
    (state: RootState) => state.reportSettings.startDate,
  );
  const endDate: Dayjs | null = useAppSelector(
    (state: RootState) => state.reportSettings.endDate,
  );

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.createdAt);
    return (
      (startDate ? transactionDate >= startDate.toDate() : true) &&
      (endDate ? transactionDate <= endDate.toDate() : true)
    );
  });

  // aggregate by category -> sum amounts
  const aggregatedMap = filteredTransactions.reduce((map, transaction) => {
    const cat = transaction.category ?? 'Unknown';
    const amt =
      typeof transaction.amount === 'number'
        ? transaction.amount
        : Number(transaction.amount) || 0;
    map.set(cat, (map.get(cat) ?? 0) + amt);
    return map;
  }, new Map<string, number>());

  // convert to dataset array and sort descending by amount
  const dataset = Array.from(aggregatedMap.entries())
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: 'band', dataKey: 'category', width: 100 }]}
      series={[{ dataKey: 'amount', label: 'Amount', valueFormatter }]}
      layout="horizontal"
      {...chartSetting}
    />
  );
}
