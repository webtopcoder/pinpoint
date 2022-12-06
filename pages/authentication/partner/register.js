import React from "react";
import Register from "@/components/Authentication/Partner/partnerRegister";

const Authentication = () => {
  return (
    <>    
      <div className="profile-authentication-area ptb-100">
      <div className="container">
          <div className="page-title-content">
            <span className="sub-title">PARTNER SIGN UP</span>
          </div>
        </div>
        <div className="container">
          <div className="row">
          <div className="col-lg-3 col-md-12">
            </div>
            <Register />
            <div className="col-lg-3 col-md-12">
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
