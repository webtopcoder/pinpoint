// @ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthCode from "react-auth-code-input";
import { sendVerificationEmail, verifyUserEmail } from "@/redux/User/actions";
import { connect } from "react-redux";

import thankYouImg from "@/public/images/thank-you.png";
import { useRouter } from "next/router";
import toast from "@/components/Toast";

const ThankYou = ({ onVerifyUserEmail, onResendVerifyEmail }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [thankyou_id, setThankyouId] = useState("");
  const [result, setResult] = useState("");
  const handleOnChange = (res) => {
    setResult(res);
  };

  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem("registration_email")) {
      setEmail(window.localStorage.getItem("registration_email"));
    }
    setThankyouId(localStorage.getItem("thankyou_id"));
  }, []);

  const backLogin = thankyou_id.toLowerCase();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      otp: result,
    };
    onVerifyUserEmail(data, (_, error) => {
      if (error) {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      }
      notify("success", "Email verified successfully");
      router.push(`/authentication/${backLogin}/login`);
    });
  };

  const handleResendEmail = () => {
    const data = {
      email: email,
    };
    onResendVerifyEmail(data, (_, error) => {
      if (error) {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      }
      notify("success", "Email sent successfully");
    });
  };

  return (
    <div className="thank-you-area">
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="thank-you-content">
              <Image src={thankYouImg} alt="thank-you" />
              <h3>THANK YOU FOR JOINING PINPOINT!</h3>
              <p>
                PLEASE VERIFY YOUR ACCOUNT TO GAIN ACCESS...WE JUST SENT YOU A
                OTP TO THE EMAIL GIVEN!
              </p>
              <form onSubmit={handleOnSubmit}>
                <div className="otpField">
                  <AuthCode
                    allowedCharacters="numeric"
                    onChange={handleOnChange}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    marginTop: 20,
                  }}
                  className="btn-style-one red-light-color"
                >
                  Verify Email
                </button>
                <div className="authSubText">
                  <p>Didn&#8217;t receive the code?</p>
                  <a role="button" onClick={handleResendEmail}>
                    <span>Send again</span>
                  </a>
                </div>
              </form>

              <div className="col-12">
                <p className="account-desc">
                  <Link href={`/authentication/${backLogin}/login`}>
                    <a className="login-dashboard-a-color">
                      Back to {thankyou_id} Login{" "}
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onVerifyUserEmail: (data, cb) => dispatch(verifyUserEmail(data, cb)),
  onResendVerifyEmail: (data, cb) => dispatch(sendVerificationEmail(data, cb)),
});
export default connect(undefined, mapDispatchToProps)(ThankYou);
