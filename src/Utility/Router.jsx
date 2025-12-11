import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Home/Home/Home";
import Login from "../Components/Form/Login";
import Register from "../Components/Form/Register";
import PrivetRoute from "../AuthProvider/PrivetRoute";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import Profile from "../DashboardRelated/Profile";
import CreateDonor from "../DashboardRelated/CreateDonor";
import MyDonnetionRequest from "../DashboardRelated/MyDonnetionRequest";
import DonnerHome from "../DashboardRelated/DonnerHome";
import AllUsers from "../DashboardRelated/AllUsers";
import Alldonor from "../DashboardRelated/Alldonor";

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
        index: true,
        Component: DonnerHome,
        loader: () => fetch("/district.json"),
      },
      {
        path: "Profile",
        Component: Profile,
        loader: () => fetch("/district.json"),
      },
      {
        path: "all-users",
        Component: AllUsers,
      },
      {
        path: "all-blood-donation-request",
        Component: Alldonor,
        loader: () => fetch("/district.json"),
      },
      {
        path: "create-donation-request",
        Component: CreateDonor,
        loader: () => fetch("/district.json"),
      },
      {
        path: "My-donation-request",
        Component: MyDonnetionRequest,
        loader: () => fetch("/district.json"),
      },
    ],
  },
]);
