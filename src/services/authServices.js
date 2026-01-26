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
    body: JSON.stringify({ user: data }),
  });
  if (!res.ok) {
    throw Error("Failed to update user data.");
  }
  return res.json();
}
