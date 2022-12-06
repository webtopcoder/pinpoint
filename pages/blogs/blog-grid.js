import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar from "@/components/Layout/Navigations/Navbar1";
import GridContent from "@/components/Blog/GridContent";
import FooterTwo from "@/components/Layout/Footer/FooterTwo";

const BlogGrid = () => {
  return (
    <>
      <PageTitle page="Blog Grid" />
      <Navbar />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">Latest News</span>
            <h1>Our latest articles & resources</h1>
          </div>
        </div>
      </div>
      <GridContent />
      <FooterTwo />
    </>
  );
};

export default BlogGrid;
