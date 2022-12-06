import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar5 from "@/components/Layout/Navigations/Navbar5";
import Banner from "@/components/HomePages/Property/Banner";
import Features from "@/components/HomePages/Property/Features";
import Goal from "@/components/HomePages/Property/Goal";
import Services from "@/components/HomePages/Property/Services";
import Residence from "@/components/HomePages/Property/Residence";
import TestimonialFour from "@/components/Testimonials/TestimonialFour";
import Gallery from "@/components/HomePages/Property/Gallery";
import Blog from "@/components/HomePages/Property/Blog";
import RequestAVsit from "@/components/HomePages/Property/RequestAVsit";
import PartnerStyle3 from "@/components/Partners/PartnerStyle3";
import FooterFive from "@/components/Layout/Footer/FooterFive";

const Property = () => {
  return (
    <>
      <PageTitle page="Property" />
      <Navbar5 />
      <Banner />
      <Features />
      <Goal />
      <Services />
      <Residence />
      <TestimonialFour />
      <Gallery />
      <Blog />
      <RequestAVsit />
      <PartnerStyle3 />
      <FooterFive />
    </>
  );
};

export default Property;
