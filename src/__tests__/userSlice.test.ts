import {
  getOrdersUser,
  getUser,
  initialUserState,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userSlice
} from '@slices';
import { error, mockOrdersUser, mockUser } from './mockData';

describe('Проверка экстра редьюсеров слайса userSlice', () => {
  it('Проверка регистрации пользователя Pending', () => {
    const state = userSlice.reducer(initialUserState, {
      type: registerUser.pending.type
    });

    expect(state.error).toBe('');
    expect(state.loadingUser).toBeTruthy();
  });

  it('Проверка регистрации пользователя Rejected', () => {
    const state = userSlice.reducer(initialUserState, {
      type: registerUser.rejected.type,
      error
    });

    expect(state.error).toBe(error.message);
    expect(state.loadingUser).toBeFalsy();
  });

  it('Проверка регистрации пользователя Fulfilled', () => {
    const state = userSlice.reducer(initialUserState, {
      type: registerUser.fulfilled.type,
      payload: mockUser
    });

    expect(state).toEqual({
      ...initialUserState,
      userData: mockUser
    });
  });

  it('Проверка входа пользователя Pending', () => {
    const state = userSlice.reducer(initialUserState, {
      type: loginUser.pending.type
    });

    expect(state.error).toBe('');
    expect(state.loadingUser).toBeTruthy();
  });

  it('Проверка входа пользователя Rejected', () => {
    const state = userSlice.reducer(initialUserState, {
      type: loginUser.rejected.type,
      error
    });

    expect(state.error).toBe(error.message);
    expect(state.loadingUser).toBeFalsy();
  });

  it('Проверка входа пользователя Fulfilled', () => {
    const state = userSlice.reducer(initialUserState, {
      type: loginUser.fulfilled.type,
      payload: mockUser
    });

    expect(state).toEqual({
      ...initialUserState,
      userData: mockUser
    });
  });

  it('Проверка выхода пользователя Pending', () => {
    const state = userSlice.reducer(
      { ...initialUserState, userData: mockUser },
      {
        type: logoutUser.pending.type
      }
    );

    expect(state.error).toBe('');
    expect(state.loadingUser).toBeTruthy();
  });

  it('Проверка выхода пользователя Rejected', () => {
    const state = userSlice.reducer(initialUserState, {
      type: logoutUser.rejected.type,
      error
    });

    expect(state.error).toBe(error.message);
    expect(state.loadingUser).toBeFalsy();
  });

  it('Проверка выхода пользователя Fulfilled', () => {
    const state = userSlice.reducer(
      { ...initialUserState, userData: mockUser },
      {
        type: logoutUser.fulfilled.type,
        payload: { success: true }
      }
    );

    expect(state).toEqual(initialUserState);
  });

  it('Проверка изменения данных пользователя Pending', () => {
    const state = userSlice.reducer(initialUserState, {
      type: updateUser.pending.type
    });

    expect(state.error).toBe('');
    expect(state.loadingUser).toBeTruthy();
  });

  it('Проверка изменения данных пользователя Rejected', () => {
    const state = userSlice.reducer(initialUserState, {
      type: updateUser.rejected.type,
      error
    });

    expect(state.error).toBe(error.message);
    expect(state.loadingUser).toBeFalsy();
  });

  it('Проверка изменения данных пользователя Fulfilled', () => {
    const state = userSlice.reducer(initialUserState, {
      type: updateUser.fulfilled.type,
      payload: mockUser
    });

    expect(state).toEqual({
      ...initialUserState,
      userData: mockUser
    });
  });

  it('Проверка получения информации пользователя Pending', () => {
    const state = userSlice.reducer(initialUserState, {
      type: getUser.pending.type
    });

    expect(state.error).toBe('');
    expect(state.loadingUser).toBeTruthy();
  });

  it('Проверка получения информации пользователя Rejected', () => {
    const state = userSlice.reducer(initialUserState, {
      type: getUser.rejected.type,
      error
    });

    expect(state.error).toBe(error.message);
    expect(state.loadingUser).toBeFalsy();
  });

  it('Проверка получения информации пользователя Fulfilled', () => {
    const state = userSlice.reducer(initialUserState, {
      type: getUser.fulfilled.type,
      payload: mockUser
    });

    expect(state).toEqual({
      ...initialUserState,
      userData: mockUser
    });
  });

  it('Проверка получения заказов пользователя Pending', () => {
    const state = userSlice.reducer(initialUserState, {
      type: getOrdersUser.pending.type
    });

    expect(state.error).toBe('');
  });

  it('Проверка получения заказов пользователя Rejected', () => {
    const state = userSlice.reducer(initialUserState, {
      type: getOrdersUser.rejected.type,
      error
    });

    expect(state.error).toBe(error.message);
  });

  it('Проверка получения заказов пользователя Fulfilled', () => {
    const state = userSlice.reducer(initialUserState, {
      type: getOrdersUser.fulfilled.type,
      payload: mockOrdersUser
    });

    expect(state).toEqual({
      ...initialUserState,
      orders: mockOrdersUser
    });
  });
});
