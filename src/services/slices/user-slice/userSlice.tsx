import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import {
  forgotPasswordApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../../../utils/cookie';

type TUserState = {
  userData: TUser | null;
  orders: TOrder[];
  loadingUser: boolean;
  error: string;
};

export const initialUserState: TUserState = {
  userData: null,
  orders: [],
  loadingUser: false,
  error: ''
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);

    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);

    return res.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);

    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);

    return res.user;
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  const res = await logoutApi();

  deleteCookie('accessToken');
  localStorage.clear();
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => {
    const res = await updateUserApi(data);

    return res.user;
  }
);

export const getUser = createAsyncThunk('user/getUser', async () => {
  const res = await getUserApi();

  return res.user;
});

export const getOrdersUser = createAsyncThunk(
  'user/getOrdersUser',
  async () => {
    const res = await getOrdersApi();
    return res;
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  resetPasswordApi
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  forgotPasswordApi
);

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {},
  selectors: {
    selectUserData: (state) => state.userData,
    selectUserLoading: (state) => state.loadingUser,
    selectUserOrders: (state) => state.orders,
    selectUserError: (state) => state.error
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loadingUser = true;
        state.error = '';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loadingUser = false;
        state.error = action.error.message ? action.error.message : '';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.userData = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loadingUser = true;
        state.error = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loadingUser = false;
        state.error = action.error.message ? action.error.message : '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.userData = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loadingUser = true;
        state.error = '';
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loadingUser = false;
        state.error = action.error.message ? action.error.message : '';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userData = null;
        state.loadingUser = false;
        state.orders = [];
      })
      .addCase(updateUser.pending, (state) => {
        state.loadingUser = true;
        state.error = '';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loadingUser = false;
        state.error = action.error.message ? action.error.message : '';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.userData = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.loadingUser = true;
        state.error = '';
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loadingUser = false;
        state.error = action.error.message ? action.error.message : '';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.userData = action.payload;
      })
      .addCase(getOrdersUser.pending, (state) => {
        state.error = '';
      })
      .addCase(getOrdersUser.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : '';
      })
      .addCase(getOrdersUser.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  }
});

export const {
  selectUserData,
  selectUserLoading,
  selectUserOrders,
  selectUserError
} = userSlice.selectors;

export default userSlice.reducer;
