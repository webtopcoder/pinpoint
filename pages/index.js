import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import LoginDashboard from "@/components/Authentication/LoginDashboard";

const Authentication = () => {
  return (
    <>
      <PageTitle page="WHO AM I" />
      <div className="profile-authentication-area ptb-100">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">WHO AM I ?</span>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-12"></div>
            <LoginDashboard />
            <div className="col-lg-3 col-md-12"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
