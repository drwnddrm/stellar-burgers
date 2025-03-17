import {
  getIngredients,
  ingredientsSlice,
  initialIngredientsState
} from '@slices';
import { error, mockIngredients } from './mockData';

describe('Проверка экстра редьюсеров слайса ingredientSlice', () => {
  it('Проверка получения ингредиентов Pending', () => {
    const state = ingredientsSlice.reducer(
      initialIngredientsState,
      getIngredients.pending('')
    );

    expect(state.loadingIngredients).toBeTruthy();
    expect(state.error).toBe('');
  });

  it('Проверка получения ингредиентов Rejected', () => {
    const state = ingredientsSlice.reducer(
      initialIngredientsState,
      getIngredients.rejected(error, '')
    );

    expect(state.loadingIngredients).toBeFalsy();
    expect(state.error).toBe(error.message);
  });

  it('Проверка получения ингредиентов Fulfilled', () => {
    const state = ingredientsSlice.reducer(
      { ...initialIngredientsState, loadingIngredients: true },
      getIngredients.fulfilled(mockIngredients, '')
    );

    expect(state).toEqual({
      ...initialIngredientsState,
      ingredients: mockIngredients
    });
  });
});
