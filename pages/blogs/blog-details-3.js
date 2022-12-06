import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar from "@/components/Layout/Navigations/Navbar1";
import DetailsContent3 from "@/components/Blog/BlogDetails/DetailsContent3";
import FooterTwo from "@/components/Layout/Footer/FooterTwo";

const BlogDetails2 = () => {
  return (
    <>
      <PageTitle page="Blog Details" />
      <Navbar />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title red-light-color">Blog Details</span>
            <h1>How our company works in different ways</h1>
          </div>
        </div>
      </div>
      <DetailsContent3 />
      <FooterTwo />
    </>
  );
};

export default BlogDetails2;
