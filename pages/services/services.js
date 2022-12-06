import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar from "@/components/Layout/Navigations/Navbar1";
import PageTopTitle from "@/components/Common/PageTopTitle";
import HelpDesk from "@/components/Services/HelpDesk";
import Overview from "@/components/Services/Overview";
import WhatWeDo from "@/components/Services/WhatWeDo";
import Faq from "@/components/Services/Faq";
import Subscribe from "@/components/Services/Subscribe";
import Partners from "@/components/Services/Partners";
import FooterOne from "@/components/Layout/Footer/FooterOne";

const Services = () => {
  return (
    <>
      <PageTitle page="Services" />
      <Navbar />
      <PageTopTitle
        subTitle="Our Services"
        title="Our work is delivered by the best team in the world"
      />
      <HelpDesk />
      <Overview />
      <WhatWeDo />
      <Faq />
      <Subscribe />
      <Partners />
      <FooterOne />
    </>
  );
};

export default Services;
