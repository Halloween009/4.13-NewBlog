import { useLoaderData, useSearchParams, Link } from "react-router-dom";

function Articles() {
  const { articles, articlesCount } = useLoaderData();
  const [searchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = 10;
  const totalPages = Math.ceil(articlesCount / limit);

  return (
    <div className="main">
      <div className="title-big">
        <Link to="/" className="title">
          Realworld Blog
        </Link>
        <h3>A place to share your knowledge</h3>
      </div>

      <div className="articles">
        {articles.map((article) => (
          <div key={article.slug} className="article">
            <div className="profile">
              <img
                src={article.author.image}
                alt="author-img"
                className="author-img"
              />
              <p className="username">{article.author.username}</p>
            </div>
            {article.title}
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

//Articles loader

export const articlesLoader = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 10;
  const offset = (page - 1) * limit;

  const res = await fetch(
    `https://realworld.habsida.net/api/articles?limit=${limit}&offset=${offset}`,
  );

  if (!res.ok) {
    throw Error("Couldn't fetch the articles");
  }
  return res.json();
};
