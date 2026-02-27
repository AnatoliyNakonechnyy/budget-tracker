import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Transaction } from './types';
import type { RootState } from '../../../app/store';
import {
  fetchTransactions,
  fetchDeleteTransaction,
  fetchPutTransaction,
  fetchPostTransaction,
} from '../api';

export const fetchTransactionsThunk = createAsyncThunk(
  'transactions/fetchAll',
  fetchTransactions,
);

export const fetchDeleteTransactionThunk = createAsyncThunk(
  'transactions/fetchDelete',
  fetchDeleteTransaction,
);

export const fetchPutTransactionThunk = createAsyncThunk(
  'transactions/fetchPut',
  fetchPutTransaction,
);

export const fetchPostTransactionThunk = createAsyncThunk(
  'transactions/fetchPost',
  fetchPostTransaction,
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
    builder.addCase(fetchTransactionsThunk.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchTransactionsThunk.fulfilled, (state, action) => {
      state.transactions = action.payload;
      state.loading = 'succeeded';
    });
    builder.addCase(fetchTransactionsThunk.rejected, (state) => {
      state.loading = 'failed';
    });
    builder.addCase(fetchDeleteTransactionThunk.fulfilled, (state) => {
      state.loading = 'succeeded';
    });
    builder.addCase(fetchDeleteTransactionThunk.rejected, (state) => {
      state.loading = 'failed';
    });
    builder.addCase(fetchDeleteTransactionThunk.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchPutTransactionThunk.fulfilled, (state) => {
      state.loading = 'succeeded';
    });
    builder.addCase(fetchPutTransactionThunk.rejected, (state) => {
      state.loading = 'failed';
    });
    builder.addCase(fetchPutTransactionThunk.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchPostTransactionThunk.fulfilled, (state, action) => {
      state.transactions.push(action.payload);
      state.loading = 'succeeded';
    });
    builder.addCase(fetchPostTransactionThunk.rejected, (state) => {
      state.loading = 'failed';
    });
    builder.addCase(fetchPostTransactionThunk.pending, (state) => {
      state.loading = 'pending';
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
