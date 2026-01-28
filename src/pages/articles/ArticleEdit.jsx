import ArticleForm from "./ArticleForm";
import { editArticle } from "../../services/authServices";
import { getArcticle } from "../../services/articleServices";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ArticleEdit() {
  const { slug } = useParams();
  const [initialData, setInitialData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArticleData() {
      const data = await getArcticle(slug);
      setInitialData(data.article);
    }
    fetchArticleData();
  }, [slug]);
  const handleEdit = async (data) => {
    const token = localStorage.getItem("token");
    await editArticle(slug, data, token);
    navigate(`/${slug}`);
  };
  if (!initialData) return <div>Loading...</div>;
  return (
    <ArticleForm
      initialData={initialData}
      onSubmit={handleEdit}
      buttonText="Update Article"
    />
  );
}

export default ArticleEdit;
