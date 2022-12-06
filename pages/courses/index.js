import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar7 from "@/components/Layout/Navigations/Navbar7";
import Content from "@/components/Courses/Content";
import AppDownload from "@/components/Courses/AppDownload";
import FooterSeven from "@/components/Layout/Footer/FooterSeven";

const Index = () => {
  return (
    <>
      <PageTitle page="Courses" />
      <Navbar7 />
      <div className="page-title-area style-two">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title yellow-color">
              Learn at your own pace
            </span>
            <h1>Abev Popular Courses</h1>
          </div>
        </div>
      </div>
      <Content />
      <AppDownload />
      <FooterSeven />
    </>
  );
};

export default Index;
