import {
  addIngredients,
  constructorSlice,
  initialConstructorState,
  orderBurger,
  removeIngredient,
  reorderIngredients,
  resetBurger
} from '@slices';
import { error, mockIngredients, mockOrder } from './mockData';

describe('Проверка редьюсера слайса constructorSlice', () => {
  test('Проверка обработки экшена добавления булки', () => {
    const state = constructorSlice.reducer(
      initialConstructorState,
      addIngredients(mockIngredients[0])
    );

    expect(state.burger.bun).toEqual({
      ...mockIngredients[0],
      id: expect.any(String)
    });
    expect(state.burger.ingredients).toEqual([]);
  });

  test('Проверка обработки экшена добавления ингредиента', () => {
    const state = constructorSlice.reducer(
      initialConstructorState,
      addIngredients(mockIngredients[1])
    );

    expect(state.burger.ingredients).toHaveLength(1);

    expect(state.burger.ingredients[0]).toEqual({
      ...mockIngredients[1],
      id: expect.any(String)
    });
    expect(state.burger.bun).toBeNull();
  });

  test('Проверка обработки экшена удаления ингредиента', () => {
    const initialDeleteState = {
      ...initialConstructorState,
      burger: {
        bun: null,
        ingredients: [{ ...mockIngredients[1], id: '23' }]
      }
    };

    const state = constructorSlice.reducer(
      initialDeleteState,
      removeIngredient(initialDeleteState.burger.ingredients[0])
    );

    expect(state.burger.ingredients).toHaveLength(0);
    expect(state.burger.bun).toBeNull();
  });

  test('Проверка изменения порядка ингредиентов в начинке', () => {
    const initialReorderState = {
      ...initialConstructorState,
      burger: {
        bun: { ...mockIngredients[0], id: '12' },
        ingredients: [
          { ...mockIngredients[1], id: '23' },
          { ...mockIngredients[2], id: '34' }
        ]
      }
    };

    const state = constructorSlice.reducer(
      initialReorderState,
      reorderIngredients({ from: 0, to: 1 })
    );

    expect(state.burger.ingredients).toHaveLength(2);
    expect(state.burger.ingredients).toEqual([
      { ...mockIngredients[2], id: '34' },
      { ...mockIngredients[1], id: '23' }
    ]);
  });

  test('Проверка очистки всех полей в конструкторе', () => {
    const initialRemoveAllState = {
      ...initialConstructorState,
      burger: {
        bun: { ...mockIngredients[0], id: '12' },
        ingredients: [
          { ...mockIngredients[1], id: '23' },
          { ...mockIngredients[2], id: '34' }
        ]
      }
    };

    const state = constructorSlice.reducer(
      initialRemoveAllState,
      resetBurger()
    );

    expect(state.burger.bun).toBeNull();
    expect(state.burger.ingredients).toHaveLength(0);
    expect(state.burger.ingredients).toEqual([]);
  });
});

describe('Проверка экстра редьюсеров слайса constructorSlice', () => {
  const initialState = {
    ...initialConstructorState,
    burger: {
      bun: { ...mockIngredients[0], id: '0' },
      ingredients: [
        { ...mockIngredients[1], id: '1' },
        { ...mockIngredients[2], id: '2' }
      ]
    }
  };

  it('Проверка оформления заказа Pending', () => {
    const state = constructorSlice.reducer(
      initialState,
      orderBurger.pending('', [])
    );

    expect(state.constructorLoading).toBeTruthy();
    expect(state.error).toBe('');
  });

  it('Проверка оформления заказа Rejected', () => {
    const state = constructorSlice.reducer(
      initialState,
      orderBurger.rejected(error, '', [])
    );

    expect(state.constructorLoading).toBeFalsy();
    expect(state.error).toBe(error.message);
  });

  it('Проверка оформления заказа Fulfilled', () => {
    const state = constructorSlice.reducer(
      { ...initialState, constructorLoading: true },
      orderBurger.fulfilled(
        { success: true, order: mockOrder, name: '1' },
        '',
        []
      )
    );

    expect(state).toEqual({
      ...initialConstructorState,
      modalData: mockOrder
    });
  });
});
