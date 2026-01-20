import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import RootLayout from "./layouts/RootLayout";
import Articles, { articlesLoader } from "./pages/articles/Articles";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Articles />} loader={articlesLoader} />
        {/* <Route path='new-post' element={} />
        <Route path='new-post' element={} />
        <Route path='new-post' element={} /> */}
      </Route>,
    ),
    {
      basename: "/4.13-NewBlog",
    }
  );

  return <RouterProvider router={router} />;
}

export default App;
