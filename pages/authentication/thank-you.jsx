// @ts-nocheck
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Spin } from 'antd';
import AuthCode from "react-auth-code-input";
import PageTitle from "@/components/Layout/PageTitle";
import thankYouImg from "@/public/images/thank-you.png";
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";
import { authService } from "@/services/index";

const ThankYou = () => {
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
      <PageTitle page="THANK YOU | PINPOINT" />
      <div className="thank-you-area">
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
      </div>
    </>
  );
};

export default ThankYou;
