import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Dayjs } from 'dayjs';

interface ListSettingsState {
  searchString: string;
  sort: string;
  dataPick: Dayjs | null;
  dataRange: string;
  categoryGroceries: boolean;
  categoryDining: boolean;
  categoryTransport: boolean;
  categoryRent: boolean;
  amountRange499: boolean;
  amountRange999: boolean;
  amountRange1999: boolean;
  amountRange2000: boolean;
  paymentCard: boolean;
  paymentCash: boolean;
  paymentUPI: boolean;
  paymentPayLater: boolean;
  sortDialogIsOpen: boolean;
  filterDialogIsOpen: boolean;
}

const initialState: ListSettingsState = {
  searchString: '',
  sort: 'Newest',
  dataPick: null,
  dataRange: 'ThisMonth',
  categoryGroceries: false,
  categoryDining: false,
  categoryTransport: false,
  categoryRent: false,
  amountRange499: false,
  amountRange999: false,
  amountRange1999: false,
  amountRange2000: false,
  paymentCard: false,
  paymentCash: false,
  paymentUPI: false,
  paymentPayLater: false,
  sortDialogIsOpen: false,
  filterDialogIsOpen: false,
};

export const listSettingsSlice = createSlice({
  name: 'listSettings',
  initialState,
  reducers: {
    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setDataRange: (state, action: PayloadAction<string>) => {
      state.dataRange = action.payload;
    },
    setSortDialogIsOpen: (state, action: PayloadAction<boolean>) => {
      state.sortDialogIsOpen = action.payload;
    },
    setFilterDialogIsOpen: (state, action: PayloadAction<boolean>) => {
      state.filterDialogIsOpen = action.payload;
    },
    setCategoryGroceries: (state, action: PayloadAction<boolean>) => {
      state.categoryGroceries = action.payload;
    },
    setCategoryDining: (state, action: PayloadAction<boolean>) => {
      state.categoryDining = action.payload;
    },
    setCategoryTransport: (state, action: PayloadAction<boolean>) => {
      state.categoryTransport = action.payload;
    },
    setCategoryRent: (state, action: PayloadAction<boolean>) => {
      state.categoryRent = action.payload;
    },
    setAmountRange499: (state, action: PayloadAction<boolean>) => {
      state.amountRange499 = action.payload;
    },
    setAmountRange999: (state, action: PayloadAction<boolean>) => {
      state.amountRange999 = action.payload;
    },
    setAmountRange1999: (state, action: PayloadAction<boolean>) => {
      state.amountRange1999 = action.payload;
    },
    setAmountRange2000: (state, action: PayloadAction<boolean>) => {
      state.amountRange2000 = action.payload;
    },
    setPaymentCard: (state, action: PayloadAction<boolean>) => {
      state.paymentCard = action.payload;
    },
    setPaymentCash: (state, action: PayloadAction<boolean>) => {
      state.paymentCash = action.payload;
    },
    setPaymentUPI: (state, action: PayloadAction<boolean>) => {
      state.paymentUPI = action.payload;
    },
    setPaymentPayLater: (state, action: PayloadAction<boolean>) => {
      state.paymentPayLater = action.payload;
    },
    setDataPick: (state, action: PayloadAction<Dayjs | null>) => {
      state.dataPick = action.payload;
    },
  },
});

export const {
  setSearchString,
  setSort,
  setDataRange,
  setFilterDialogIsOpen,
  setSortDialogIsOpen,
  setCategoryGroceries,
  setCategoryDining,
  setCategoryTransport,
  setCategoryRent,
  setAmountRange499,
  setAmountRange999,
  setAmountRange1999,
  setAmountRange2000,
  setPaymentCard,
  setPaymentCash,
  setPaymentUPI,
  setPaymentPayLater,
  setDataPick,
} = listSettingsSlice.actions;

export default listSettingsSlice.reducer;
