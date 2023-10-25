import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import Layout from "../../layout";
import PageTitle from "@/components/Layout/PageTitle";
import passwordGroup from "@/public/images/user/email-verification-code.png";
import VerificationStep from "@/components/Authentication/Verification-account";

const Verification = () => {
  return (
    <>
      <PageTitle page="VERIFY" />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">Authentication</span>
            <h1>VERIFICATION</h1>
          </div>
        </div>
      </div>
      <div className="profile-authentication-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 user-login-image desktop">
              <div className="login-form">
                <div className="logo-center">
                  <Link href="/">
                    <a className="navbar-brand">
                      <Image src={logo} alt="site logo" />
                    </a>
                  </Link>
                </div>
                <p>
                  Please verify the email address you provided. <br />We have sent you an email with a verification code.  <br />Enter the code to gain access to your account!
                </p>
                <Image src={passwordGroup} alt="login group" />
              </div>
            </div>
            <VerificationStep />
          </div>
        </div>
      </div>
    </>
  );
};

Verification.authenticate = false;

Verification.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default Verification;
