import { useState } from "react";
import closeSvg from "../../assets/close.svg";
import { Form } from "react-router-dom";

function ArticleForm({ initialData = {}, onSubmit, buttonText = "Save" }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [body, setBody] = useState(initialData.body || "");
  const [tagList, setTagList] = useState(initialData.tagList || []);
  const [tag, setTag] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, body, tagList });
  };
  const handleCreateTag = async (e) => {
    e.preventDefault();
    if (tag.trim()) {
      setTagList([...tagList, tag]);
      setTag("");
    }
  };
  const handleDeleteTag = async (e, index) => {
    e.preventDefault();
    setTagList(tagList.filter((_, i) => i !== index));
    setIsHovered(false);
  };
  return (
    <div className="new-article">
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description"
        />
        <textarea
          className="main-text"
          name="main-text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Input your text"
        ></textarea>
        <button type="submit" className="publishBtn">
          {buttonText}
        </button>
        <label>
          <input
            type="text"
            name="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Input tag to add"
          />
          <button className="add-tagBtn" onClick={handleCreateTag}>
            Add tag
          </button>
        </label>
        <div className="create-tagList">
          {tagList.map((tag, index) => (
            <span
              key={index}
              className="tag tag-edit"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {tag}
              {isHovered ? (
                <img
                  src={closeSvg}
                  alt="close"
                  className="close-img"
                  onClick={(e) => handleDeleteTag(e, index)}
                />
              ) : (
                ""
              )}
            </span>
          ))}
        </div>
      </Form>
    </div>
  );
}

export default ArticleForm;
