import { createBrowserRouter } from "react-router-dom";
import { TrackInfo } from "src/components/player/TrackInfo";
import { Callback } from "./Callback";
import { routes } from "./routes";
import { Login } from "./Login";
import { ProtectedMainApp } from "./MainApp.protected";

export const router = createBrowserRouter([
  {
    path: routes.app.root,
    element: <ProtectedMainApp />,
    children: [
      {
        path: routes.app.trackUri(),
        element: <TrackInfo />,
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
