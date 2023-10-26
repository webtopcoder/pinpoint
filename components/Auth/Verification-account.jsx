import { React, useState } from "react";
import { Spin, Divider } from 'antd';
import Image from "next/image";
import useNotify from "@/hooks/useNotify";
import { authService } from "@/services/index";
import AuthCode from "react-auth-code-input";
import { useRouter } from "next/router";
import like from "@/public/images/user/like.png";
import signup_approve_email from "@/public/images/user/signup_approve_email.png";
import Link from "next/link";

const VerificationAccount = () => {
  const router = useRouter();
  const { notify } = useNotify();
  const [loading, setLoading] = useState(false);
  const [nextstep, setStep] = useState(false);
  const { type, registration_email } = router.query;

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
          setStep(true);
          // router.push(`/auth/${type}/login`);
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
    <div className="col-lg-6 col-md-12 col-sm-12">
      <div className="login-form">
        <form style={{
          display: nextstep ? 'none' : 'block'
        }}>
          <div className="auth-space"></div>
          <h2>Verify your account</h2>
          <p className="text-left">
            We sent a verification code to the email you provided. Please enter the code below to verify your email.
          </p>
          <div className="auth-space"></div>
          <div className="auth-space"></div>
          <form>
            <div className="otpField">
              <Spin spinning={loading}>
                <AuthCode
                  allowedCharacters="numeric"
                  onChange={handleOnChange}
                />
              </Spin>
            </div>
          </form>
          <div className="authSubText">
            <p className="account-desc">
              Don't receive the code?
              <a role="button" onClick={handleResendEmail}>
                {"  "}Send again
              </a>
            </p>
            <Divider />
          </div>
        </form>
        <form>
          <div style={{
            display: nextstep ? 'block' : 'none'
          }}>
            <div className="auth-space desktop"></div>
            <h2>
              {
                type === "user" ?
                  "Your account is Verified!" : "Your account will be verified by admin and you will be notified soon !"
              }
            </h2>
            <p className="text-left">
              {
                type === "user" ?
                  `Thank you for joining Pinpoint! Please login using the credentials you used during sign up.` : "This will not grant you access to Pinpoint. You info has been sent to an Admin to grant you access. You will receive an email shortly with the status of your approval!"
              }

            </p>
            <Image src={type === "user" ? like : signup_approve_email} alt="like" />
            <div className="auth-space"></div>
            <Divider />
            <div
              className="col-lg-12 col-md-12 col-sm-12 lost-your-password-wrap"
              style={{
                textAlign: "center",
              }}
            >
              <Link href={type === "user" ? "/auth/login" : "/"}>
                <a role="button" className="lost-your-password">{type === "user" ? "Login" : "Back to Home"}</a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationAccount;
