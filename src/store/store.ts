import { configureStore } from "@reduxjs/toolkit";
import { BookArticle } from "../types/BookArticle";

const initialState: BookArticle[] = [];

const bookArticlesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "addArticle":
      return [...state, action.payload];
    case "removeArticle":
      return state.filter((article) => article.uri !== action.payload);
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: {
    bookArticles: bookArticlesReducer,
  },
});
