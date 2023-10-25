import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Login from "@/components/Auth/LoginForm";

const EventhostLogin = () => {
  return (
    <>
      <PageTitle page="EVENTHOST LOGIN" />
      <div className="profile-authentication-area ptb-100">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">EVENTHOST LOGIN</span>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-12"></div>
            <Login role={"eventhost"} />
            <div className="col-lg-3 col-md-12"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventhostLogin;