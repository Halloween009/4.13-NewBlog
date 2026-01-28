import { Form } from "react-router-dom";
import { createArticle } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import ArticleForm from "./ArticleForm";

function NewArticle() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      const token = localStorage.getItem("token");
      await createArticle(data, token);
      navigate("/");
    } catch (error) {
      throw Error("Couldn't create article", error);
    }
  };

  return <ArticleForm onSubmit={handleCreate} buttonText="Publish Article" />;
}

export default NewArticle;
