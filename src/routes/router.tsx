import { createBrowserRouter } from "react-router-dom";
import { Callback } from "./Callback";
import { routes } from "./routes";
import { Login } from "./Login";
import { ProtectedMainApp } from "./MainApp.protected";
import { Home } from "./app/Home";
import { AllTracks } from "./app/AllTracks";
import { TracksOfPlaylist } from "./app/TracksOfPlaylist";

export const router = createBrowserRouter([
  {
    path: routes.app.root,
    element: <ProtectedMainApp />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: routes.app.allTracks.root,
        element: <AllTracks />,
        children: [
          {
            path: routes.app.allTracks.uri(),
            element: null,
          },
        ],
      },
      {
        path: routes.app.playlist.uri(),
        element: <TracksOfPlaylist />,
        children: [
          {
            path: routes.app.playlist.uri(),
            element: null,
            children: [
              {
                path: routes.app.playlist.track.uri(),
                element: null,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: routes.callback,
    element: <Callback />,
  },
  {
    path: routes.login,
    element: <Login />,
  },
]);
