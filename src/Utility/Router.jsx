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
import Loading from "../Loading/Loading";
import ErrorElement from "../Loading/ErrorElement";
import AllBloodDonnetRequest from "../DashboardRelated/AllBloodDonnetRequest";
import BloodDonnetionDetailsPage from "../DashboardRelated/BloodDonnetionDetailsPage";
import BloodRequest from "../DashboardRelated/BloodRequest";
import Funding from "../Pages/Funding";
import PaymentSuccess from "../Pages/PaymentSuccess";
import PaymentCancel from "../Pages/PaymentCancel";
import DonorPrivetRoute from "../PrivetRouter/DonorPrivetRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorElement></ErrorElement>,
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
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancel,
      },
      {
        path: "funding",
        element: (
          <PrivetRoute>
            <Funding></Funding>
          </PrivetRoute>
        ),
      },
      {
        path: "register",
        Component: Register,
        loader: () => fetch("/district.json"),
      },
      {
        path: "search-blood-requests",
        Component: BloodRequest,
        loader: () => fetch("/district.json"),
      },
      {
        path: "blood-donation-requests",
        Component: AllBloodDonnetRequest,
        loader: () => fetch("/district.json"),
      },
      {
        path: "blood-donation-Details/:id",
        element: (
          <PrivetRoute>
            <BloodDonnetionDetailsPage></BloodDonnetionDetailsPage>
          </PrivetRoute>
        ),
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
    HydrateFallback: Loading,
    errorElement: <ErrorElement></ErrorElement>,
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
        element: (
          <DonorPrivetRoute>
            <CreateDonor></CreateDonor>
          </DonorPrivetRoute>
        ),
        loader: () => fetch("/district.json"),
      },
      {
        path: "My-donation-request",
        element: (
          <DonorPrivetRoute>
            <MyDonnetionRequest></MyDonnetionRequest>
          </DonorPrivetRoute>
        ),
        loader: () => fetch("/district.json"),
      },
    ],
  },
]);
