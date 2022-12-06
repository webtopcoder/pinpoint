import React from "react";
import Link from "next/link";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar from "@/components/Layout/Navigations/Navbar1";
import DetailsContent from "@/components/Services/DetailsContent";
import GetStarted from "@/components/Common/GetStarted";
import FooterTwo from "@/components/Layout/Footer/FooterTwo";

const ServicesDetails = () => {
  return (
    <>
      <PageTitle page="Services Details" />
      <Navbar />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <h1>Android Apps Development</h1>
            <ul>
              <li>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a>Services</a>
                </Link>
              </li>
              <li>Services Details</li>
            </ul>
          </div>
        </div>
      </div>
      <DetailsContent />
      <div className="pb-100">
        <GetStarted />
      </div>
      <FooterTwo />
    </>
  );
};

export default ServicesDetails;
