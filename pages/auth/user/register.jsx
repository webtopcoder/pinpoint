import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Register from "@/components/Auth/User/UserRegister";

const userRegister = () => {
  return (
    <>
      <PageTitle page="USER REGISTER" />
      <div className="profile-authentication-area ptb-100">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">USER SIGN UP</span>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-12"></div>
            <Register />
            <div className="col-lg-3 col-md-12"></div>
          </div>
        </div>
      </div>
    </>
  );
};

userRegister.authenticate = false;

export default userRegister;
