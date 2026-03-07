import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import type { Transaction } from '../../features/transaction/model/types';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import type { RootState } from '../../app/store';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  removeTransaction,
  setEditTransactionDialogIsOpen,
  setEditTransactionDialogAmount,
  setEditTransactionDialogCategory,
  setEditTransactionDialogId,
  setEditTransactionDialogNotes,
  setEditTransactionDialogPaymentType,
  setEditTransactionDialogType,
} from '../../features/transaction/model/transactionSlice';
import { fetchDeleteTransactionThunk } from '../../features/transaction/model/transactionSlice';
import type { Dayjs } from 'dayjs';
import calendar from '../../asset/calendar.svg';
import action from '../../asset/action.svg';
import payment from '../../asset/payment.svg';
import category from '../../asset/category.svg';
import amount from '../../asset/amount.svg';
import notes from '../../asset/notes.svg';
import typePayment from '../../asset/type.svg';

interface Column {
  id:
    | 'createdAt'
    | 'amount'
    | 'category'
    | 'notes'
    | 'paymentType'
    | 'type'
    | 'action';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
  icon?: string;
}

const columns: readonly Column[] = [
  { id: 'createdAt', label: 'DATE', minWidth: 140, icon: calendar },
  {
    id: 'amount',
    label: 'AMOUNT',
    minWidth: 100,
    align: 'right',
    format: (value: number) => value.toFixed(2),
    icon: amount,
  },
  {
    id: 'category',
    label: 'CATEGORY',
    minWidth: 100,
    icon: category,
  },
  {
    id: 'notes',
    label: 'NOTES',
    minWidth: 170,
    align: 'right',
    icon: notes,
  },
  {
    id: 'paymentType',
    label: 'PAYMENT',
    minWidth: 100,
    align: 'right',
    icon: payment,
  },
  {
    id: 'type',
    label: 'TYPE',
    minWidth: 100,
    align: 'right',
    icon: typePayment,
  },
  {
    id: 'action',
    label: 'ACTIONS',
    minWidth: 50,
    align: 'right',
    icon: action,
  },
];

