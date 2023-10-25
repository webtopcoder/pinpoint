// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import useNotify from "@/hooks/useNotify";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import FormGroup from "../FormGroup";
import styles from "../validate.module.css";
import { useRegisterFormValidator } from "./hooks/use-partner-register-validator";
import { categoryService, authService } from "@/services/index";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const PartnerRegister = ({
  loggedInRole,
  token,
}) => {

  let itemLocality = "";
  let itemState = "";
  const [defaultAvatar, setAvatar] = useState();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    role: "partner",
    firstName: "",
    lastName: "",
    username: "",
    businessname: '',
    address: "",
    city: "",
    state: "",
    lat: "",
    lng: "",
    category: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [addressForm, setaddressForm] = useState({
    address: "",
    city: "",
    state: "",
    lat: "",
    lng: "",
  });
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push(loggedInRole == "partner" ? "/partner/dashboard" : "/");
    }
  }, [token]);

  const { notify } = useNotify();

  const autoCompleteRef = useRef();
  const inputRef = useRef();

  const mapAutoCompleteOptions = {
    componentRestrictions: { country: "us" },
    fields: [
      "address_components",
      "adr_address",
      "formatted_address",
      "geometry",
      "name",
    ],
  };

  async function ongetCategory() {
    const result = await categoryService.getCategory();
    await setCategories(result.allcategories);
  }

  async function ongetDefaultAvatar() {
    const result = await authService.getDefaultAvatar();
    await setAvatar(result.result);
  }

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      mapAutoCompleteOptions
    );

    autoCompleteRef.current?.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      place.address_components.map((address_component, _) => {
        if (address_component.types[0] == "locality")
          itemLocality = address_component.long_name;
        if (address_component.types[0] == "administrative_area_level_1")
          itemState = address_component.long_name;
      });

      setaddressForm({
        ...addressForm,
        address: place.formatted_address,
        state: itemState,
        city: itemLocality,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    });

    ongetCategory();
    ongetDefaultAvatar();
  }, []);

  const { errors, validateForm, onBlurField } = useRegisterFormValidator(
    form,
    addressForm
  );

  const onUpdateField = (e) => {
    const field = e.target.name;
    if (field == "address") {
      const nextFormState = {
        ...addressForm,
        [field]: e.target.value,
      };

      setaddressForm(nextFormState);
      if (errors[field]?.dirty)
        validateForm({
          addressForm: nextFormState,
          form: form,
          errors,
          field,
        });
    } else {
      const nextFormState = {
        ...form,
        [field]: e.target.value,
      };

      setForm(nextFormState);
      if (errors[field]?.dirty)
        validateForm({
          form: nextFormState,
          addressForm: addressForm,
          errors,
          field,
        });
    }
  };

  async function onSubmitForm(e) {
    e.preventDefault();
    setForm({
      ...form,
      address: addressForm.address,
      city: addressForm.city,
      state: addressForm.state,
      lat: addressForm.lat,
      lng: addressForm.lng,
    });

    const { isValid } = validateForm({
      form,
      addressForm,
      errors,
      forceTouchErrors: true,
    });

    if (!isValid) return;
    setLoading(true);
    const data = {
      role: form.role,
      firstName: form.firstName,
      lastName: form.lastName,
      username: form.username.replace(/\b\s\b/g, "-"),
      businessname: form.businessname,
      address: {
        address: addressForm.address,
        city: addressForm.city,
        state: addressForm.state,
        latitude: addressForm.lat,
        longitude: addressForm.lng,
      },
      profile: {
        avatar: defaultAvatar
      },
      category: form.category,
      email: form.email,
      password: form.password,
    };

    await authService.RegisterUser(data)
      .then(() => {
        setLoading(false);
        notify("success", "Register Successfully");
        router.push({
          pathname: '/authentication/verification',
          query: {
            type: 'partner',
            registration_email: form.email
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
    <>
      <form onSubmit={onSubmitForm}>
        <div className="row">
          <div className="auth-space"></div>
          <div className="col-lg-12 col-md-12">
            <FormGroup
              errors={errors}
              label="Business Legal Name *"
              value={form.businessname}
              onChange={onUpdateField}
              onBlur={onBlurField}
              name="businessname"
              type="text"
            />
          </div>
          <div className="col-lg-12 col-md-12">
            <FormGroup
              errors={errors}
              label="Username *"
              value={form.username}
              onChange={onUpdateField}
              onBlur={onBlurField}
              name="username"
              type="text"
            />
          </div>
          <div className="col-lg-6 col-md-6">
            <FormGroup
              errors={errors}
              label="Owner First Name *"
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
              label="Owner Last Name *"
              value={form.lastName}
              onChange={onUpdateField}
              onBlur={onBlurField}
              name="lastName"
              type="text"
            />
          </div>
          <div className="col-lg-12 col-md-12">
            <FormGroup
              errors={errors}
              label="Business Physical Address(Corporate)*"
              value={addressForm.address}
              onChange={onUpdateField}
              onBlur={onBlurField}
              name="address"
              type="text"
              ref={inputRef}
              placeholder=""
            />
          </div>
          <div className="col-lg-6 col-md-6">
            <FormGroup
              errors={errors}
              label="State *"
              value={addressForm.state}
              onChange={onUpdateField}
              name="state"
              disabled
            />
          </div>
          <div className="col-lg-6 col-md-6">
            <FormGroup
              errors={errors}
              label="City *"
              name="city"
              value={addressForm.city}
              onChange={onUpdateField}
              disabled
            />
          </div>
          <div className="col-lg-12 col-md-12">
            <div className="form-group">
              <label className="authen-text-attr">Category *</label>
              <select
                name="category"
                className="form-control"
                value={form.category}
                onChange={onUpdateField}
                onBlur={onBlurField}
              >
                <option value="0">Select Category</option>
                {categories?.map((option, index) => (
                  <option key={index} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </select>
              {errors.category.dirty && errors.category.error ? (
                <p className={styles.formFieldErrorMessage}>
                  {errors.category.message}
                </p>
              ) : null}
            </div>
          </div>
          <div className="col-lg-12 col-md-12">
            <FormGroup
              errors={errors}
              label="Email *"
              value={form.email}
              onChange={onUpdateField}
              onBlur={onBlurField}
              name="email"
              type="email"
            />
          </div>
          <div className="col-lg-12 col-md-12">
            <FormGroup
              errors={errors}
              label="Password *"
              value={form.password}
              onChange={onUpdateField}
              onBlur={onBlurField}
              name="password"
              type="password"
            />
          </div>
          <div className="col-lg-12 col-md-12">
            <FormGroup
              errors={errors}
              label="Confirm Password *"
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
                  <Link href="/authentication/lost-password">
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
              <button className="loginsignButton" type="submit">REQUEST ACCESS</button>
            </Spin>
          </div>
        </div>
        {/* <div className="row auth-divider"></div> */}
        <div className="col-12">
          <p className="account-desc">
            Already have an account?
            <Link href={`/authentication/login`}>
              <a>{"  "}Login{"  "}</a>
            </Link>{" "}
            here!
          </p>
        </div>
        {/* <div className="col-12">
          <p className="account-desc">
            <Link href="/login">
              <a>WHO AM I ? </a>
            </Link>
          </p>
        </div> */}
      </form>
    </>
  );
};
const mapStateToProps = ({ user }) => ({
  token: user.token,
  loggedInRole: user.role,
});

export default connect(mapStateToProps)(PartnerRegister);
