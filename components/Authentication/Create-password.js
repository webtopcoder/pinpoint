import { React, useEffect, useState } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import styles from "./validate.module.css";
import { recoveryPassword } from "@/redux/User/actions";
import { useCreatePasswordFormValidator } from "./User/hooks/use-create-password-validator";
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";

const CreatePassword = ({ onrecoveryPassword }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const { notify } = useNotify();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      setForm({
        ...form,
        token,
      });
    }
  }, [token]);

  const { errors, validateForm, onBlurField } =
    useCreatePasswordFormValidator(form);
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
        password: form.password,
        token: form.token,
      },
      (_, error) => {
        if (error) {
          notify("error", error?.response?.data?.message || "Error");
        } else {
          notify("success", "Password has been changed");
          router.push("/");
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
            <label className="authen-text-attr">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onUpdateField}
              onBlur={onBlurField}
              className="form-control"
              placeholder="Password"
            />
            {errors.password.dirty && errors.password.error ? (
              <p className={styles.formFieldErrorMessage}>
                {errors.password.message}
              </p>
            ) : null}
          </div>
          <div className="form-group">
            <label className="authen-text-attr">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onUpdateField}
              onBlur={onBlurField}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword.dirty && errors.confirmPassword.error ? (
              <p className={styles.formFieldErrorMessage}>
                {errors.confirmPassword.message}
              </p>
            ) : null}
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <button className="loginsignButton" type="submit">Reset Password</button>
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

const mapDispatchToProps = (dispatch) => ({
  onrecoveryPassword: (data, cb) => dispatch(recoveryPassword(data, cb)),
});

export default connect(undefined, mapDispatchToProps)(CreatePassword);
