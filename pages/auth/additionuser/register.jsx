import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import AdditionUserRegister from "@/components/Auth/AdditionUser/Register";

const additionUserRegister = () => {
  return (
    <>
      <PageTitle page="ADDITION USER REGISTER | PINPOINT" />
      <div className="profile-authentication-area ptb-100">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">CREATE ADDITION USER</span>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-12"></div>
            <AdditionUserRegister />
            <div className="col-lg-3 col-md-12"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default additionUserRegister;
