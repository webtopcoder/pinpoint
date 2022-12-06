import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar3 from "@/components/Layout/Navigations/Navbar3";
import Banner from "@/components/HomePages/App/Banner";
import PartnerStyle2 from "@/components/Partners/PartnerStyle2";
import Overview from "@/components/HomePages/App/Overview";
import Features from "@/components/HomePages/App/Features";
import TestimonialOne from "@/components/Testimonials/TestimonialOne";
import Pricing from "@/components/HomePages/App/Pricing";
import Faq from "@/components/HomePages/App/Faq";
import AppDownload from "@/components/HomePages/App/AppDownload";
import FooterThree from "@/components/Layout/Footer/FooterThree";

const App = () => {
  return (
    <>
      <PageTitle page="App" />
      <Navbar3 />
      <Banner />
      <PartnerStyle2 />
      <Overview />
      <Features />
      <TestimonialOne />
      <Pricing />
      <Faq />
      <AppDownload />
      <FooterThree />
    </>
  );
};

export default App;
