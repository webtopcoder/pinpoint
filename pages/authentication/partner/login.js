import React from "react";
import Login from "@/components/Authentication/Partner/partnerLogin";

const Authentication = () => {
  return (
    <>    
      <div className="profile-authentication-area ptb-100">
      <div className="container">
          <div className="page-title-content">
            <span className="sub-title">PARTNER LOGIN</span>
          </div>
        </div>
        <div className="container">
          <div className="row">
          <div className="col-lg-3 col-md-12">
            </div>
            <Login />
            <div className="col-lg-3 col-md-12">
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
