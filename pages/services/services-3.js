import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar5 from "@/components/Layout/Navigations/Navbar5";
import PageTopTitle from "@/components/Common/PageTopTitle";
import WhyChooseUs from "@/components/ServicesThree/WhyChooseUs";
import Services from "@/components/ServicesThree/Services";
import TestimonialFour from "@/components/Testimonials/TestimonialFour";
import PartnerStyle1 from "@/components/Partners/PartnerStyle1";
import FooterFive from "@/components/Layout/Footer/FooterFive";

const Services3 = () => {
  return (
    <>
      <PageTitle page="Services" />
      <Navbar5 />
      <PageTopTitle
        subTitle="Our Services"
        title="Our work is delivered by the best team in the world"
      />
      <WhyChooseUs />
      <Services />
      <TestimonialFour />
      <div className="bg-f9f9f9 br-bottom-100">
        <PartnerStyle1 />
      </div>
      <FooterFive />
    </>
  );
};

export default Services3;
