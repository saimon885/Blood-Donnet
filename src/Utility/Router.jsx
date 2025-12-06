import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Home/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <spna>Error 404</spna>,
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);
