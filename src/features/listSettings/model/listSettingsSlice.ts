import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/store';

interface ListSettingsState {
  searchString: string;
  sortNewest: boolean;
  dataRange: boolean;
}

const initialState: ListSettingsState = {
  searchString: '',
  sortNewest: false,
  dataRange: false,
};

export const listSettingsSlice = createSlice({
  name: 'listSettings',
  initialState,
  reducers: {
    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    },
    setSortNewest: (state, action: PayloadAction<boolean>) => {
      state.sortNewest = action.payload;
    },
    setDataRange: (state, action: PayloadAction<boolean>) => {
      state.dataRange = action.payload;
    },
  },
});

export const { setSearchString, setSortNewest, setDataRange } =
  listSettingsSlice.actions;

export default listSettingsSlice.reducer;
