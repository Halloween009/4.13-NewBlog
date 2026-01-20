import {
  createHashRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import RootLayout from "./layouts/RootLayout";
import Articles, { articlesLoader } from "./pages/articles/Articles";

function App() {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Articles />} loader={articlesLoader} />
        {/* <Route path='new-post' element={} />
        <Route path='new-post' element={} />
        <Route path='new-post' element={} /> */}
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}

export default App;
