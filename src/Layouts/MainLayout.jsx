import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import ScrollToTop from "../ScrollToTop ";

const MainLayout = () => {
  return (
    <div>
      <ScrollToTop></ScrollToTop>
      <div className="fixed w-full z-50">
        <Navbar></Navbar>
      </div>
      <div className="pt-16">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
