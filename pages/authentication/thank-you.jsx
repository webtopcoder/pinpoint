import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import Layout from "../../layout";
import { Spin } from 'antd';
import AuthCode from "react-auth-code-input";
import PageTitle from "@/components/Layout/PageTitle";
import thankYouImg from "@/public/images/thank-you.png";
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";
import { authService } from "@/services/index";
import passwordGroup from "@/public/images/user/email-verification-code.png";
import VerificationStep from "@/components/Authentication/Verification-account";

const Verification = () => {
  const router = useRouter();
  const { notify } = useNotify();
  const { type, registration_email } = router.query;
  const [loading, setLoading] = useState(false);

  async function handleOnChange(res) {
    if (res.length === 6) {
      setLoading(true);
      const data = {
        email: registration_email,
        otp: res,
      };
      await authService.VerifyUserEmail(data)
        .then(() => {
          setLoading(false);
          notify("success", "Email verified successfully");
          router.push(`/authentication/${type}/login`);
        })
        .catch((error) => {
          setLoading(false);
          notify(
            "error",
            error?.response?.data?.message || "Something went wrong"
          );
          return;
        });
    }
  };

  async function handleResendEmail() {
    setLoading(true);
    const data = {
      email: registration_email,
    };
    await authService.resendverifyEmail(data)
      .then(() => {
        setLoading(false);
        notify("success", "Email sent successfully");
      })
      .catch((error) => {
        setLoading(false);
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  };

  return (
    <>
      <PageTitle page="THANK YOU" />
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
      {/* <div className="thank-you-area">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <Spin spinning={loading}>
                <div className="thank-you-content">
                  <Image src={thankYouImg} alt="thank-you" />
                  <h3>THANK YOU FOR JOINING PINPOINT!</h3>
                  <p>
                    PLEASE VERIFY YOUR ACCOUNT TO GAIN ACCESS...WE JUST SENT YOU A
                    OTP TO THE EMAIL GIVEN!
                  </p>
                  <form>
                    <div className="otpField">
                      <AuthCode
                        allowedCharacters="numeric"
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="authSubText">
                      <p>Didn&#8217;t receive the code?</p>
                      <a role="button" onClick={handleResendEmail}>
                        <span>Send again</span>
                      </a>
                    </div>
                  </form>
                  <div className="col-12">
                    <p className="account-desc">
                      <Link href={`/authentication/${type}/login`}>
                        <a className="login-dashboard-a-color">
                          Back to {type} Login{" "}
                        </a>
                      </Link>
                    </p>
                  </div>
                </div>
              </Spin>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

Verification.authenticate = false;

Verification.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default Verification;
