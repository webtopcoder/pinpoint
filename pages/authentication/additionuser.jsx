import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import AdditionUser from "@/components/Authentication/AdditionUser";

const additionUser = () => {
  return (
    <>
      <PageTitle page="ADDITION USER | PINPOINT" />
      <div className="profile-authentication-area ptb-100">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">CREATE ADDITION USER</span>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-12"></div>
            <AdditionUser />
            <div className="col-lg-3 col-md-12"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default additionUser;
