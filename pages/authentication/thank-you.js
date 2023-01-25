// @ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthCode from "react-auth-code-input";
import { verifyUserEmail } from "@/redux/User/actions";
import { connect } from "react-redux";

import thankYouImg from "@/public/images/thank-you.png";
import { useRouter } from "next/router";
import toast from "@/components/Toast";

const ThankYou = ({ onVerifyUserEmail }) => {
  const router = useRouter();
  const [email, setEmail] = useState("test@gmail.com");
  const [thankyou_id, setThankyouId] = useState("");
  const [result, setResult] = useState("");
  const handleOnChange = (res) => {
    setResult(res);
  };

  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  useEffect(() => {
    setEmail(window.localStorage.getItem("registration_email"));
    setThankyouId(localStorage.getItem("thankyou_id"));
  }, []);

  const backLogin = thankyou_id.toLowerCase();
  // if (typeof window !== "undefined") {
  //   // Perform localStorage action
  //   }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      otp: result,
    };
    console.log(data);
    onVerifyUserEmail(data, (res, error) => {
      if (error) {
        notify("error", "Wrong OTP!");
        return;
      }
      notify("success", "Email verified successfully");
      router.push(`/authentication/${backLogin}/login`);
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
              {/* <p className="authSubHeader">
                Fill up the OTP code to start accessing the website,
              </p> */}
              <form onSubmit={handleOnSubmit}>
                <div className="otpField">
                  <AuthCode
                    allowedCharacters="numeric"
                    onChange={handleOnChange}
                  />
                </div>
                <button type="submit" style={{
                  marginTop: 20
                }} className="btn-style-one red-light-color">Verify Email</button>
                {/* <div className="authSubText">
                    <p>Didn&#8217;t receive the code?</p>
                    <Link to="/">
                      <span>Send again</span>
                    </Link>
                  </div> */}
              </form>

              {/* <Link href={`/authentication/user/login`}>
                <a className="btn-style-one red-light-color">
                  Back to {thankyou_id} Login{" "}
                  <i className="bx bx-chevron-right"></i>
                </a>
              </Link> */}
              <div className="col-12">
                <p className="account-desc">
                  <Link href={`/authentication/${backLogin}/login`}>
                    <a className="login-dashboard-a-color">Back to {thankyou_id} Login{" "}</a>
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
});
export default connect(undefined, mapDispatchToProps)(ThankYou);
