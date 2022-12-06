import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar from "@/components/Layout/Navigations/Navbar1";
import Goal from "@/components/AboutUsTwo/Goal";
import Focus from "@/components/AboutUsTwo/Focus";
import HowToApply from "@/components/AboutUsTwo/HowToApply";
import Testimonials from "@/components/AboutUsTwo/Testimonials";
import Faq from "@/components/AboutUsTwo/Faq";
import JoinOurCommunity from "@/components/AboutUsTwo/JoinOurCommunity";
import FooterFour from "@/components/Layout/Footer/FooterFour";

const AboutUs2 = () => {
  return (
    <>
      <PageTitle page="About Us" />
      <Navbar />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title dark-green-color">About Us</span>
            <h1 className="nunito-font">Hello World! This is Aveb!</h1>
          </div>
        </div>
      </div>
      <Goal />
      <Focus />
      <HowToApply />
      <Testimonials />
      <Faq />
      <JoinOurCommunity />
      <FooterFour />
    </>
  );
};

export default AboutUs2;
