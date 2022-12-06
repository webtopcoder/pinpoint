import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Navbar from "@/components/Layout/Navigations/Navbar1";
import FooterTwo from "@/components/Layout/Footer/FooterTwo";
import LostPasswordForm from "@/components/Authentication/LostPasswordForm";

const LostPassword = () => {
  return (
    <>
      <PageTitle page="Features" />
      <Navbar />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">Authentication</span>
            <h1>Forgot Your Password?</h1>
          </div>
        </div>
      </div>
      <LostPasswordForm />
      <FooterTwo />
    </>
  );
};

export default LostPassword;
