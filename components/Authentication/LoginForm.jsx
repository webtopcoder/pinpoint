import React, { useEffect, useState } from "react";
import logo from "@/public/images/logo.png";
import { loginUser } from "@/redux/User/actions";
import Image from "next/image";
import Link from "next/link";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";
import { connect } from "react-redux";
import FormGroup from "./FormGroup";
import { useLoginFormValidator } from "./hooks/useLoginValidator";
import useNotify from "@/hooks/useNotify";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const LoginForm = ({ onLoginUser, role, token, loggedInRole }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      router.push(loggedInRole == "partner" ? "/partner/dashboard" : "/");
    }
  }, [token]);
  const { notify } = useNotify();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { errors, validateForm, onBlurField } = useLoginFormValidator(
    form
  );

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
    setLoading(true);
    onLoginUser({ ...form, role }, (res, error) => {
      setLoading(false);
      if (error) {
        notify(
          "error",
          error?.response?.data?.message ?? "Something went wrong"
        );
        return;
      }

      switch (role) {
        case 'partner':
          if (res.user.status !== 'active') {
            notify("error", 'Not Allowed');
            return false;
          }
          else {
            notify("success", `Welcome ${res.user.businessname}`);
            router.push("/partner/dashboard");
          }
          break;
        case 'eventhost':
          if (res.user.status !== 'active') {
            notify("error", 'Not Allowed');
            return false;
          }
          else {
            notify("success", `Welcome ${res.user.businessname}`);
            router.push("/eventhost/dashboard");
          }
          break;
        default:
          notify("success", `Welcome ${res.user.businessname}`);
          router.push("/");
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
            <div className="col-lg-6 col-md-6 col-sm-6 remember-me-wrap">
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
            <div className="col-lg-6 col-md-6 col-sm-6 lost-your-password-wrap">
              <Link href="/authentication/lost-password">
                <a className="lost-your-password">forgot password</a>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <Spin spinning={loading} indicator={antIcon}>
                <button className="loginsignButton" type="submit">Log In</button>
              </Spin>
            </div>
          </div>
          <div className="row auth-divider"></div>
          <div className="col-12">
            <p className="account-desc">
              No Account Yet? Signup{" "}
              <Link href={`/authentication/${role}/register`}>
                <a>HERE</a>
              </Link>{" "}
              for free!
            </p>
            <p className="account-desc-custom">
              <Link href={`/authentication/additionuser/login`}>
                <a>Are you additional user for partner?</a>
              </Link>{" "}
            </p>
          </div>
          <div className="col-12">
            <p className="account-desc">
              <Link href="/login">
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
  loggedInRole: user.role,
  token: user.token,
});

const mapDispatchToProps = (dispatch) => ({
  onLoginUser: (data, cb) => dispatch(loginUser(data, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
