// @ts-nocheck
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthCode from "react-auth-code-input";
import { verifyUserEmail } from "@/redux/User/actions";
import { connect } from "react-redux";

import thankYouImg from "@/public/images/thank-you.png";
import { useRouter } from "next/router";

const ThankYou = ({ onVerifyUserEmail }) => {
  let thankyou_id = "";
  let backLogin = "";
  const router = useRouter();
  const [email, setEmail] = useState("test@gmail.com");
  const [result, setResult] = useState("");
  const handleOnChange = (res) => {
    setResult(res);
  };

  useEffect(() => {
    setEmail({ email: window.localStorage.getItem("registration_email") });
    thankyou_id = localStorage.getItem("thankyou_id");
    backLogin = thankyou_id.toLowerCase();
  }, []);

  // if (typeof window !== "undefined") {
  //   // Perform localStorage action
  //   }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email.email,
      otp: result,
    };
    console.log(data);
    onVerifyUserEmail(data, (res) => {
      if (res.success) {
        router.push("/authentication/user/login");
      }
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
              <p className="authSubHeader">
                Fill up the OTP code to start accessing the website,
              </p>
              <form onSubmit={handleOnSubmit}>
                <div className="otpField">
                  <AuthCode
                    allowedCharacters="numeric"
                    onChange={handleOnChange}
                  />
                </div>
                <button type="submit">Verify Email</button>
                {/* <div className="authSubText">
                    <p>Didn&#8217;t receive the code?</p>
                    <Link to="/">
                      <span>Send again</span>
                    </Link>
                  </div> */}
              </form>

              <Link href={`/authentication/user/login`}>
                <a className="btn-style-one red-light-color">
                  Back to {thankyou_id} Login{" "}
                  <i className="bx bx-chevron-right"></i>
                </a>
              </Link>
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
