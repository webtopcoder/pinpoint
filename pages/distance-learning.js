import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar7 from "@/components/Layout/Navigations/Navbar7";
import Banner from "@/components/HomePages/DistanceLearning/Banner";
import Features from "@/components/HomePages/DistanceLearning/Features";
import Skills from "@/components/HomePages/DistanceLearning/Skills";
import Courses from "@/components/HomePages/DistanceLearning/Courses";
import WorkingProcess from "@/components/HomePages/DistanceLearning/WorkingProcess";
import TestimonialSeven from "@/components/Testimonials/TestimonialSeven";
import Funfacts from "@/components/HomePages/DistanceLearning/Funfacts";
import Blog from "@/components/HomePages/DistanceLearning/Blog";
import Partner from "@/components/HomePages/DistanceLearning/Partner";
import AppDownload from "@/components/HomePages/DistanceLearning/AppDownload";
import FooterSeven from "@/components/Layout/Footer/FooterSeven";

const DistanceLearning = () => {
  return (
    <>
      <PageTitle page="Distance Learning" />
      <Navbar7 />
      <Banner />
      <Features />
      <Skills />
      <Courses />
      <WorkingProcess />
      <TestimonialSeven />
      <Funfacts />
      <Blog />
      <Partner />
      <AppDownload />
      <FooterSeven />
    </>
  );
};

export default DistanceLearning;
