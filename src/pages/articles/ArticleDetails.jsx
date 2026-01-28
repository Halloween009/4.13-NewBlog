import { useParams, useNavigate } from "react-router-dom";
import { getArcticle } from "../../services/articleServices";
import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import defaultAvatar from "../../assets/woImage.png";
import { deleteArticle } from "../../services/authServices";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/modal/Modal";
import likeCount from "../../utils/likeCount";

function ArticleDetails() {
  const { slug } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const data = await getArcticle(slug);
        setArticle(data.article);
      } catch (error) {
        console.log("Couldn't get article. Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleData();
  }, [slug]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    setError("");
    const token = localStorage.getItem("token");
    await deleteArticle(article.slug, token);
    navigate("/");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    navigate(`/${article.slug}/edit`);
  };

  const handleLike = async () => {
    const result = likeCount(isLiked, favoritesCount);
    setIsLiked(result.isLiked);
    setFavoritesCount(result.favoritesCount);
  };

  return (
    <div className="article-details">
      <div className="article-details-header">
        <div className="article-details-header-box">
          <h1>{article.title}</h1>
          <div className="article-author">
            <img
              src={article.author.image || defaultAvatar}
              alt="author-img"
              className="author-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultAvatar;
              }}
            />
            <div className="article-author-info">
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
        </div>
        <div className="btn-container">
          {user && user.username === article.author.username && (
            <>
              {error && <p>{error}</p>}
              <button
                className="deleteBtn"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Delete post
              </button>
              <button className="editBtn" onClick={handleEdit}>
                Edit post
              </button>
            </>
          )}
        </div>
        {openModal && (
          <Modal closeModal={setOpenModal} deleteArticle={handleDelete} />
        )}
      </div>
      <div className="article-details-body">
        <div className="article-details-body-box">
          <div className="article-markdown">
            <Markdown>{article.body}</Markdown>
          </div>
          <div className="article-tags">
            {article.tagList.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="article-details-like">
          {isLiked ? (
            <button
              className="article-details-likeBtn liked-details"
              onClick={handleLike}
            >
              Unfavorite Article
            </button>
          ) : (
            <button className="article-details-likeBtn" onClick={handleLike}>
              Favorite Article
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleDetails;