export default function StickyHeadTable() {
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const rows: Transaction[] = useAppSelector(
    (state: RootState) => state.transaction.transactions,
  );
  const searchString: string = useAppSelector(
    (state: RootState) => state.listSettings.searchString,
  );
  const filteredRows = rows.filter((item) =>
    item.notes.toLowerCase().includes(searchString.toLowerCase()),
  );
  const amountRange499: boolean = useAppSelector(
    (state: RootState) => state.listSettings.amountRange499,
  );
  const amountRange999: boolean = useAppSelector(
    (state: RootState) => state.listSettings.amountRange999,
  );
  const amountRange1999: boolean = useAppSelector(
    (state: RootState) => state.listSettings.amountRange1999,
  );
  const amountRange2000: boolean = useAppSelector(
    (state: RootState) => state.listSettings.amountRange2000,
  );
  const amountFilteredRows = filteredRows.filter((item) => {
    if (
      !amountRange499 &&
      !amountRange999 &&
      !amountRange1999 &&
      !amountRange2000
    ) {
      return true;
    }
    if (amountRange499 && item.amount < 500) return true;
    if (amountRange999 && item.amount >= 500 && item.amount < 1000) return true;
    if (amountRange1999 && item.amount >= 1000 && item.amount < 2000)
      return true;
    if (amountRange2000 && item.amount >= 2000) return true;
    return false;
  });

  const paymentCard: boolean = useAppSelector(
    (state: RootState) => state.listSettings.paymentCard,
  );
  const paymentCash: boolean = useAppSelector(
    (state: RootState) => state.listSettings.paymentCash,
  );
  const paymentUPI: boolean = useAppSelector(
    (state: RootState) => state.listSettings.paymentUPI,
  );
  const paymentPayLater: boolean = useAppSelector(
    (state: RootState) => state.listSettings.paymentPayLater,
  );

  const paymentFilteredRows = amountFilteredRows.filter((item) => {
    if (!paymentCard && !paymentCash && !paymentUPI && !paymentPayLater) {
      return true;
    }
    if (paymentCard && item.paymentType.toLowerCase() === 'card') return true;
    if (paymentCash && item.paymentType.toLowerCase() === 'cash') return true;

    if (paymentUPI && item.paymentType.toLowerCase() === 'upi') return true;
    if (paymentPayLater && item.paymentType.toLowerCase() === 'pay later')
      return true;
    return false;
  });

  const categoryGroceries: boolean = useAppSelector(
    (state: RootState) => state.listSettings.categoryGroceries,
  );
  const categoryDining: boolean = useAppSelector(
    (state: RootState) => state.listSettings.categoryDining,
  );
  const categoryTransport: boolean = useAppSelector(
    (state: RootState) => state.listSettings.categoryTransport,
  );
  const categoryRent: boolean = useAppSelector(
    (state: RootState) => state.listSettings.categoryRent,
  );

  const categoryFilteredRows = paymentFilteredRows.filter((item) => {
    if (
      !categoryGroceries &&
      !categoryDining &&
      !categoryTransport &&
      !categoryRent
    ) {
      return true;
    }
    if (categoryGroceries && item.category.toLowerCase() === 'groceries')
      return true;
    if (categoryDining && item.category.toLowerCase() === 'dining') return true;
    if (categoryTransport && item.category.toLowerCase() === 'transport')
      return true;
    if (categoryRent && item.category.toLowerCase() === 'rent') return true;
    return false;
  });

  const valueDatePicker: Dayjs | null = useAppSelector(
    (state: RootState) => state.listSettings.dataPick,
  );

  const dateFilteredRows = categoryFilteredRows.filter((item) => {
    // if no date selected, don't filter by date
    if (!valueDatePicker) return true;
    const itemDate = new Date(item.createdAt);
    const selectedDate = valueDatePicker.toDate();
    return (
      itemDate.getFullYear() === selectedDate.getFullYear() &&
      itemDate.getMonth() === selectedDate.getMonth() &&
      itemDate.getDate() === selectedDate.getDate()
    );
  });

  const dataRange: string = useAppSelector(
    (state: RootState) => state.listSettings.dataRange,
  );
  const rangeFilteredRows = dateFilteredRows.filter((item) => {
    if (valueDatePicker) return true;

    if (dataRange === 'Today') {
      const itemDate = new Date(item.createdAt);
      const now = new Date();
      return (
        itemDate.getFullYear() === now.getFullYear() &&
        itemDate.getMonth() === now.getMonth() &&
        itemDate.getDate() === now.getDate()
      );
    }

    if (dataRange === 'ThisWeek') {
      const itemDate = new Date(item.createdAt);
      const now = new Date();
      const firstDayOfWeek = new Date(
        now.setDate(now.getDate() - now.getDay()),
      );
      const lastDayOfWeek = new Date(
        now.setDate(now.getDate() - now.getDay() + 6),
      );
      return itemDate >= firstDayOfWeek && itemDate <= lastDayOfWeek;
    }

    if (dataRange === 'ThisMonth') {
      const itemDate = new Date(item.createdAt);
      const now = new Date();
      return (
        itemDate.getFullYear() === now.getFullYear() &&
        itemDate.getMonth() === now.getMonth()
      );
    }

    if (dataRange === 'PreviousMonth') {
      const itemDate = new Date(item.createdAt);
      const now = new Date();
      const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return (
        itemDate.getFullYear() === previousMonth.getFullYear() &&
        itemDate.getMonth() === previousMonth.getMonth()
      );
    }
  });

  const sort = useAppSelector((state: RootState) => state.listSettings.sort);

  if (sort === 'Newest') {
    rangeFilteredRows.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  } else if (sort === 'Oldest') {
    rangeFilteredRows.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  } else if (sort === 'PriceHighToLow') {
    rangeFilteredRows.sort((a, b) => b.amount - a.amount);
  } else if (sort === 'PriceLowToHigh') {
    rangeFilteredRows.sort((a, b) => a.amount - b.amount);
  }

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteItem = (id: string | undefined) => {
    if (id) {
      dispatch(removeTransaction(id));
      dispatch(fetchDeleteTransactionThunk(id));
    }
  };

  const handleEditItem =
    (
      id: string | undefined,
      amount: number | undefined,
      category: string,
      notes: string,
      paymentType: string,
      type: string,
    ) =>
    () => {
      if (id) {
        dispatch(setEditTransactionDialogId(id));
        dispatch(setEditTransactionDialogAmount(amount));
        dispatch(setEditTransactionDialogCategory(category));
        dispatch(setEditTransactionDialogNotes(notes));
        dispatch(setEditTransactionDialogPaymentType(paymentType));
        dispatch(setEditTransactionDialogType(type));
        dispatch(setEditTransactionDialogIsOpen(true));
      }
    };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    color: '#1976d2',
                    fontWeight: 'bold',
                  }}
                >
                  <img
                    src={column.icon}
                    alt="icon"
                    style={{ width: 15, height: 15 }}
                  />
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rangeFilteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value =
                        column.id === 'action' ? '' : row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'action' ? (
                            <>
                              <IconButton
                                onClick={handleEditItem(
                                  row.id,
                                  row.amount,
                                  row.category,
                                  row.notes,
                                  row.paymentType,
                                  row.type,
                                )}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="error"
                                onClick={() => handleDeleteItem(row.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </>
                          ) : column.format && typeof value === 'number' ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
