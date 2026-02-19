import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Transaction } from './types';
import type { RootState } from '../../../app/store';
import { fetchTransactions } from '../api';

export const fetchAllTransactions = createAsyncThunk(
  'transactions/fetchAll',
  fetchTransactions,
);

interface TransactionState {
  transactions: Transaction[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  editTransactionDialogIsOpen: boolean;
  editTransactionDialogAmount: number | undefined;
  editTransactionDialogCategory: string;
  editTransactionDialogId: string;
  editTransactionDialogNotes: string;
  editTransactionDialogPaymentType: string;
  editTransactionDialogType: string;
}

// Define the initial state using that type
const initialState: TransactionState = {
  transactions: [],
  loading: 'idle',
  editTransactionDialogIsOpen: false,
  editTransactionDialogId: '',
  editTransactionDialogAmount: undefined,
  editTransactionDialogCategory: '',
  editTransactionDialogNotes: '',
  editTransactionDialogPaymentType: '',
  editTransactionDialogType: '',
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setEditTransactionDialogIsOpen: (state, action: PayloadAction<boolean>) => {
      state.editTransactionDialogIsOpen = action.payload;
    },
    setEditTransactionDialogAmount: (
      state,
      action: PayloadAction<number | undefined>,
    ) => {
      state.editTransactionDialogAmount = action.payload;
    },
    setEditTransactionDialogCategory: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.editTransactionDialogCategory = action.payload;
    },
    setEditTransactionDialogNotes: (state, action: PayloadAction<string>) => {
      state.editTransactionDialogNotes = action.payload;
    },
    setEditTransactionDialogPaymentType: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.editTransactionDialogPaymentType = action.payload;
    },
    setEditTransactionDialogType: (state, action: PayloadAction<string>) => {
      state.editTransactionDialogType = action.payload;
    },
    setEditTransactionDialogId: (state, action: PayloadAction<string>) => {
      state.editTransactionDialogId = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    removeTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload,
      );
    },
    editTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id,
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTransactions.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchAllTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload;
      state.loading = 'succeeded';
    });
    builder.addCase(fetchAllTransactions.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});

export const {
  addTransaction,
  removeTransaction,
  editTransaction,
  setEditTransactionDialogIsOpen,
  setEditTransactionDialogAmount,
  setEditTransactionDialogCategory,
  setEditTransactionDialogId,
  setEditTransactionDialogNotes,
  setEditTransactionDialogPaymentType,
  setEditTransactionDialogType,
} = transactionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTransactions = (state: RootState) =>
  state.transaction.transactions;

export default transactionSlice.reducer;
