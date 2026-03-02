import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ListSettingsState {
  searchString: string;
  sort: string;
  dataRange: boolean;
  sortDialogIsOpen: boolean;
  filterDialogIsOpen: boolean;
}

const initialState: ListSettingsState = {
  searchString: '',
  sort: 'Newest',
  dataRange: false,
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
    setDataRange: (state, action: PayloadAction<boolean>) => {
      state.dataRange = action.payload;
    },
    setSortDialogIsOpen: (state, action: PayloadAction<boolean>) => {
      state.sortDialogIsOpen = action.payload;
    },
    setFilterDialogIsOpen: (state, action: PayloadAction<boolean>) => {
      state.filterDialogIsOpen = action.payload;
    },
  },
});

export const {
  setSearchString,
  setSort,
  setDataRange,
  setFilterDialogIsOpen,
  setSortDialogIsOpen,
} = listSettingsSlice.actions;

export default listSettingsSlice.reducer;
