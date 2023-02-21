import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import csc from "country-state-city";
import Link from "next/link";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import styles from "../validate.module.css";
import { useRegisterFormValidator } from "./hooks/use-user-register-form-validator";
import { registerUser } from "@/redux/User/actions";
import "react-datepicker/dist/react-datepicker.css";
import FormGroup from "../FormGroup";
import useNotify from "@/hooks/useNotify";

const UserRegister = ({ onRegisterUser, token, loggedInRole }) => {
  const countryCode = "US";
  const country = csc.getCountryByCode(countryCode);
  const states = csc.getStatesOfCountry(country.isoCode);

  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.push(loggedInRole == "partner" ? "/partner/dashboard" : "/home");
    }
  }, [token]);

  const [form, setForm] = useState({
    role: "user",
    firstName: "",
    lastName: "",
    username: "",
    dob: new Date(),
    city: "",
    state: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [cityList, setCityList] = useState([]);
  const { notify } = useNotify();

  const { errors, validateForm, onBlurField } = useRegisterFormValidator(form);

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

  const onSubmitForm = (e) => {
    e.preventDefault();
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;
    const fields = [
      "role",
      "dob",
      "firstName",
      "lastName",
      "username",
      "email",
      "password",
    ];
    let formRequest = Object.fromEntries(fields.map((f) => [f, form[f]]));
    formRequest = {
      ...formRequest,
      address: {
        city: form.city,
        state: form.state,
      },
    };
    const savedEmail = localStorage.setItem(
      "registration_email",
      formRequest.email
    );
    onRegisterUser(formRequest, (res, error) => {
      if (error) {
        console.log("error");
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
      } else {
        router.push("/authentication/thank-you");
        console.log(savedEmail);
        localStorage.setItem("thankyou_id", "User");
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
          <div className="row">
            <div className="auth-space"></div>
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
                placeholder="Username"
              />
            </div>
            <div className="col-lg-12 col-md-12">
              <FormGroup
                label="Birthday *"
                errors={errors}
                value={form.dob}
                onChange={onUpdateField}
                onBlur={onBlurField}
                name="dob"
                type="date"
                placeholder="Birthday"
              />
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="form-group">
                <label className="authen-text-attr">State *</label>
                <select
                  name="state"
                  className="form-control"
                  value={form.state}
                  onChange={onUpdateField}
                  onBlur={onBlurField}
                >
                  <option value="0">Select State</option>
                  {states.map((option, index) => (
                    <option key={index} value={option.isoCode}>
                      {option.name}
                    </option>
                  ))}
                </select>
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
                <select
                  name="city"
                  className="form-control"
                  value={form.city}
                  onChange={onUpdateField}
                  onBlur={onBlurField}
                >
                  <option value="0">Select City</option>
                  {cityList.map((option, index) => (
                    <option key={index} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
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
          </div>
          <div className="row">
            <div className="col-lg-12">
              <button className="loginsignButton" type="submit">Create Account</button>
            </div>
          </div>
          <div className="row auth-divider"></div>

          <div className="col-12">
            <p className="account-desc">
              Already have an account? Login{" "}
              <Link href="/authentication/user/login">
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
  loggedInRole: user.role,
  token: user.token,
});

const mapDispatchToProps = (dispatch) => ({
  onRegisterUser: (data, cb) => dispatch(registerUser(data, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);
