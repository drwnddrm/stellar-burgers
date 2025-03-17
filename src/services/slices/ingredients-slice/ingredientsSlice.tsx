import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

type TIngredientsState = {
  ingredients: TIngredient[];
  loadingIngredients: boolean;
  error: string;
};

export const initialIngredientsState: TIngredientsState = {
  ingredients: [],
  loadingIngredients: false,
  error: ''
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const res = await getIngredientsApi();
    return res;
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialIngredientsState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectLoadingIngredients: (state) => state.loadingIngredients
  },
  extraReducers(builder) {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loadingIngredients = true;
        state.error = '';
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loadingIngredients = false;
        state.error = action.error.message ? action.error.message : '';
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loadingIngredients = false;
      });
  }
});

export const { selectIngredients, selectLoadingIngredients } =
  ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
