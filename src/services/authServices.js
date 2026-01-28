export async function registerUser(username, email, password) {
  const res = await fetch("https://realworld.habsida.net/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        username,
        email,
        password,
      },
    }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw Error(
      error.error ? JSON.stringify(error.error) : "Registration failed",
    );
  }
  return res.json();
}

export async function loginUser(email, password) {
  const res = await fetch("https://realworld.habsida.net/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        email,
        password,
      },
    }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw Error(
      error.errors
        ? JSON.stringify(error.errors)
        : "Login failed - Invalid email or password",
    );
  }
  return res.json();
}

export async function updateUser(data, token) {
  const res = await fetch("https://realworld.habsida.net/api/user", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw Error("Failed to update user data.");
  }
  return res.json();
}

export async function createArticle(
  { title, description, body, tagList },
  token,
) {
  const res = await fetch("https://realworld.habsida.net/api/articles", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      article: {
        title,
        description,
        body,
        tagList: tagList,
      },
    }),
  });
  if (!res.ok) {
    throw Error("Failed to create article");
  }
  return res.json();
}

export async function deleteArticle(slug, token) {
  const res = await fetch(
    `https://realworld.habsida.net/api/articles/${slug}`,
    {
      method: "DELETE",
      headers: { Authorization: `Token ${token}` },
    },
  );
  if (!res.ok) {
    throw Error("Failed to delete article");
  }
  return true;
}
export async function editArticle(slug, data, token) {
  const res = await fetch(
    `https://realworld.habsida.net/api/articles/${slug}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        article: {
          title: data.title,
          description: data.description,
          body: data.body,
          tagList: data.tagList,
        },
      }),
    },
  );
  if (!res.ok) {
    throw Error("Failed to edit article");
  }
  return res.json();
}

// export async function favoriteArticle(slug, token) {
//   const res = await fetch(
//     `https://realworld.habsida.net/api/articles/${slug}/favorite`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     },
//   );
//   return res.json();
// }

// export async function unfavoriteArticle(slug, token) {
//   const res = await fetch(
//     `https://realworld.habsida.net/api/articles/${slug}/favorite`,
//     {
//       method: "DELETE",
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     },
//   );
//   if (!res.ok) {
//     const error = await res.json();
//     console.error("Unfavorite error:", error);
//   }
//   return res.json();
// }
