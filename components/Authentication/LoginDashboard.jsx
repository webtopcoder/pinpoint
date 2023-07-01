import React from "react";
import Link from "next/link";
import logo from "@/public/images/logo.png";
import Image from "next/image";

const LoginDashboard = () => {
  return (
    <div className="col-lg-6 col-md-12">
      <div className="login-form">
        <div className="logo-center">
          <Link href="/">
            <a className="navbar-brand">
              <Image src={logo} alt="site logo" />
            </a>
          </Link>
        </div>
        <form>
          <div className="col-12">
            <p className="account-desc">I&apos;M A...</p>
          </div>
          <Link href="/authentication/user/login">
            <button className="login-dashboard-button">
              Pinpoint User
              <p className="login-dashboard-button-subcaption">
                *on the prowl looking for mobile vendors?
              </p>
            </button>
          </Link>
          <div className="col-12">
            <p className="account-desc-custom">OR</p>
          </div>
          <Link href="/authentication/partner/login">
            <button className="login-dashboard-button" type="submit">
              Pinpoint Partner
              <p className="login-dashboard-button-subcaption">
                *Login to post your location!
              </p>
            </button>
          </Link>
          <div className="col-12">
            <p className="account-desc-custom">OR</p>
          </div>
          <Link href="/authentication/eventhost/login">
            <button className="login-dashboard-button" type="submit">
              Event Host
              <p className="login-dashboard-button-subcaption">
                *Login to post your event!
              </p>
            </button>
          </Link>
          <div className="col-12">
            <p className="account-desc">
              <Link href="/">
                <a className="login-dashboard-a-color">Just let me in..</a>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginDashboard;
