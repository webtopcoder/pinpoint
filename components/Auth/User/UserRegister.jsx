import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import csc from "country-state-city";
import Select from 'react-select';
import Link from "next/link";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from "../validate.module.css";
import { useRegisterFormValidator } from "./hooks/use-user-register-form-validator";
import "react-datepicker/dist/react-datepicker.css";
import FormGroup from "../FormGroup";
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

const UserRegister = ({ token, loggedInRole }) => {
  const countryCode = "US";
  const country = csc.getCountryByCode(countryCode);
  const states = csc.getStatesOfCountry(country.isoCode);
  const router = useRouter();
  const [defaultAvatar, setAvatar] = useState();
  const [form, setForm] = useState({
    role: "user",
    firstName: "",
    lastName: "",
    username: "",
    dob: new Date(),
    city: "",
    state: "",
    email: "",
    status: "active",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [terms, setTerms] = useState(true);
  const [isClearableState, setIsClearableState] = useState(true);
  const [isClearableCity, setIsClearableCity] = useState(true);
  const [cityList, setCityList] = useState([]);
  const { notify } = useNotify();
  const { errors, validateForm, onBlurField } = useRegisterFormValidator(form);

  useEffect(() => {
    if (token) {
      router.push(loggedInRole == "partner" ? "/partner/dashboard" : "/");
    }
  }, [token]);

  useEffect(() => {
    ongetDefaultAvatar();
  }, []);

  async function ongetDefaultAvatar() {
    const result = await authService.getDefaultAvatar();
    await setAvatar(result.result);
  }

  const onUpdateField = (e) => {
    const field = e.target.name;
    if (e.target.name == "state") {
      const citiesbystate = csc.getCitiesOfState(countryCode, e.target.value);
      setCityList(citiesbystate);
    }
    const nextFormState = {
      ...form,
      [field]: e.target.value,
    };

    setForm(nextFormState);

    if (errors[field]?.dirty)
      validateForm({
        form: nextFormState,
        errors,
        field,
      });
  };

  const onUpdateState = (e) => {
    const field = 'state';
    const citiesbystate = csc.getCitiesOfState(countryCode, e?.value);
    setCityList(citiesbystate);
    const nextFormState = {
      ...form,
      [field]: e?.value,
    };
    setForm(nextFormState);
    if (errors[field]?.dirty)
      validateForm({
        form: nextFormState,
        errors,
        field,
      });
  }

  const onUpdateCity = (e) => {
    const field = 'city';
    const nextFormState = {
      ...form,
      [field]: e?.value,
    };
    setForm(nextFormState);
    if (errors[field]?.dirty)
      validateForm({
        form: nextFormState,
        errors,
        field,
      });
  }

  async function onSubmitForm(e) {
    e.preventDefault();
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;
    setLoading(true);
    const fields = [
      "role",
      "dob",
      "firstName",
      "lastName",
      "username",
      "email",
      "password",
      "status"
    ];
    let formRequest = Object.fromEntries(fields.map((f) => [f, form[f]]));
    formRequest = {
      ...formRequest,
      username: form.username.replace(/\b\s\b/g, "-"),
      businessname: form.firstName + " " + form.lastName,
      address: {
        city: form.city,
        state: form.state,
      },
      profile: {
        avatar: defaultAvatar
      }
    };

    await authService.RegisterUser(formRequest)
      .then(() => {
        setLoading(false);
        notify("success", "Register Successfully");
        router.push({
          pathname: '/auth/verification',
          query: {
            type: 'user',
            registration_email: formRequest.email
          }
        });
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
    <form onSubmit={onSubmitForm}>
      <div className="row">
        <div className="auth-space desktop"></div>
        <div className="col-lg-6 col-md-6">
          <FormGroup
            errors={errors}
            label="First Name *"
            value={form.firstName}
            onChange={onUpdateField}
            onBlur={onBlurField}
            name="firstName"
            type="text"
          />
        </div>
        <div className="col-lg-6 col-md-6">
          <FormGroup
            errors={errors}
            label="Last Name *"
            value={form.lastName}
            onChange={onUpdateField}
            onBlur={onBlurField}
            name="lastName"
            type="text"
          />
        </div>
        <div className="col-lg-12 col-md-12">
          <FormGroup
            label="Username *"
            errors={errors}
            value={form.username}
            onChange={onUpdateField}
            onBlur={onBlurField}
            name="username"
            type="text"
          />
        </div>
        <div className="col-lg-12 col-md-12">
          <FormGroup
            label="Date Of Birth *"
            errors={errors}
            value={form.dob}
            onChange={onUpdateField}
            onBlur={onBlurField}
            name="dob"
            type="date"
          />
        </div>
        <div className="col-lg-6 col-md-6">
          <div className="form-group">
            <label className="authen-text-attr">State *</label>
            <Select
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  minHeight: 54,
                  background: '#f9f9f9',
                }),
              }}
              name="state"
              isClearable={isClearableState}
              defaultValue={form.state}
              onChange={onUpdateState}
              onBlur={onBlurField}
              options={states?.map(item => ({
                label: item.name,
                value: item.isoCode
              }))}
            >
            </Select>
            {errors.state.dirty && errors.state.error ? (
              <p className={styles.formFieldErrorMessage}>
                {errors.state.message}
              </p>
            ) : null}
          </div>
        </div>
        <div className="col-lg-6 col-md-6">
          <div className="form-group">
            <label className="authen-text-attr">City *</label>
            <Select
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  minHeight: 54,
                  background: '#f9f9f9',
                }),
              }}
              name="city"
              defaultValue={form.city}
              isClearable={isClearableCity}
              onChange={onUpdateCity}
              onBlur={onBlurField}
              options={cityList?.map(item => ({
                label: item.name,
                value: item.name
              }))}
            >
            </Select>
            {errors.city.dirty && errors.city.error ? (
              <p className={styles.formFieldErrorMessage}>
                {errors.city.message}
              </p>
            ) : null}
          </div>
        </div>
        <div className="col-lg-12 col-md-12">
          <FormGroup
            label="Email *"
            errors={errors}
            value={form.email}
            onChange={onUpdateField}
            onBlur={onBlurField}
            name="email"
            type="email"
          />
        </div>
        <div className="col-lg-12 col-md-12">
          <FormGroup
            label="Password *"
            errors={errors}
            value={form.password}
            onChange={onUpdateField}
            onBlur={onBlurField}
            name="password"
            type="password"
          />
        </div>
        <div className="col-lg-12 col-md-12">
          <FormGroup
            label="Confirm Password *"
            errors={errors}
            value={form.confirmPassword}
            onChange={onUpdateField}
            onBlur={onBlurField}
            name="confirmPassword"
            type="password"
          />
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 remember-me-wrap">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultChecked="checked"
              onChange={(e) => {
                e.target.checked ? setTerms(true) : setTerms(false);
              }}
              id="remember-me"
            />
            <label className="form-check-label" htmlFor="remember-me">
              <div className="lost-your-password-wrap">
                <span style={{
                  color: terms ? '' : '#e11d48',
                }}>I agree to</span> {" "}
                <Link href="/auth/lost-password">
                  <a className="lost-your-password">Pinpoint's terms and conditions</a>
                </Link>
                <span style={{
                  visibility: terms ? "hidden" : 'visible',
                  color: '#e11d48',
                  fontSize: 13,
                  marginLeft: 15
                }}>Required</span>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Spin spinning={loading} indicator={antIcon}>
            <button className="loginsignButton" type="submit">CREATE ACCOUNT</button>
          </Spin>
        </div>
      </div>
      {/* <div className="row auth-divider"></div> */}
      <div className="col-12">
        <p className="account-desc">
          Already have an account?
          <Link href={`/auth/login`}>
            <a>{"  "}Login{"  "}</a>
          </Link>{" "}
          here!
        </p>
      </div>
      {/* <div className="col-12">
            <p className="account-desc">
              <Link href="/login">
                <a>WHO AM I?</a>
              </Link>
            </p>
          </div> */}
    </form>
  );
};

const mapStateToProps = ({ user }) => ({
  loggedInRole: user.role,
  token: user.token,
});

export default connect(mapStateToProps, undefined)(UserRegister);
