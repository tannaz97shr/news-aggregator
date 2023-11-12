import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ISource } from "../../models/news";

export interface FavoritesState {
  sources: ISource[];
  category: string[];
  author: string[];
}

const initialState: FavoritesState = {
  sources: [],
  category: [],
  author: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addSource: (state, action: PayloadAction<ISource>) => {
      state.sources = [...state.sources, action.payload];
    },
    addCategory: (state, action: PayloadAction<string>) => {
      state.category = [...state.category, action.payload];
    },
    addAuthor: (state, action: PayloadAction<string>) => {
      state.author = [...state.author, action.payload];
    },
  },
});

export const { addSource, addCategory, addAuthor } = favoritesSlice.actions;

export default favoritesSlice.reducer;
