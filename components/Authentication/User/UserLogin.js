import toast from "@/components/Toast";
import logo from "@/public/images/logo.png";
import { loginUser } from "@/redux/User/actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { React, useCallback, useState } from "react";
import { connect } from "react-redux";

import FormGroup from "../FormGroup";
import styles from "../validate.module.css";

import { useLoginFormValidator } from "./hooks/use-user-login-form-validator";

const UserLogin = ({ onLoginUser }) => {
  const router = useRouter();
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const dismiss = useCallback(() => {
    toast.dismiss();
  }, []);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { errors, validateForm, onBlurField } = useLoginFormValidator(form);

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
    console.log(form);
    onLoginUser(form, (res) => {
      res.success ? notify("success", res.msg) : notify("error", res.msg);
      if (res.success) {
        router.push("/home");
      }
    });
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
          <FormGroup
            label="Email"
            value={form?.email}
            onChange={onUpdateField}
            onBlur={onBlurField}
            name="email"
            errors={errors}
          />

          <FormGroup
            label="Password"
            value={form?.password}
            onChange={onUpdateField}
            onBlur={onBlurField}
            name="password"
            errors={errors}
            type="password"
          />
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 remember-me-wrap">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remember-me"
                />
                <label className="form-check-label" htmlFor="remember-me">
                  Remember me
                </label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 lost-your-password-wrap">
              <Link href="/authentication/lost-password">
                <a className="lost-your-password">OOPS! I forgot my password</a>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <button type="submit">Log In</button>
            </div>
            <div className="col-lg-4"></div>
          </div>
          <div className="row auth-divider"></div>

          <div className="col-12">
            <p className="account-desc">
              No Account Yet? Signup{" "}
              <Link href="/authentication/user/register">
                <a>HERE</a>
              </Link>{" "}
              for free!
            </p>
          </div>
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
  loginInfo: user.loginInfo,
});

const mapDispatchToProps = (dispatch) => ({
  onLoginUser: (data, cb) => dispatch(loginUser(data, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
