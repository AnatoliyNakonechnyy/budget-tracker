import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from './types';
import type { RootState } from '../../../app/store';
import { fetchUsers, postUser } from '../api';
import type { LoginFormDataType } from '../../auth/model/types';

export const createNewUser = createAsyncThunk('user/createNewUser', postUser);

export const fetchUser = createAsyncThunk(
  'users/fetchAll',
  async (data: LoginFormDataType) => {
    const response = await fetchUsers();

    return response.find(
      (user: User) =>
        user.email === data.email && user.password === data.password,
    );
  },
);

interface UserState {
  user: User | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

// Define the initial state using that type
const initialState: UserState = {
  user: null,
  loading: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewUser.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = 'succeeded';
    });
    builder.addCase(createNewUser.rejected, (state) => {
      state.loading = 'failed';
    });

    builder.addCase(fetchUser.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      // Assuming the API returns an array of users, we take the first one for simplicity
      console.log('Fetched users:', action.payload);
      state.user = action.payload || null;
      state.loading = 'succeeded';
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});

export const { setUser, clearUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
