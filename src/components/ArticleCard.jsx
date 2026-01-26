import { Link } from "react-router-dom";
import defaultAvatar from "../assets/woImage.png";
import heartIcon from "../assets/favorite.svg";

function ArticleCard({ article }) {
  return (
    <div className="article" key={article.slug}>
      <div className="article-header">
        <div className="article-profile">
          <img
            src={article.author.image || defaultAvatar}
            alt="author-img"
            className="author-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultAvatar;
            }}
          />
          <div className="author-info">
            <p className="username">{article.author.username}</p>
            <p className="created-at">
              {new Date(article.createdAt).toLocaleDateString("ru-RU", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <button className="likeBtn">
          <img src={heartIcon} alt="heart-icon" className="heart" />
          {article.favoritesCount}
        </button>
      </div>
      <div className="article-root">
        <div className="article-main">
          <Link to={article.slug}>
            <h4>{article.title}</h4>
          </Link>
          <p className="article-body">{article.body}</p>
          {article.tagList.filter((tag) => tag && tag.trim()).length > 0 && (
            <div className="article-tags">
              {article.tagList?.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
