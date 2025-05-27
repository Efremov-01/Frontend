// src/store/filterSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  searchText: string;
  maxPrice: number;
}

const initialState: FilterState = {
  searchText: '',
  maxPrice: 100000,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<number>) {
      state.maxPrice = action.payload;
    },
  },
});

export const { setSearchText, setMaxPrice } = filterSlice.actions;
export default filterSlice.reducer;
