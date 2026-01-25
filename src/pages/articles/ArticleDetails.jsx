import { useParams } from "react-router-dom";
import { getArcticle } from "../../services/articleServices";
import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import defaultAvatar from "../../assets/woImage.png";

function ArticleDetails() {
  const { slug } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
      </div>
    </div>
  );
}

export default ArticleDetails;
