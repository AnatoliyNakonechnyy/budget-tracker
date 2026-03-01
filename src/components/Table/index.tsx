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
}

const columns: readonly Column[] = [
  { id: 'createdAt', label: 'DATE', minWidth: 140 },
  {
    id: 'amount',
    label: 'AMOUNT',
    minWidth: 100,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'category',
    label: 'CATEGORY',
    minWidth: 100,
  },
  {
    id: 'notes',
    label: 'NOTES',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'paymentType',
    label: 'PAYMENT',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'type',
    label: 'TYPE',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'action',
    label: 'ACTIONS',
    minWidth: 50,
    align: 'right',
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

  const handleChangePage = (event: unknown, newPage: number) => {
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
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
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
