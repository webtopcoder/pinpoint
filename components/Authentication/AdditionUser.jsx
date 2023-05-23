import { React, useEffect, useState } from "react";
import Link from "next/link";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import { useCreatePasswordFormValidator } from "./User/hooks/use-create-password-validator";
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";
import { settingService } from "@/services/index";
import FormGroup from "./FormGroup";

const AdditionUser = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const { notify } = useNotify();
  const { token, partner, user, partnerID } = router.query;

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

    await settingService.updateAdditionalWithPassword({
      owner: partnerID,
      email: user,
      password: form.password,
      token: form.token,
    })
      .then(() => {
        notify("success", "Password has been changed");
        router.push("/");
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
            A Partner With Pinpoint has invited you to help manager their page.<br />
            To access this partners page, please creat a login below
          </p>
          <FormGroup
            label="Partner"
            errors={errors}
            value={partner}
            onChange={onUpdateField}
            onBlur={onBlurField}
            name="username"
            type="text"
            disabled
          />
          <FormGroup
            label="Email"
            value={user}
            onChange={onUpdateField}
            onBlur={onBlurField}
            name="email"
            errors={errors}
            disabled
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
          <FormGroup
            label="Confirm Password"
            value={form?.password}
            onChange={onUpdateField}
            onBlur={onBlurField}
            name="confirmPassword"
            errors={errors}
            type="password"
          />
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

export default AdditionUser;
