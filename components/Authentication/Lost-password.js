import { React, useState, useCallback } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import styles from "./validate.module.css";
import { forgotPassword } from "@/redux/User/actions";
import { useLostPasswordFormValidator } from "./User/hooks/use-lost-password-validator";
import useNotify from "@/hooks/useNotify";

const LostPassword = ({ onrecoveryPassword }) => {
  const { notify } = useNotify();

  const [form, setForm] = useState({
    userInfo: "",
  });

  const { errors, validateForm, onBlurField } =
    useLostPasswordFormValidator(form);
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

  const onSubmitForm = (e) => {
    e.preventDefault();
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;
    onrecoveryPassword(
      {
        emailOrUsername: form.userInfo,
      },
      (_, error) => {
        if (error) {
          notify("error", error?.response?.data?.message || "Error");
        } else {
          notify("success", "Email has been sent");
        }
      }
    );
  };

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
        <form onSubmit={onSubmitForm}>
          <div className="auth-space"></div>
          <p className="text-center">
            Lost your password? Please enter your username or email address. You
            will receive a link to create a new password via email.
          </p>
          <div className="form-group">
            <label className="authen-text-attr">Username or email *</label>
            <input
              type="text"
              name="userInfo"
              className="form-control"
              value={form.userInfo}
              onChange={onUpdateField}
              placeholder="Username or email"
              onBlur={onBlurField}
            />
            {errors.userInfo.dirty && errors.userInfo.error ? (
              <p className={styles.formFieldErrorMessage}>
                {errors.userInfo.message}
              </p>
            ) : null}
          </div>

          <div className="form-group">
            <div className="row">
              <div className="col-lg-6 col-md-6 remember-me-wrap">
                <Link href="/authentication/lost-password">
                  <a className="lost-your-password">
                    Resend Email Verification
                  </a>
                </Link>
              </div>
              <div
                className="col-lg-6 col-md-6 remember-me-wrap"
                style={{
                  textAlign: "end",
                }}
              >
                <Link href="/authentication/lost-password">
                  <a className="lost-your-password">Login</a>
                </Link>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <button type="submit">Reset Password</button>
            </div>
            <div className="col-lg-2"></div>
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

const mapStateToProps = ({ user }) => ({
  resetPasswordInfo: user.resetPasswordInfo,
});

const mapDispatchToProps = (dispatch) => ({
  onrecoveryPassword: (data, cb) => dispatch(forgotPassword(data, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LostPassword);
