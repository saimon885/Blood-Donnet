import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Home/Home/Home";
import Login from "../Components/Form/Login";
import Register from "../Components/Form/Register";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import Profile from "../DashboardRelated/Profile";
import CreateDonor from "../DashboardRelated/CreateDonor";
import MyDonnetionRequest from "../DashboardRelated/MyDonnetionRequest";
import DonnerHome from "../DashboardRelated/DonnerHome";
import AllUsers from "../DashboardRelated/AllUsers";
import Alldonor from "../DashboardRelated/Alldonor";
import PrivetRoute from "../PrivetRouter/PrivetRoute";
import AdminPrivetRoute from "../PrivetRouter/AdminPrivetRoute";
import VolenteerAllDonor from "../DashboardRelated/VolenteerAllDonor";
import VolunteerPrivetRoute from "../PrivetRouter/volunteerPrivetRoute";

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
        element: (
          <AdminPrivetRoute>
            <AllUsers></AllUsers>
          </AdminPrivetRoute>
        ),
      },
      {
        path: "all-blood-donation-request",
        element: (
          <AdminPrivetRoute>
            <Alldonor></Alldonor>
          </AdminPrivetRoute>
        ),
        loader: () => fetch("/district.json"),
      },
      {
        path: "volunteerAllDonor",
        element: (
          <VolunteerPrivetRoute>
            <VolenteerAllDonor></VolenteerAllDonor>
          </VolunteerPrivetRoute>
        ),
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
