import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Home/Home/Home";
import Login from "../Components/Form/Login";
import Register from "../Components/Form/Register";
import PrivetRoute from "../AuthProvider/PrivetRoute";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import Profile from "../DashboardRelated/Profile";

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
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
        loader: () => fetch("/district.json"),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivetRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivetRoute>
    ),
    children: [
      {
        path: "Profile",
        Component: Profile,
      },
    ],
  },
]);
