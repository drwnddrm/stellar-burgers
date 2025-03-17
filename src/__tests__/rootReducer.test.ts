import {
  constructorSlice,
  initialConstructorState,
  ingredientsSlice,
  initialIngredientsState,
  ordersSlice,
  initialOrderState,
  userSlice,
  initialUserState
} from '@slices';
import { rootReducer } from '../services/store';

const expectedState = {
  [constructorSlice.name]: initialConstructorState,
  [ingredientsSlice.name]: initialIngredientsState,
  [ordersSlice.name]: initialOrderState,
  [userSlice.name]: initialUserState
};

describe('Проверка rootReducer', () => {
  test('Проверка корректного начального состояния хранилища', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(expectedState);
  });
});
