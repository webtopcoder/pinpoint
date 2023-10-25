import { React, useState } from "react";
import Link from "next/link";
import { Steps } from 'antd';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import styles from "./validate.module.css";
import { Spin } from 'antd';
import { useLostPasswordFormValidator } from "./User/hooks/use-lost-password-validator";
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

const LostPassword = () => {
  const { notify } = useNotify();
  const [loading, setLoading] = useState(false);
  const [nextstep, setStep] = useState(false);
  const [form, setForm] = useState({
    userInfo: "",
  });

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

  return (
    <div className="col-lg-6 col-md-12 col-sm-12">
      <div className="login-form">
        <Steps
          size="small"
          current={0}
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
        <form onSubmit={onSubmitForm} style={{
          display: nextstep ? 'none' : 'block'
        }}>
          <div className="auth-space"></div>
          <div className="auth-space"></div>
          <p className="text-left">
            Enter the email address associated with your account and we will send you a link to create a new password.
          </p>
          <div className="form-group" style={{
            marginBottom: 10,
          }}>
            <label className="authen-text-attr">Email *</label>
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

          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <Spin spinning={loading} indicator={antIcon}>
                <button className="loginsignButton" type="submit">Submit</button>
              </Spin>
            </div>
          </div>
          {/* <div className="row auth-divider"></div>
          <div className="col-12">
            <p className="account-desc">
              <Link href="/">
                <a>Home</a>
              </Link>
            </p>
          </div> */}
        </form>
        <form>
          <div style={{
            display: nextstep ? 'block' : 'none'
          }}>
            <div className="auth-space desktop"></div>
            <div className="auth-space"></div>
            <p className="text-left">
              An email has been sent to <b>{form?.userInfo}</b>. If this email address is registered to pinpointsocial.com, you'll receive instructions on how to set a new password.
            </p>
            <div className="auth-space"></div>
            <div
              className="col-lg-12 col-md-12 col-sm-12 lost-your-password-wrap"
              style={{
                textAlign: "end",
              }}
            >
              <a onClick={() => setStep(false)} className="lost-your-password">Didn't get an email</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LostPassword;
