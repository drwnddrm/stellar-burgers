import {
  getOrderByNumber,
  getOrders,
  initialOrderState,
  ordersSlice
} from '@slices';
import { error, mockFeed, mockOrder } from './mockData';

describe('Проверка экстра редьюсеров ordersSlice', () => {
  it('Проверка получения всех заказов Pending', () => {
    const state = ordersSlice.reducer(initialOrderState, {
      type: getOrders.pending.type
    });

    expect(state.error).toBe('');
    expect(state.loadingOrder).toBeTruthy();
  });

  it('Проверка получения всех заказов Rejected', () => {
    const state = ordersSlice.reducer(initialOrderState, {
      type: getOrders.rejected.type,
      error
    });

    expect(state.error).toBe(error.message);
    expect(state.loadingOrder).toBeFalsy();
  });

  it('Проверка получения всех заказов Fulfilled', () => {
    const state = ordersSlice.reducer(initialOrderState, {
      type: getOrders.fulfilled.type,
      payload: mockFeed
    });

    expect(state).toEqual({
      ...mockFeed,
      error: '',
      order: null,
      loadingOrder: false
    });
  });

  it('Проверка получения заказа по номеру Pending', () => {
    const state = ordersSlice.reducer(
      initialOrderState,
      getOrderByNumber.pending('', 0)
    );

    expect(state.error).toBe('');
    expect(state.loadingOrder).toBeTruthy();
  });

  it('Проверка получения заказа по номеру Rejected', () => {
    const state = ordersSlice.reducer(
      initialOrderState,
      getOrderByNumber.rejected(error, '', 0)
    );

    expect(state.error).toBe(error.message);
    expect(state.loadingOrder).toBeFalsy();
  });

  it('Проверка получения заказа по номеру Fulfilled', () => {
    const state = ordersSlice.reducer(
      initialOrderState,
      getOrderByNumber.fulfilled({ orders: [mockOrder], success: true }, '', 0)
    );

    expect(state).toEqual({
      ...initialOrderState,
      order: mockOrder
    });
  });
});
