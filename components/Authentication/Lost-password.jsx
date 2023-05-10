import { React, useState } from "react";
import Link from "next/link";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import styles from "./validate.module.css";
import { useLostPasswordFormValidator } from "./User/hooks/use-lost-password-validator";
import useNotify from "@/hooks/useNotify";
import { useRouter } from "next/router";
import { authService } from "@/services/index";

const LostPassword = () => {
  const router = useRouter();
  const { notify } = useNotify();

  const [form, setForm] = useState({
    userInfo: "",
  });

  async function handleResendEmail() {
    const data = {
      email: form.userInfo,
    };

    await authService.resendverifyEmail(data)
      .then(() => {
        notify("success", "Email sent successfully");
        router.push(`/email-verification?email=${form.userInfo}`);
      })
      .catch((error) => {
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

  return (
    <div className="col-lg-6 col-md-12 col-sm-12">
      <div className="login-form">
        <div className="logo-center">
          <Link href="/">
            <a className="navbar-brand">
              <Image src={logo} alt="site logo" />
            </a>
          </Link>
        </div>
        <form onSubmit={onSubmitForm}>
          <div className="auth-space"></div>
          <p className="text-center">
            Lost your password? <br />Please enter your username or email address. You
            will receive a link to create a new password via email.
          </p>
          <div className="form-group" style={{
            marginBottom: 10,
          }}>
            <label className="authen-text-attr">Username or email *</label>
            <input
              type="text"
              name="userInfo"
              className="form-control"
              value={form.userInfo}
              onChange={onUpdateField}
              onBlur={onBlurField}
            />
            {errors.userInfo.dirty && errors.userInfo.error ? (
              <p className={styles.formFieldErrorMessage}>
                {errors.userInfo.message}
              </p>
            ) : null}
          </div>

          <div className="form-group" style={{
            marginBottom: 10,
          }}>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-9 remember-me-wrap">
                <a
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const emailRegex = /[+\w0-9._-]+@[\w0-9._-]+\.[\w0-9_-]+$/;
                    if (form.userInfo && emailRegex.test(form.userInfo)) {
                      handleResendEmail();
                      return;
                    }
                    notify("error", "Please enter valid email");
                  }}
                  className="lost-your-password"
                >
                  Resend Email Verification
                </a>
              </div>
              <div
                className="col-lg-6 col-md-6 col-sm-3 remember-me-wrap"
                style={{
                  textAlign: "end",
                }}
              >
                <Link href="/authentication/user/login">
                  <a className="lost-your-password">Login</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <button className="loginsignButton" type="submit">Submit</button>
            </div>
          </div>
          <div className="row auth-divider"></div>
          <div className="col-12">
            <p className="account-desc">
              <Link href="/">
                <a>WHO AM I?</a>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LostPassword;
