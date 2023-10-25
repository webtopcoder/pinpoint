import { React, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./validate.module.css";
import like from "@/public/images/user/like.png";
import { Spin, Steps, Button } from 'antd';
import { LoadingOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useCreatePasswordFormValidator } from "./User/hooks/use-create-password-validator";
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";
import { authService } from "@/services/index";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const CreatePassword = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [nextstep, setStep] = useState(1);
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

  const { errors, validateForm, onBlurField } = useCreatePasswordFormValidator(form);
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
    await setLoading(true);
    await authService.resetPassword({
      password: form.password,
      token: form.token,
    })
      .then(async () => {
        await setLoading(false);
        notify("success", "Password has been changed");
        // router.push("/");
        await setStep(3);
      })
      .catch(async (error) => {
        await setLoading(false);
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }

  return (
    <div className="col-lg-6 col-md-12">
      <div className="login-form">
        <Steps
          size="small"
          current={nextstep}
          items={[
            {
              title: 'Send Link',
            },
            {
              title: 'Create Password',
            },
            {
              title: 'Done',
            },
          ]}
        />
        <form style={{
          display: nextstep === 1 ? 'block' : 'none'
        }} onSubmit={onSubmitForm}>

          <div className="auth-space"></div>
          <div className="auth-space"></div>
          <p className="text-left">
            Please submit your new password.
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
            />
            {errors.confirmPassword.dirty && errors.confirmPassword.error ? (
              <p className={styles.formFieldErrorMessage}>
                {errors.confirmPassword.message}
              </p>
            ) : null}
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <Spin spinning={loading} indicator={antIcon}>
                <button className="loginsignButton" type="submit">Continue</button>
              </Spin>
            </div>
          </div>
          {/* <div className="row auth-divider"></div>
          <div className="col-12">
            <p className="account-desc">
              <Link href="/">
                <a>WHO AM I?</a>
              </Link>
            </p>
          </div> */}
        </form>
        <div style={{
          display: nextstep === 3 ? 'block' : 'none'
        }}>
          <div className="auth-space desktop"></div>
          <div className="auth-space"></div>
          <div className="page-title-content">
            <h3>All Done here</h3>
          </div>
          <p className="text-center">
            Your password was reset successfully.
          </p>
          <div className="logo-center">
            <Image src={like} alt="like" />
          </div>
          <div className="auth-space"></div>
          <div
            className="col-lg-12 col-md-12 col-sm-12 remember-me-wrap"
            style={{
              textAlign: "center",
            }}
          >
            <Link href="/auth/login">
              <Button type="link" icon={<ArrowRightOutlined />}>Login</Button>
              {/* <a className="lost-your-password">Login */}
              {/* </a> */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
