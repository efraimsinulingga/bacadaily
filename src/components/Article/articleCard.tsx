interface ArticleCardProps {
  uri: string;
  title: string;
  date: string;
  time: string;
  source: string;
  sourceUrl: string;
  url: string;
  image: string;
  isBooked: boolean;
  handleAddArticle: () => void
}

const ArticleCard = (props: ArticleCardProps) => {
  return (
    <div className="flex justify-start w-full border-b-2 border-stone-200 pb-8 pt-8">
      
        <img
          src={props.image}
          className="w-70 h-full rounded object-cover mr-4"
          alt={props.title}
        ></img>
      <div className="meta">
        <h2 className="title text-4xl">{props.title}</h2>
        <div className="flex justify-between pt-2">
          <div className="text-xs text-gray-500">
            <span>
              {props.date} {props.time}
            </span>{" "}
            &bull; <span>{props.source}</span>
          </div>
          <div className="action">
            {!props.isBooked && (
              <span onClick={props.handleAddArticle} className="cursor-pointer text-gray-400 rounded-full bg-gray-100 px-4 py-2 border border-stone-300 mr-4">
                Bookmark
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
    </div>
  );
};

export default ArticleCard;
