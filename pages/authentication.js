import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar from "@/components/Layout/Navigations/Navbar1";
import Login from "@/components/Authentication/Login";
import Signup from "@/components/Authentication/Signup";
import FooterTwo from "@/components/Layout/Footer/FooterTwo";

const Authentication = () => {
  return (
    <>
      <PageTitle page="Features" />
      <Navbar />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">Authentication</span>
            <h1>Howdy! Welcome Back!</h1>
          </div>
        </div>
      </div>
      <div className="profile-authentication-area ptb-100">
        <div className="container">
          <div className="row">
            <Login />
            <Signup />
          </div>
        </div>
      </div>
      <FooterTwo />
    </>
  );
};

export default Authentication;
