import { React, useState } from "react";
import { Spin, Divider } from 'antd';
import Image from "next/image";
import { useLostPasswordFormValidator } from "./User/hooks/use-lost-password-validator";
import useNotify from "@/hooks/useNotify";
import { authService } from "@/services/index";
import AuthCode from "react-auth-code-input";
import { useRouter } from "next/router";
import like from "@/public/images/user/like.png";
import Link from "next/link";

const VerificationAccount = () => {
  const router = useRouter();
  const { notify } = useNotify();
  const [loading, setLoading] = useState(false);
  const [nextstep, setStep] = useState(false);
  const [form, setForm] = useState({
    userInfo: "",
  });
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
          // router.push(`/authentication/${type}/login`);
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
    const data = {
      email: form.userInfo,
    };
    await setLoading(true);
    await authService.recoveryPassword(data)
      .then(async () => {
        await setLoading(false);
        notify("success", "Email has been resent");
      })
      .catch(async error => {
        await setLoading(false);
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }

  const { errors, validateForm, onBlurField } = useLostPasswordFormValidator(form);

  const onUpdateField = (e) => {
    const field = e.target.name;
    const nextFormState = {
      ...form,
      [field]: e.target.value,
    };
    setForm(nextFormState);
    if (errors[field].dirty)
      validateForm({
        form: nextFormState,
        errors,
        field,
      });
  };

  async function onSubmitForm(e) {
    e.preventDefault();
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;

    await authService.recoveryPassword({ emailOrUsername: form.userInfo, })
      .then(() => {
        setStep(true);
        notify("success", "Email has been sent");
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }

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
        <form onSubmit={onSubmitForm} style={{
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
            <h2>Your account is Verified! </h2>
            <p className="text-left">
              Thank you for joining Pinpoint! <br />Please login using the credentials you used during sign up.
            </p>
            <Image src={like} alt="like" />
            <div className="auth-space"></div>
            <Divider />
            <div
              className="col-lg-12 col-md-12 col-sm-12 lost-your-password-wrap"
              style={{
                textAlign: "center",
              }}
            >
              <Link href="/authentication/login">
                <a role="button" className="lost-your-password">Login</a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationAccount;
