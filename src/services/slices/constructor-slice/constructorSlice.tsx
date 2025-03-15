import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';

type TconstructorState = {
  constructorLoading: boolean;
  burger: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  modalData: TOrder | null;
  error: string;
};

export const initialConstructorState: TconstructorState = {
  constructorLoading: false,
  burger: {
    bun: null,
    ingredients: []
  },
  modalData: null,
  error: ''
};

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (data: string[]) => {
    const res = await orderBurgerApi(data);
    return res;
  }
);

export const constructorSlice = createSlice({
  name: 'constuctor',
  initialState: initialConstructorState,
  reducers: {
    addIngredients: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.burger.bun = action.payload;
        } else {
          state.burger.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.burger.ingredients = state.burger.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    reorderIngredients: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const ingredients = [...state.burger.ingredients];
      ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);
      state.burger.ingredients = ingredients;
    },
    resetBurger: () => initialConstructorState
  },
  selectors: {
    selectBurger: (state) => state.burger,
    selectLoadingConstructor: (state) => state.constructorLoading,
    selectModalData: (state) => state.modalData
  },
  extraReducers(builder) {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.constructorLoading = true;
        state.error = '';
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.constructorLoading = false;
        state.error = action.error.message ? action.error.message : '';
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.burger = {
          bun: null,
          ingredients: []
        };
        state.constructorLoading = false;
        state.modalData = action.payload.order;
      });
  }
});

export const { selectBurger, selectLoadingConstructor, selectModalData } =
  constructorSlice.selectors;

export const {
  addIngredients,
  removeIngredient,
  reorderIngredients,
  resetBurger
} = constructorSlice.actions;

export default constructorSlice.reducer;
