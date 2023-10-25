import React, { useState } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import UserRegister from "@/components/Auth/User/UserRegister";
import PartnerRegister from "@/components/Auth/Partner/PartnerRegister";
import Image from "next/image";
import Layout from "../../layout";
import userLoginGroup from "@/public/images/user/user-login-group.png";
import partnerLoginGroup from "@/public/images/partner/partner-login-group.png";
import logo from "@/public/images/logo.png";
import Link from "@/utils/ActiveLink";
import useMedia from "@/hooks/useMedia";
import { Radio } from 'antd';

const AuthSignup = () => {
  const [option, setOption] = useState('user');
  const isWebDevice = useMedia('(min-width:700px)');
  const onChangeRole = ({ target: { value } }) => {
    setOption(value);
  };

  const options = [
    {
      label: 'As a User',
      value: 'user',
    },
    {
      label: 'As a Partner',
      value: 'partner',
    },
  ];

  return (
    <>
      <PageTitle page="Sign Up" />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">Authentication</span>
            <h1>Sign Up</h1>
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
                <Image src={option === "user" ? userLoginGroup : partnerLoginGroup} alt="login group" />
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="login-form">
                <Radio.Group
                  size={isWebDevice ? 'large' : 'small'}
                  options={options}
                  onChange={(e) => onChangeRole(e)}
                  value={option}
                  optionType="button"
                  buttonStyle="solid"
                  style={{
                    width: '100%',
                    marginBottom: 20
                  }}
                />
                {option === "user" ? <UserRegister /> : <PartnerRegister />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

AuthSignup.authenticate = false;
AuthSignup.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default AuthSignup;

