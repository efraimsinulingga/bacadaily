export interface QueryArticles {
  $query: {
    $and: Array<{
      keyword?: string;
      keywordLoc?: string;
      categoryUri?: string;
      locationUri: string;
    }>;
  };
  $filter: {
    forceMaxDataTimeWindow: number;
  };
}

export interface ArticleRequest {
  query: QueryArticles;
  resultType: "articles";
  articlesSortBy: "date";
  apiKey: string;
}
