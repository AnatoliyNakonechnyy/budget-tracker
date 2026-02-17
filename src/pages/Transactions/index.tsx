import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAllTransactions } from '../../features/transaction/model/transactionSlice';

export default function Transactions() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(
    (state) => state.transaction.transactions,
  );

  console.log('Transactions:', transactions);

  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  return <div>Transactions page</div>;
}
