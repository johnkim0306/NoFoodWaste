import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FoodItem {
  name: string;
  expiry: number;
}

interface FoodItemsState {
  items: FoodItem[];
}

const initialState: FoodItemsState = {
  items: [],
};

const foodItemsSlice = createSlice({
  name: 'foodItems',
  initialState,
  reducers: {
    setFoodItems(state, action: PayloadAction<FoodItem[]>) {
      state.items = action.payload;
    },
    addFoodItem(state, action: PayloadAction<FoodItem>) {
      state.items.push(action.payload);
    },
    removeFoodItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
  },
});

export const { setFoodItems, addFoodItem, removeFoodItem } = foodItemsSlice.actions;
export default foodItemsSlice.reducer;
