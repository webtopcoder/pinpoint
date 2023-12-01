//optimized
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { loginUser } from "@/redux/User/actions";
import { useLoginFormValidator } from "../hooks/useLoginValidator";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";
import { connect } from "react-redux";
import FormGroup from "../FormGroup";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const Form = ({ onLoginUser, token, loggedInRole, option }) => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { notify } = useNotify();
  const [form, setForm] = useState({
    email: "",
    password: "",
    isRemembered: false
  });

  useEffect(() => {

    const rememberEmail = localStorage.getItem("email");
    const rememberCheckbox = localStorage.getItem("checkbox");
    if (rememberEmail && rememberCheckbox) {
      setForm({
        email: rememberEmail,
        password: localStorage.getItem("password") || "",
        isRemembered: true,
      });
    }
  }, []);

  useEffect(() => {
    if (token) {
      router.push(loggedInRole == "partner" ? "/partner/dashboard" : "/");
    }
  }, [token]);

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

  const rememberMeHandler = (e) => {
    const isRemembered = e.target.checked;
    setForm({
      ...form, isRemembered: isRemembered
    })
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;
    setLoading(true);

    if (form.isRemembered && form.email !== "") {
      localStorage.setItem("email", form.email);
      localStorage.setItem("password", form.password);
      localStorage.setItem("checkbox", form.isRemembered);
    }

    const { isRemembered, ...newFormData } = form;
    onLoginUser({ ...newFormData, role: option }, (res, error) => {
      setLoading(false);
      if (error) {
        notify(
          "error",
          error?.response?.data?.message ?? "Something went wrong"
        );
        return;
      }

      switch (option) {
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
    <form onSubmit={onSubmitForm}>
      <FormGroup
        label="Email *"
        value={form?.email}
        onChange={onUpdateField}
        onBlur={onBlurField}
        name="email"
        errors={errors}
      />
      <FormGroup
        label="Password *"
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
              onChange={rememberMeHandler}
              id="remember-me"
            />
            <label className="form-check-label" htmlFor="remember-me">
              Remember me
            </label>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 lost-your-password-wrap">
          <Link href="/auth/lost-password">
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
    </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form);