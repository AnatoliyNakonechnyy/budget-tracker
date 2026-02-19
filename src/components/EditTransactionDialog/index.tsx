import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { RootState } from '../../app/store';
import { useDispatch } from 'react-redux';
import {
  setEditTransactionDialogIsOpen,
  setEditTransactionDialogAmount,
  setEditTransactionDialogCategory,
  editTransaction,
  setEditTransactionDialogNotes,
  setEditTransactionDialogPaymentType,
  setEditTransactionDialogType,
} from '../../features/transaction/model/transactionSlice';
import { useAppSelector } from '../../app/hooks';
import TextField from '@mui/material/TextField';
import type { Transaction } from '../../features/transaction/model/types';

export default function AlertDialog() {
  const dispatch = useDispatch();
  const editTransactionDialogIsOpen: boolean = useAppSelector(
    (state: RootState) => state.transaction.editTransactionDialogIsOpen,
  );
  const editTransactionDialogAmount: number | undefined = useAppSelector(
    (state: RootState) => state.transaction.editTransactionDialogAmount,
  );
  const editTransactionDialogCategory: string = useAppSelector(
    (state: RootState) => state.transaction.editTransactionDialogCategory,
  );
  const editTransactionDialogId: string = useAppSelector(
    (state: RootState) => state.transaction.editTransactionDialogId,
  );
  const editTransactionDialogNotes: string = useAppSelector(
    (state: RootState) => state.transaction.editTransactionDialogNotes,
  );
  const editTransactionDialogPaymentType: string = useAppSelector(
    (state: RootState) => state.transaction.editTransactionDialogPaymentType,
  );
  const editTransactionDialogType: string = useAppSelector(
    (state: RootState) => state.transaction.editTransactionDialogType,
  );

  const handleClose = () => {
    dispatch(setEditTransactionDialogAmount(0));
    dispatch(setEditTransactionDialogCategory(''));
    dispatch(setEditTransactionDialogIsOpen(false));
  };
  const handleAddEdit = () => {
    const now = new Date().toISOString();
    const newTransaction = {
      id: editTransactionDialogId,
      createdAt: now,
      amount: editTransactionDialogAmount || 0,
      category: editTransactionDialogCategory,
      notes: editTransactionDialogNotes,
      paymentType: editTransactionDialogPaymentType,
      type: editTransactionDialogType,
    } as Transaction;
    console.log('newTransaction', newTransaction);
    dispatch(editTransaction(newTransaction));

    dispatch(setEditTransactionDialogAmount(0));
    dispatch(setEditTransactionDialogCategory(''));
    dispatch(setEditTransactionDialogIsOpen(false));
  };
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setEditTransactionDialogAmount(
        event.target.value.length > 0 ? Number(event.target.value) : undefined,
      ),
    );
  };
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEditTransactionDialogCategory(event.target.value));
  };
  const handleCategoryNotesChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(setEditTransactionDialogNotes(event.target.value));
  };
  const handleCategoryPaymentTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(setEditTransactionDialogPaymentType(event.target.value));
  };
  const handleCategoryTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(setEditTransactionDialogType(event.target.value));
  };

  return (
    <>
      <Dialog
        open={editTransactionDialogIsOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <img
          src="./Images/AddExpense.png"
          alt="Note"
          style={{ width: '100%', height: 'auto' }}
        />
        <DialogTitle id="alert-dialog-title">{'Add Expense'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            margin="dense"
            value={editTransactionDialogAmount}
            onChange={handleAmountChange}
          />
          <TextField
            label="Category"
            fullWidth
            margin="dense"
            value={editTransactionDialogCategory}
            onChange={handleCategoryChange}
          />
          <TextField
            label="Notes"
            fullWidth
            margin="dense"
            value={editTransactionDialogNotes}
            onChange={handleCategoryNotesChange}
          />
          <TextField
            label="Payment Type"
            fullWidth
            margin="dense"
            value={editTransactionDialogPaymentType}
            onChange={handleCategoryPaymentTypeChange}
          />
          <TextField
            label="Type"
            fullWidth
            margin="dense"
            value={editTransactionDialogType}
            onChange={handleCategoryTypeChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddEdit}>ADD</Button>
          <Button onClick={handleClose} autoFocus>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
