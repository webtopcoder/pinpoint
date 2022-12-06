import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar from "@/components/Layout/Navigations/Navbar1";
import PortfolioStyle1 from "@/components/Portfolio/PortfolioStyle1";
import FooterTwo from "@/components/Layout/Footer/FooterTwo";

const Portfolio1 = () => {
  return (
    <>
      <PageTitle page="Portfolio 1" />
      <Navbar />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">Portfolio</span>
            <h1>We&apos;ve done lot&apos;s of work, Let&apos;s check some</h1>
          </div>
        </div>
      </div>
      <PortfolioStyle1 />
      <FooterTwo />
    </>
  );
};

export default Portfolio1;
