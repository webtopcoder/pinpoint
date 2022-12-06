import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar from "@/components/Layout/Navigations/Navbar1";
import PricingContent from "@/components/Pricing/PricingContent";
import Features from "@/components/Pricing/Features";
import Faq from "@/components/Pricing/Faq";
import TestimonialOne from "@/components/Testimonials/TestimonialOne";
import GetStarted from "@/components/Common/GetStarted";
import FooterThree from "@/components/Layout/Footer/FooterThree";

const Pricing = () => {
  return (
    <>
      <PageTitle page="Pricing" />
      <Navbar />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title light-green-color">Pricing Table</span>
            <h1>No Hidden Charge Applied, Choose Your Plan</h1>
          </div>
        </div>
      </div>
      <PricingContent />
      <Features />
      <Faq />
      <TestimonialOne />
      <GetStarted />
      <FooterThree />
    </>
  );
};

export default Pricing;
