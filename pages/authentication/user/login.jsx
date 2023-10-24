import React, { useState } from "react";
import Image from "next/image";
import PageTitle from "@/components/Layout/PageTitle";
import Login from "@/components/Authentication/LoginForm";
import Layout from "../../../layout";
import logo from "@/public/images/logo.png";
import userLoginGroup from "@/public/images/user/user-login-group.png";
import partnerLoginGroup from "@/public/images/partner/partner-login-group.png";
import Link from "@/utils/ActiveLink";

const userLogin = () => {
  const [option, setOption] = useState('user');
  const onChangeRole = ({ target: { value } }) => {
    console.log('radio4 checked', value);
    setOption(value);
  };
  return (
    <>
      <PageTitle page="USER LOGIN" />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">Authentication</span>
            <h1>Howdy! Welcome Back!</h1>
          </div>
        </div>
      </div>
      <div className="profile-authentication-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 user-login-image">
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
                <Image src={option === "user" ? userLoginGroup : partnerLoginGroup} alt="login group" />
              </div>
            </div>
            <Login role={"user"} option={option} onChangeRole={onChangeRole} />
            {/* <Signup /> */}
          </div>
        </div>
      </div>
      {/* <div className="profile-authentication-area ptb-100">
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
      </div> */}
    </>
  );
};

userLogin.authenticate = false;

userLogin.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default userLogin;
