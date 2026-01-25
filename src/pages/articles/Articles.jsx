import { useSearchParams, Link } from "react-router-dom";
import heartIcon from "../../assets/favorite.svg";
import defaultAvatar from "../../assets/woImage.png";
import { getArticles, getTags } from "../../services/articleServices";
import { useEffect, useState } from "react";

function Articles() {
  const [articles, setArticles] = useState({ articles: [], articlesCount: 0 });
  const [tags, setTags] = useState([]);
  const [searchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = 10;
  const totalPages = Math.ceil(articles.articlesCount / limit);

  useEffect(() => {
    const fetchArticlesData = async () => {
      try {
        const offset = (currentPage - 1) * limit;
        const data = await getArticles({ limit, offset });
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    const fetchTags = async () => {
      try {
        const data = await getTags();
        setTags(data.tags || []);
      } catch (error) {
        console.log("Couldn't get tags. Error:", error);
      }
    };
    fetchTags();
    fetchArticlesData();
  }, [currentPage]);

  return (
    <div className="main">
      <div className="title-big">
        <Link to="/" className="title">
          Realworld Blog
        </Link>
        <h3>A place to share your knowledge</h3>
      </div>

      <div className="articles">
        <div className="popular-tags">
          <h2>Popular tags</h2>
          <div className="tag-list">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        {articles.articles.map((article) => (
          <div key={article.slug} className="article">
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
                <Link to={article.slug} key={article.slug}>
                  <h4>{article.title}</h4>
                </Link>
                <p className="article-body">{article.body}</p>
                {article.tagList.filter((tag) => tag && tag.trim()).length >
                  0 && (
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
        ))}
        <div className="pagination">
          {currentPage > 1 && (
            <Link to={`?page=${currentPage - 1}`} className="previous">
              Previous
            </Link>
          )}

          {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
            let pageNum;
            if (currentPage <= 5) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 6 + i;
            } else {
              pageNum = currentPage - 3 + i;
            }

            return (
              <Link
                key={pageNum}
                to={`?page=${pageNum}`}
                className={`pages ${currentPage === pageNum ? "active" : ""}`}
              >
                {pageNum}
              </Link>
            );
          })}
          {currentPage < totalPages && (
            <Link to={`?page=${currentPage + 1}`} className="next">
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Articles;
