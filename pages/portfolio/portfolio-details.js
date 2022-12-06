import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar from "@/components/Layout/Navigations/Navbar1";
import FooterTwo from "@/components/Layout/Footer/FooterTwo";
import PortfolioDetailsContent from "@/components/Portfolio/PortfolioDetailsContent";

const PortfolioDetails = () => {
  return (
    <>
      <PageTitle page="Finance Consulting" />
      <Navbar />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <h1>Finance Consulting</h1>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Portfolio</a>
              </li>
              <li>Finance Consulting</li>
            </ul>
          </div>
        </div>
      </div>
      <PortfolioDetailsContent />
      <FooterTwo />
    </>
  );
};

export default PortfolioDetails;
