import React from 'react';
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';
import dayjs from 'dayjs';
import type { Transaction } from '../../features/transaction/model/types';
import { useAppSelector } from '../../app/hooks';
import type { RootState } from '../../app/store';
import type { Dayjs } from 'dayjs';

export default function SimpleBarChart() {
  const transactions: Transaction[] = useAppSelector(
    (state: RootState) => state.transaction.transactions,
  );

  const startDate: Dayjs | null = useAppSelector(
    (state: RootState) => state.reportSettings.startDate,
  );
  const endDate: Dayjs | null = useAppSelector(
    (state: RootState) => state.reportSettings.endDate,
  );

  const { labels, currentSeries, previousSeries, currentYear, previousYear } =
    React.useMemo(() => {
      const now = dayjs();
      const startCandidate = startDate
        ? dayjs(startDate).startOf('month')
        : now.startOf('year');
      const endCandidate = endDate
        ? dayjs(endDate).startOf('month')
        : now.endOf('year').startOf('month');

      // Treat the year of the startCandidate as the "current year" for the period.
      const currentYearNum = startCandidate.year();
      const janOfYear = dayjs().year(currentYearNum).startOf('year');
      const decOfYear = dayjs()
        .year(currentYearNum)
        .endOf('year')
        .startOf('month');

      // Clamp range to the chosen year (cut off at year's end if longer)
      const start = startCandidate.isBefore(janOfYear)
        ? janOfYear
        : startCandidate;
      let end = endCandidate.isAfter(decOfYear) ? decOfYear : endCandidate;

      // If end falls before start, clamp end to start to avoid empty ranges
      if (end.isBefore(start)) end = start;

      const months: dayjs.Dayjs[] = [];
      let cur = start;
      while (cur.isBefore(end) || cur.isSame(end)) {
        months.push(cur);
        cur = cur.add(1, 'month');
      }

      const currentData = months.map((m) => {
        const monthIndex = m.month();
        return transactions.reduce((sum, t) => {
          const d = dayjs(t.createdAt);
          if (d.year() === currentYearNum && d.month() === monthIndex) {
            return (
              sum +
              (typeof t.amount === 'number' ? t.amount : Number(t.amount) || 0)
            );
          }
          return sum;
        }, 0);
      });

      const previousYearNum = currentYearNum - 1;
      const previousData = months.map((m) => {
        const monthIndex = m.month();
        return transactions.reduce((sum, t) => {
          const d = dayjs(t.createdAt);
          if (d.year() === previousYearNum && d.month() === monthIndex) {
            return (
              sum +
              (typeof t.amount === 'number' ? t.amount : Number(t.amount) || 0)
            );
          }
          return sum;
        }, 0);
      });

      const labels = months.map((m) => m.format('MMM'));

      return {
        labels,
        currentSeries: currentData,
        previousSeries: previousData,
        currentYear: currentYearNum,
        previousYear: previousYearNum,
      };
    }, [startDate, endDate, transactions]);

  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <BarChart
        series={[
          { data: currentSeries, label: `${currentYear}`, id: 'currentYear' },
          {
            data: previousSeries,
            label: `${previousYear}`,
            id: 'previousYear',
          },
        ]}
        xAxis={[{ data: labels, height: 28 }]}
        yAxis={[{ width: 50 }]}
      />
    </Box>
  );
}
