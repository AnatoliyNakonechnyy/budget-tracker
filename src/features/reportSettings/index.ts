import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Dayjs } from 'dayjs';

interface ReportSettingsState {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

const initialState: ReportSettingsState = {
  startDate: null,
  endDate: null,
};

export const reportSettingsSlice = createSlice({
  name: 'reportSettings',
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<Dayjs | null>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<Dayjs | null>) => {
      state.endDate = action.payload;
    },
  },
});

export const { setStartDate, setEndDate } = reportSettingsSlice.actions;

export default reportSettingsSlice.reducer;
