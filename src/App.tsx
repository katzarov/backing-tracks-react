import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "./containers/Layout";
import { TrackInfo } from "./containers/TrackInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "track/:resourceId",
        element: <TrackInfo />,
      },
    ],
  },
]);
export const App = () => {
  return <RouterProvider router={router} />;
};
