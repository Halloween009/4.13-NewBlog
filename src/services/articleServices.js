export const getArticles = async ({ limit = 10, offset = 0, author } = {}) => {
  let apiURL = `https://realworld.habsida.net/api/articles?limit=${limit}&offset=${offset}`;
  if (author) {
    apiURL += `&author=${encodeURIComponent(author)}`;
  }
  const res = await fetch(apiURL);
  if (!res.ok) {
    throw Error("Couldn't fetch the articles");
  }
  return res.json();
};

export const getTags = async () => {
  try {
    const data = await fetch("https://realworld.habsida.net/api/tags");
    return data.json();
  } catch (error) {
    console.log("Couldn't fetch tags. Error:", error);
  }
};

export const getArcticle = async (slug) => {
  try {
    const res = await fetch(
      `https://realworld.habsida.net/api/articles/${slug}`,
    );
    return res.json();
  } catch (error) {
    console.error("Couldn't fetch article. Error:", error);
  }
};
