import "./App.css";
import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import TopLoader from "./components/Loader/topLoader";
import MainHeader from "./components/Header/mainHeader";
import ArticleCard from "./components/Article/articleCard";
import { BookArticle } from "./types/BookArticle";
import { useDispatch, useSelector } from "react-redux";
import { addArticle, removeArticle } from "./store/actions/articleActions";
import { getArticles } from "./services/api";
import { QueryArticles, ArticleRequest } from "./types/QueryArticles";
import config from "./config/configApi";
import ArticleBookCard from "./components/Article/articleBookCard";

function App() {
  const dispatch = useDispatch();
  const bookArticles = useSelector(
    (state: { bookArticles: BookArticle[] }) => state.bookArticles
  );

  const [isLoading, setIsLoading] = useState(true);
  const [q, setQ] = useState("");
  const [articles, setArticles] = useState<BookArticle[]>([]);
  const [sidebarOpen, setSideBarOpen] = useState(false);


  const toggleSidebar = () => {
    setSideBarOpen((prev) => !prev);
  };

  const fetchArticles = async () => {
    const queryFetch: QueryArticles = {
      $query: {
        $and: [
          {
            keyword: q !== "" ? q : undefined,
            locationUri: "http://en.wikipedia.org/wiki/Indonesia",
          },
        ],
      },
      $filter: {
        forceMaxDataTimeWindow: 31,
      },
    };
    const dataFetch: ArticleRequest = {
      query: queryFetch,
      resultType: "articles",
      articlesSortBy: "date",
      apiKey: config.apiKey,
    };

    try {
      const data = await getArticles(dataFetch);
      if (data.articles.results.length === 0) return;

      let dataArticles: BookArticle[] = data.articles.results.map(
        (item: any) => ({
          uri: item.uri,
          url: item.url,
          title: item.title,
          date: item.date,
          time: item.time,
          source: item.source["title"],
          sourceUrl: item.source["uri"],
          image: item.image,
          isBooked: false,
        })
      );

      setIsLoading(false);

      setArticles(dataArticles);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching articles:", error);
    }
  };

  const handleClickSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setArticles([]);
    setIsLoading(true);
    if (q !== "") {
      fetchArticles();
    }
  };

  const handleAddArticle = (itemArticle: BookArticle) => {
    const isBooked = bookArticles.findIndex(
      (item) => item.uri == itemArticle.uri
    );

    if (isBooked === -1) {
      const articlesUpdate = [...articles];
      const indexOfItem = articlesUpdate.indexOf(itemArticle);

      let itemUpdate = { ...itemArticle, isBooked: true };
      articlesUpdate[indexOfItem] = itemUpdate;

      setArticles(articlesUpdate);

      dispatch(addArticle(itemUpdate));
    }
  };

  const handleRemoveArticle = (itemArticle: BookArticle) => {
    
    const articlesUpdate = [...articles];
    const indexOfItem = articlesUpdate.indexOf(itemArticle);

    let itemUpdate = { ...itemArticle, isBooked: false };
    articlesUpdate[indexOfItem] = itemUpdate;

    setArticles(articlesUpdate);

    dispatch(removeArticle(itemUpdate));
  };

  const handleOnChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <TopLoader isActive={isLoading}></TopLoader>
      <MainHeader
        query={q}
        handleClickFav={toggleSidebar}
        handleOnChangeQuery={handleOnChangeQuery}
        handleClickSearch={handleClickSearch}
      ></MainHeader>

      <div className="max-w-[960px] w-full mx-auto pt-20">
        {articles.map((item) => {
          return (
            <ArticleCard
              key={item.uri}
              uri={item.uri}
              title={item.title}
              date={item.date}
              time={item.time}
              source={item.source}
              sourceUrl={item.sourceUrl}
              url={item.url}
              image={item.image}
              isBooked={item.isBooked}
              handleAddArticle={() => handleAddArticle(item)}
            ></ArticleCard>
          );
        })}
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-full bg-sidebar-overlay ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div className="fixed right-0 top-0 w-xs h-full bg-white p-8 shadow-lg overflow-y-scroll">
          <div className="flex justify-between">
            <h2 className="title">Bookmark</h2>
            <div
              className="flex justify-end cursor-pointer"
              onClick={toggleSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 -960 960 960"
                width="32px"
                fill="#999999"
              >
                <path d="m336-307.69 144-144 144 144L652.31-336l-144-144 144-144L624-652.31l-144 144-144-144L307.69-624l144 144-144 144L336-307.69ZM480.13-120q-74.67 0-140.41-28.34-65.73-28.34-114.36-76.92-48.63-48.58-76.99-114.26Q120-405.19 120-479.87q0-74.67 28.34-140.41 28.34-65.73 76.92-114.36 48.58-48.63 114.26-76.99Q405.19-840 479.87-840q74.67 0 140.41 28.34 65.73 28.34 114.36 76.92 48.63 48.58 76.99 114.26Q840-554.81 840-480.13q0 74.67-28.34 140.41-28.34 65.73-76.92 114.36-48.58 48.63-114.26 76.99Q554.81-120 480.13-120Zm-.13-40q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
            </div>
          </div>

          <div className="pt-4">
            {bookArticles.length <= 0 && (
              <p className="text-center">Belum ada data Artikel disimpan</p>
            )}
            {bookArticles.map((item) => {
              return (
                <ArticleBookCard
                  key={item.uri}
                  uri={item.uri}
                  title={item.title}
                  date={item.date}
                  time={item.time}
                  source={item.source}
                  sourceUrl={item.sourceUrl}
                  url={item.url}
                  image={item.image}
                  isBooked={item.isBooked}
                  handleRemoveArticle={() => handleRemoveArticle(item)}
                ></ArticleBookCard>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
