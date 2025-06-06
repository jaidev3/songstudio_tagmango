import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./App.css";
import FavouritesPage from "./pages/FavouritesPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AddSongPage from "./pages/AddSongPage";
import PlaylistsPage from "./pages/PlaylistsPage";
import PlaylistDetailPage from "./pages/PlaylistDetailPage";
import ExportImportPage from "./pages/ExportImportPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "favourites", element: <FavouritesPage /> },
        { path: "playlists", element: <PlaylistsPage /> },
        { path: "playlist/:playlistId", element: <PlaylistDetailPage /> },
        { path: "add-song", element: <AddSongPage /> },
        { path: "export-import", element: <ExportImportPage /> },
        { path: "", element: <Navigate to="/" replace /> },
      ],
    },
    {
      path: "*",
      element: <div>404 Not Found</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
