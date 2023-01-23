// @ts-nocheck
import toast from "@/components/Toast";
import logo from "@/public/images/logo.png";
import { registerUser } from "@/redux/User/actions";
import { getCategory } from "@/redux/User/actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import FormGroup from "../FormGroup";

import styles from "../validate.module.css";

import { useRegisterFormValidator } from "./hooks/use-partner-register-validator";

const PartnerRegister = ({ onRegisterUser, ongetCategory, categoryInfo }) => {
  let itemLocality = "";
  let itemState = "";
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

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
    types: ["establishment"],
  };

  const router = useRouter();

  const [form, setForm] = useState({
    role: "partner",
    firstName: "",
    lastName: "",
    userName: "",
    address: "",
    city: "",
    state: "",
    category: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addressForm, setaddressForm] = useState({
    address: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      mapAutoCompleteOptions
    );

    autoCompleteRef.current.addListener("place_changed", async function () {
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
      });
    });

    ongetCategory();

    // return () => {
    //   autoCompleteRef.current?.removeListener("place_changed");
    // };
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

  const onSubmitForm = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      address: addressForm.address,
      city: addressForm.city,
      state: addressForm.state,
    });
    const { isValid } = validateForm({
      form,
      addressForm,
      errors,
      forceTouchErrors: true,
    });
    if (!isValid) return;

    onRegisterUser(form, (res) => {
      res.success ? notify("success", res.msg) : notify("error", res.msg);

      if (res.success) {
        localStorage.setItem("thankyou_id", "Partner");
        router.push("/authentication/thank-you");
      }
    });
  };

  return (
    <>
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
              <div className="col-lg-12 col-md-12">
                <FormGroup
                  errors={errors}
                  label="Business Legal Name *"
                  value={form.userName}
                  onChange={onUpdateField}
                  onBlur={onBlurField}
                  name="userName"
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
                    {categoryInfo.map((option, index) => (
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
            </div>
            <div className="row">
              <div className="col-lg-2"></div>
              <div className="col-lg-8">
                <button type="submit">REQUEST ACCESS</button>
              </div>
              <div className="col-lg-2"></div>
            </div>
            <div className="row auth-divider"></div>
            <div className="col-12">
              <p className="account-desc">
                Already have an account ? Login{" "}
                <Link href="/authentication/partner/login">
                  <a>HERE</a>
                </Link>{" "}
                for free!
              </p>
            </div>
            <div className="col-12">
              <p className="account-desc">
                <Link href="/">
                  <a>WHO AM I ? </a>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = ({ user }) => ({
  categoryInfo: user.partnerCategory.categories,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onRegisterUser: (data, cb) => dispatch(registerUser(data, cb)),
    ongetCategory: () => dispatch(getCategory()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PartnerRegister);
