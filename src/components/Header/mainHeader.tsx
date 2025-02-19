import IconSearch from "../../assets/ic_search.png";
import IconBook from "../../assets/ic_book.png";
import { useSelector } from "react-redux";
import { BookArticle } from "../../types/BookArticle";

interface MainHeaderProps {
  query: string;
  handleClickFav: () => void;
  handleClickSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  handleOnChangeQuery: (e: React.ChangeEvent<HTMLInputElement>) =>void
}

const MainHeader = (props: MainHeaderProps) => {
  const bookArticles = useSelector(
    (state: { bookArticles: BookArticle[] }) => state.bookArticles
  );

  return (
    <div className="max-w-[720px] w-full mx-auto pt-10">
      <div className="flex justify-between">
        <h2 className="title text-4xl pr-10">BacaDaily</h2>
        <form onSubmit={props.handleClickSearch} className="flex justify-between bg-gray-50 border rounded-full border-stone-300 w-full relative mr-4">
          <input
            type="text"
            name="query"
            className="w-full pl-4"
            placeholder="Cari topik..."
            onChange={props.handleOnChangeQuery}
          ></input>
          <button className="absolute rounded-full bg-lime-500 right-2 top-2 p-2">
            <img width={16} src={IconSearch}></img>
          </button>
        </form>
        <div onClick={props.handleClickFav} className="flex justify-between border bg-gray-50 rounded-full border-stone-300 w-32">
          <div className="rounded-full w-8 h-8 bg-gray-200 m-2 flex justify-center items-center text-gray-500 text-xs">
            {bookArticles.length}
          </div>
          <img
            className="object-contain aspect-square mr-2"
            width={18}
            height={18}
            src={IconBook}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
