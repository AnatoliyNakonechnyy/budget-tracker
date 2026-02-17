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
}

// Define the initial state using that type
const initialState: TransactionState = {
  transactions: [],
  loading: 'idle',
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
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

export const { addTransaction, removeTransaction, editTransaction } =
  transactionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTransactions = (state: RootState) =>
  state.transaction.transactions;

export default transactionSlice.reducer;
