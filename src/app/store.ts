import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/model/userSlice';
import transactionReducer from '../features/transaction/model/transactionSlice';
import listSettingsReducer from '../features/listSettings/model/listSettingsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReducer,
    listSettings: listSettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
