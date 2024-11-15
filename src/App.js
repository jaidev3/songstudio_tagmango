import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./App.css";
import ComingSoonPage from "./pages/ComingSoonPage";
import FavouritesPage from "./pages/FavouritesPage";
import DiscoverPage from "./pages/DiscoverPage";
import CokeStudioPage from "./pages/CokeStudioPage";
import PodcastPage from "./pages/PodcastPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "discover", element: <DiscoverPage /> },
        { path: "favourites", element: <FavouritesPage /> },
        { path: "coke-studio", element: <CokeStudioPage /> },
        { path: "podcast", element: <PodcastPage /> },
        { path: "", element: <Navigate to="/discover" replace /> },
      ],
    },
    {
      path: "/coming-soon",
      element: <ComingSoonPage />,
    },
    {
      path: "*",
      element: <div>404 Not Found</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
