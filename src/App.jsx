import {
  createHashRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import RootLayout from "./layouts/RootLayout.jsx";
import ArticleLayout from "./layouts/ArticleLayout.jsx";
import Articles from "./pages/articles/Articles";
import ArticleDetails from "./pages/articles/ArticleDetails";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Settings from "./pages/Settings.jsx";
import NewArticle from "./pages/articles/NewArticle.jsx";
import ArticleEdit from "./pages/articles/ArticleEdit.jsx";

function App() {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route element={<ArticleLayout />}>
          <Route index element={<Articles />} />
          <Route path=":slug" element={<ArticleDetails />} />
          <Route path=":slug/edit" element={<ArticleEdit />} />
        </Route>
        <Route path="new-post" element={<NewArticle />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/:username" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>,
    ),
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
