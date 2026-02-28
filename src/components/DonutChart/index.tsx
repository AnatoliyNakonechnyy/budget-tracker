import { PieChart } from '@mui/x-charts/PieChart';
import type { Transaction } from '../../features/transaction/model/types';
import { useAppSelector } from '../../app/hooks';
import type { RootState } from '../../app/store';

export default function DonutChart() {
  const transactions: Transaction[] = useAppSelector(
    (state: RootState) => state.transaction.transactions,
  );

  type DataItem = { label: string; value: number; color: string };

  const data = transactions.reduce<DataItem[]>(
    (accumulator, transaction: Transaction) => {
      const existingCategory = accumulator.find(
        (item) => item.label === transaction.category,
      );
      if (existingCategory) {
        existingCategory.value += transaction.amount;
      } else {
        accumulator.push({
          label: transaction.category,
          value: transaction.amount,
          color: accumulator.length % 2 === 0 ? '#0088FE' : '#FF8042',
        });
      }
      return accumulator;
    },
    [],
  );

  const settings = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    hideLegend: true,
  };

  return (
    <PieChart
      series={[{ innerRadius: 50, outerRadius: 100, data, arcLabel: 'value' }]}
      {...settings}
    />
  );
}
