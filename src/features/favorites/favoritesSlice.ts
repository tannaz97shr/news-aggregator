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
    removeSource: (state, action: PayloadAction<ISource>) => {
      state.sources = state.sources.filter(
        (src: ISource) => src.id !== action.payload.id
      );
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.category = state.category.filter(
        (cat: string) => cat !== action.payload
      );
    },
    removeAuthor: (state, action: PayloadAction<string>) => {
      state.author = state.author.filter(
        (author: string) => author !== action.payload
      );
    },
  },
});

export const {
  addSource,
  addCategory,
  addAuthor,
  removeSource,
  removeCategory,
  removeAuthor,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
