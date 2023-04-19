import React, { useEffect } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import LoginDashboard from "@/components/Authentication/LoginDashboard";
import { connect } from "react-redux";
import { useRouter } from "next/router";

const Authentication = ({ token, role }) => {

  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.push(role == "partner" ? "/partner/dashboard" : "/home");
    }
  }, [token]);
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

Authentication.authenticate = false;

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    role: state.user.role,
  };
};

export default connect(mapStateToProps)(Authentication);
