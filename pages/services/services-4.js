import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar8 from "@/components/Layout/Navigations/Navbar8";
import PageTopTitle from "@/components/Common/PageTopTitle";
import Goal from "@/components/ServicesFour/Goal";
import Services from "@/components/ServicesFour/Services";
import WhatWeDo from "@/components/ServicesFour/WhatWeDo";
import TestimonialSix from "@/components/Testimonials/TestimonialSix";
import FooterEight from "@/components/Layout/Footer/FooterEight";

const Services4 = () => {
  return (
    <>
      <PageTitle page="Services" />
      <Navbar8 />
      <PageTopTitle
        subTitle="Our Services"
        title="Our work is delivered by the best team in the world"
      />
      <Goal />
      <WhatWeDo />
      <Services />
      <TestimonialSix />
      <FooterEight />
    </>
  );
};

export default Services4;
