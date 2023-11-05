import React, { useState } from "react";
import Image from "next/image";
import PageTitle from "@/components/Layout/PageTitle";
import Login from "@/components/Auth/LoginForm";
import Layout from "../../layout";
import logo from "@/public/images/logo.png";
import userLoginGroup from "@/public/images/user/user-login-group.png";
import partnerLoginGroup from "@/public/images/partner/partner-login-group.png";
import assistantLoginGroup from "@/public/images/assistant/signup_assistant.png";
import Link from "@/utils/ActiveLink";

const AuthLogin = () => {
  const [option, setOption] = useState('user');
  const onChangeRole = ({ target: { value } }) => {
    setOption(value);
  };
  return (
    <>
      <PageTitle page="LOGIN" />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">Authentication</span>
            <h1>LOGIN</h1>
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
                  Join Pinpoint!<br /> Changing the game on how customers will experience, locate and socialize with their local favorites!
                </p>
                <Image src={option === "user" ? userLoginGroup : option === "partner" ? partnerLoginGroup : assistantLoginGroup} alt="login group" />
              </div>
            </div>
            <Login option={option} onChangeRole={onChangeRole} />
          </div>
        </div>
      </div>
    </>
  );
};

AuthLogin.authenticate = false;

AuthLogin.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default AuthLogin;
