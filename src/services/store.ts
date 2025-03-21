import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {
  constructorSlice,
  ingredientsSlice,
  ordersSlice,
  userSlice
} from '@slices';

export const rootReducer = combineReducers({
  [constructorSlice.name]: constructorSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer,
  [userSlice.name]: userSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
