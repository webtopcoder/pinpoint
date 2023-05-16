import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import PasswordCreate from "@/components/Authentication/Create-password";

const createPassword = () => {
  return (
    <>
      <PageTitle page="CREATE PASSWORD" />
      <div className="profile-authentication-area ptb-100">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">CREATE PASSWORD</span>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-12"></div>
            <PasswordCreate />
            <div className="col-lg-3 col-md-12"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default createPassword;
