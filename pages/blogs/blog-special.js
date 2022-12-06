import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar from "@/components/Layout/Navigations/Navbar1";
import SpecialContent from "@/components/Blog/SpecialContent";
import FooterTwo from "@/components/Layout/Footer/FooterTwo";

const BlogSpecial = () => {
  return (
    <>
      <PageTitle page="Blog Special" />
      <Navbar />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">Latest News</span>
            <h1>Our latest articles & resources</h1>
          </div>
        </div>
      </div>
      <SpecialContent />
      <FooterTwo />
    </>
  );
};

export default BlogSpecial;
