import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Login from "@/components/Authentication/LoginForm";
import { connect } from "react-redux";

const userLogin = () => {
  return (
    <>
      <PageTitle page="USER LOGIN" />
      <div className="profile-authentication-area ptb-100">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">USER LOGIN</span>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-12"></div>
            <Login role={"user"} />
            <div className="col-lg-3 col-md-12"></div>
          </div>
        </div>
      </div>
    </>
  );
};

userLogin.authenticate = false;

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    role: state.user.role,
  };
};

export default connect(mapStateToProps)(userLogin);
