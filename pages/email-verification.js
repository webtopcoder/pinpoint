import React, { useCallback, useEffect, useState } from "react";
import AuthCode from "react-auth-code-input";
import { sendVerificationEmail, verifyUserEmail } from "@/redux/User/actions";
import { connect } from "react-redux";

import { useRouter } from "next/router";
import toast from "@/components/Toast";

const VerifyEmail = ({ onVerifyUserEmail, onResendVerifyEmail }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    if (router.query.email) {
      setEmail(router.query.email);
    }
  }, [router.query.email]);

  const handleOnChange = (res) => {
    setResult(res);
  };

  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

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
      router.push(`/authentication/${"user"}/login`);
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
    <>
      <PageTitle page="EMAIL VERIFY" />
      <div className="thank-you-area">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="thank-you-content">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onVerifyUserEmail: (data, cb) => dispatch(verifyUserEmail(data, cb)),
  onResendVerifyEmail: (data, cb) => dispatch(sendVerificationEmail(data, cb)),
});
export default connect(undefined, mapDispatchToProps)(VerifyEmail);
