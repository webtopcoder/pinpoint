import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import LostPassword from "@/components/Authentication/Lost-password";

const lostPassword = () => {
  return (
    <>
      <PageTitle page="RESET PASSWORD | PINPOINT" />
      <div className="profile-authentication-area ptb-100">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">RESET PASSWORD</span>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-12"></div>
            <LostPassword />
            <div className="col-lg-3 col-md-12"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default lostPassword;
