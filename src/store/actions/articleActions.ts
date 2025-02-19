import { BookArticle } from "../../types/BookArticle";

export const addArticle = (article: BookArticle) => ({
  type: "addArticle",
  payload: article,
});

export const removeArticle = (article: BookArticle) => ({
  type: "removeArticle",
  payload: article.uri,
});
