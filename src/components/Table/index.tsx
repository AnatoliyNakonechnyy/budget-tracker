import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Transaction } from '../../features/transaction/model/types';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
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
import EditTransactionDialog from '../EditTransactionDialog';
import { Payment, type Note } from '@mui/icons-material';

export default function BasicTable() {
  const dispatch = useDispatch();
  const transactions: Transaction[] = useAppSelector(
    (state: RootState) => state.transaction.transactions,
  );

  const handleDeleteItem = (id: string | undefined) => {
    if (id) {
      dispatch(removeTransaction(id));
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
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>DATE</TableCell>
              <TableCell align="right">AMOUNT</TableCell>
              <TableCell align="right">CATEGORY</TableCell>
              <TableCell align="right">NOTES</TableCell>
              <TableCell align="right">PAYMENT</TableCell>
              <TableCell align="right">TYPE</TableCell>
              <TableCell align="right">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.createdAt}
                </TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{row.notes}</TableCell>
                <TableCell align="right">{row.paymentType}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditTransactionDialog />
    </>
  );
}
