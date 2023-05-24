import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import AdditionUserLogin from "@/components/Authentication/AdditionUser/Login";

const additionUserLogin = () => {
  return (
    <>
      <PageTitle page="ADDITION USER LOGIN | PINPOINT" />
      <div className="profile-authentication-area ptb-100">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">LOGIN ADDITION USER</span>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-12"></div>
            <AdditionUserLogin />
            <div className="col-lg-3 col-md-12"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default additionUserLogin;
