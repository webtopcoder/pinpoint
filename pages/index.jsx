
import React from "react";
import Banner from "@/components/Landing/Banner";
import Howtouse from "@/components/Landing/Howtouse";
import Aboutus from "@/components/Landing/Aboutus";
import Feature from "@/components/Landing/Feature";
import Offering from "@/components/Landing/Offering";
import Contactus from "@/components/Landing/Contactus";
import Testimonial from "@/components/Landing/Testimonial";
import PageTitle from "@/components/Layout/PageTitle";
import Layout from "../layout";

const UserHome = () => {
  return (
    <>
      <PageTitle page="HOME" />
      <Banner />
      <Aboutus />
      <Howtouse />
      <Feature />
      <Offering />
      <Testimonial />
      <Contactus />
    </>
  );
};

UserHome.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default UserHome;