import React from "react";
import Banner1 from "../Banner/Banner1";
import BloodHiveWorks from "../Banner/BloodHiveWorks";
import AskedQuestions from "../Banner/AskedQuestions";
import ContuctUs from "../Banner/ContuctUs";
import Statistics from "../Banner/Statistics";
import Testimonials from "../Banner/Testimonials";
import BloodEvents from "../Banner/BloodEvents ";

const Home = () => {
  return (
    <div>
      <Banner1></Banner1>
      <BloodHiveWorks></BloodHiveWorks>
      <AskedQuestions></AskedQuestions>
      <Statistics></Statistics>
      <Testimonials></Testimonials>
      <BloodEvents></BloodEvents>
      <ContuctUs></ContuctUs>
    </div>
  );
};

export default Home;
