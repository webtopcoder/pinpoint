import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar from "@/components/Layout/Navigations/Navbar1";
import PortfolioStyle2 from "@/components/Portfolio/PortfolioStyle2";
import FooterTwo from "@/components/Layout/Footer/FooterTwo";

const Portfolio2 = () => {
  return (
    <>
      <PageTitle page="Portfolio" />
      <Navbar />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title red-light-color">Portfolio</span>
            <h1>We&apos;ve done lot&apos; of work, Let&apos;s check some</h1>
          </div>
        </div>
      </div>
      <PortfolioStyle2 />
      <FooterTwo />
    </>
  );
};

export default Portfolio2;
