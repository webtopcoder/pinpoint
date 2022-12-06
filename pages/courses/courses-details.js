import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar7 from "@/components/Layout/Navigations/Navbar7";
import DetailsTop from "@/components/Courses/Details/DetailsTop";
import DetailsContent from "@/components/Courses/Details/DetailsContent";
import YouAlsoLike from "@/components/Courses/Details/YouAlsoLike";
import AppDownload from "@/components/Courses/AppDownload";
import FooterSeven from "@/components/Layout/Footer/FooterSeven";

const CoursesDetails = () => {
  return (
    <>
      <PageTitle page="Courses Details" />
      <Navbar7 />
      <DetailsTop />
      <DetailsContent />
      <YouAlsoLike />
      <AppDownload />
      <FooterSeven />
    </>
  );
};

export default CoursesDetails;
