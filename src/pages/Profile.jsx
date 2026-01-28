import defaultAvatar from "../assets/woImage.png";
import heartImg from "../assets/favorite-alt-green.svg";
import ArticleCard from "../components/ArticleCard";
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getArticles } from "../services/articleServices";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [articles, setArticles] = useState({ articles: [], articlesCount: 0 });
  const [searchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = 10;
  const totalPages = Math.ceil(articles.articlesCount / limit);

  useEffect(() => {
    const fetchUserArticles = async () => {
      try {
        const data = await getArticles({ author: user?.username });
        setArticles(data);
      } catch (error) {
        throw Error("Couldn't get articles by author. Error:", error);
      }
    };
    fetchUserArticles();
  }, [user?.username]);

  return (
    <div className="profile">
      <div className="profile-header">
        <img
          src={user?.image || defaultAvatar}
          alt="author-img"
          className="author-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultAvatar;
          }}
        />
        <p>{user?.username}</p>
        <button className="profile-favoriteBtn">
          <img src={heartImg} alt="heartImg" className="profile-img" />
          <span>Like</span>
        </button>
      </div>
      <div className="profile-body">
        {articles.articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
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
  );
}

export default Profile;
