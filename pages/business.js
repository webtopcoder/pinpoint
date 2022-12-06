import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar2 from "@/components/Layout/Navigations/Navbar2";
import Banner from "@/components/HomePages/Business/Banner";
import HelpDesk from "@/components/HomePages/Business/HelpDesk";
import About from "@/components/HomePages/Business/About";
import Services from "@/components/HomePages/Business/Services";
import Faq from "@/components/HomePages/Business/Faq";
import TestimonialTwo from "@/components/Testimonials/TestimonialTwo";
import Team from "@/components/HomePages/Business/Team";
import CaseStudies from "@/components/HomePages/Business/CaseStudies";
import Funfacts from "@/components/HomePages/Business/Funfacts";
import WorkingProcess from "@/components/HomePages/Business/WorkingProcess";
import GetStarted from "@/components/Common/GetStarted";
import Blog from "@/components/HomePages/Business/Blog";
import PartnerStyle1 from "@/components/Partners/PartnerStyle1";
import FooterTwo from "@/components/Layout/Footer/FooterTwo";

const Business = () => {
  return (
    <>
      <PageTitle page="Business" />
      <Navbar2 />
      <Banner />
      <HelpDesk />
      <About />
      <Services />
      <Faq />
      <TestimonialTwo />
      <Team />
      <CaseStudies />
      <Funfacts />
      <WorkingProcess />
      <GetStarted />
      <Blog />
      <div className="bg-fff4f8">
        <PartnerStyle1 />
      </div>
      <FooterTwo />
    </>
  );
};

export default Business;
