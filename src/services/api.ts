import config from "../config/configApi";
import { ArticleRequest } from "../types/QueryArticles";

export const getArticles = async (ArticlesQuery: ArticleRequest) => {
  const res = await fetch(`${config.apiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ArticlesQuery),
  });

  if (!res.ok) {
    throw new Error("Error in our server");
  }

  const data = await res.json();
  return data;
};
