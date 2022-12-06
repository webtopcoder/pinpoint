import React from "react";
import Navbar from "@/components/Layout/Navigations/Navbar1";
import PageTitle from "@/components/Layout/PageTitle";
import AboutArea from "@/components/AboutUs/AboutArea";
import Overview from "@/components/AboutUs/Overview";
import WorkingProcess from "@/components/AboutUs/WorkingProcess";
import Funfacts from "@/components/AboutUs/Funfacts";
import Team from "@/components/AboutUs/Team";
import Testimonials from "@/components/AboutUs/Testimonials";
import Partners from "@/components/AboutUs/Partners";
import GetStarted from "@/components/Common/GetStarted";
import FooterTwo from "@/components/Layout/Footer/FooterTwo";

const AboutUs = () => {
  return (
    <>
      <PageTitle page="About Us" />
      <Navbar />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title red-light-color">About Us</span>
            <h1>Hello World! This is Abev!</h1>
          </div>
        </div>
      </div>
      <AboutArea />
      <Overview />
      <WorkingProcess />
      <Funfacts />
      <Team />
      <Testimonials />
      <Partners />
      <div className="ptb-100">
        <GetStarted />
      </div>
      <FooterTwo />
    </>
  );
};

export default AboutUs;
