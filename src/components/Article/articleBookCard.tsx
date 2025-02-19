interface ArticleBookCardProps {
  uri: string;
  title: string;
  date: string;
  time: string;
  source: string;
  sourceUrl: string;
  url: string;
  image: string;
  isBooked: boolean;
  handleRemoveArticle: () => void;
}

const ArticleBookCard = (props: ArticleBookCardProps) => {
  return (
    <div className="w-full border-b-2 border-stone-200 pb-8 pt-8">
      <img
        src={props.image}
        className="w-full h-30 rounded object-cover mr-4"
        alt={props.title}
      ></img>
      <div className="meta">
        <h2 className="title text-2xl">{props.title}</h2>
        <div className="flex justify-between pt-2">
          <div className="text-xs text-gray-500">
            <span>
              {props.date} {props.time}
            </span>{" "}
            &bull; <span>{props.source}</span>
          </div>
        </div>
        <div className="action pt-4">
          {props.isBooked && (
            <span
              onClick={props.handleRemoveArticle}
              className="cursor-pointer text-gray-400 rounded-full bg-gray-100 px-4 py-2 border border-stone-300 mr-4"
            >
              Unbookmark
            </span>
          )}
          <a
            className="rounded-full bg-gray-100 text-indigo-100 px-4 py-2 border border-stone-300"
            href={props.url}
            target="_blank"
          >
            Read
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleBookCard;
