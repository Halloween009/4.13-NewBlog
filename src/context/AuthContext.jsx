/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import {
  deleteArticle,
  editArticle,
  updateUser,
} from "../services/authServices";
import { createArticle } from "../services/authServices";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await fetch("https://realworld.habsida.net/api/user", {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            setUser(data.user);
            setIsAuthChecked(true);
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("token");
        }
      }
    };
    checkAuth();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  const update = async (data) => {
    const token = localStorage.getItem("token");
    const res = await updateUser(data, token);
    setUser(res.user);
    localStorage.setItem("user", JSON.stringify(res.user));
    return res.user;
  };
  const create = async (data) => {
    const token = localStorage.getItem("token");
    const res = await createArticle(data, token);
    return res.article || res;
  };
  const deleteArt = async (slug) => {
    const token = localStorage.getItem("token");
    await deleteArticle(slug, token);
    return true;
  };
  const edit = async (slug) => {
    const token = localStorage.getItem("token");
    const res = await editArticle(slug, token);
    return res.article;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        update,
        create,
        deleteArt,
        edit,
        isAuthChecked,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
