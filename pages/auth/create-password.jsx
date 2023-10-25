import React from "react";
import Image from "next/image";
import Link from "@/utils/ActiveLink";
import PageTitle from "@/components/Layout/PageTitle";
import PasswordCreate from "@/components/Auth/Create-password";
import logo from "@/public/images/logo.png";
import passwordGroup from "@/public/images/user/lostpassword-group.png";
import Layout from "../../layout";

const createPassword = () => {
  return (
    <>
      <PageTitle page="CREATE PASSWORD" />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">Authentication</span>
            <h1>CREATE PASSWORD</h1>
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
                  Forgot Your Password? <br /> Don't worry, we've got you covered. Follow the steps to reset your password. Your security is our priority.
                </p>
                <Image src={passwordGroup} alt="login group" />
              </div>
            </div>
            <PasswordCreate />
          </div>
        </div>
      </div>
    </>
  );
};

createPassword.authenticate = false;

createPassword.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default createPassword;
