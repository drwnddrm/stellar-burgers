import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi, getOrderByNumberApi } from '@api';

type TOrderState = {
  order: TOrder | null;
  orders: TOrder[];
  total: number;
  totalToday: number;
  loadingOrder: boolean;
  error: string;
};

export const initialOrderState: TOrderState = {
  order: null,
  orders: [],
  total: 0,
  totalToday: 0,
  loadingOrder: false,
  error: ''
};

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrder',
  async (num: number) => getOrderByNumberApi(num)
);

export const getOrders = createAsyncThunk('orders/getFeed', getFeedsApi);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialOrderState,
  reducers: {},
  selectors: {
    selectOrders: (state) => state.orders,
    selectOrder: (state) => state.order,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday,
    selectLoadingOrder: (state) => state.loadingOrder
  },
  extraReducers(builder) {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.loadingOrder = true;
        state.error = '';
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loadingOrder = false;
        state.error = action.error.message ? action.error.message : '';
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loadingOrder = false;
        state.order = action.payload.orders[0];
      })
      .addCase(getOrders.pending, (state) => {
        state.loadingOrder = true;
        state.error = '';
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loadingOrder = false;
        state.error = action.error.message ? action.error.message : '';
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loadingOrder = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const {
  selectLoadingOrder,
  selectOrder,
  selectOrders,
  selectTotal,
  selectTotalToday
} = ordersSlice.selectors;

export default ordersSlice.reducer;
