import React, { useState, useRef, useEffect } from "react";
import styles from "./settings.module.css";
import useNotify from "@/hooks/useNotify";
import { useRegisterFormValidator } from "../../Authentication/Partner/hooks/use-partner-register-validator";
import { Col, Row, Layout, Button, Spin } from "antd";
import {
  DoubleLeftOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import { useRouter } from "next/router";
import FormGroup from "../../Authentication/FormGroup";
import { settingService } from "@/services/index";

const { Content } = Layout;
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const Business = () => {
  const router = useRouter();
  const { notify } = useNotify();
  const [form, setForm] = useState({
    usertype: "partner",
    firstName: "",
    lastName: "",
    userName: "",
    businessName: "",
    address: "",
    city: "",
    state: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [addressForm, setaddressForm] = useState({
    address: "",
    city: "",
    state: "",
  });

  async function initialize() {
    const result = await settingService.getPartnerInfo();
    setForm({
      ...form,
      firstName: result.user.firstName,
      lastName: result.user.lastName,
      userName: result.user.username,
      businessName: result.user.businessname,
      address: result.user.address?.address,
      city: result.user.address?.city,
      state: result.user.address?.state,
      email: result.user.email,
    });
    setaddressForm({
      address: result.user.address?.address,
      city: result.user.address?.city,
      state: result.user.address?.state,
    });
  };

  const inputRef = useRef();
  const autoCompleteRef = useRef();
  const { errors, validateForm, onBlurField } = useRegisterFormValidator(
    form,
    addressForm
  );

  const options = {
    componentRestrictions: { country: "us" },
    fields: [
      "address_components",
      "adr_address",
      "formatted_address",
      "geometry",
      "name",
    ],
  };

  useEffect(() => {
    initialize();
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      let itemLocality = "";
      let itemState = "";
      place?.address_components.map((address_component, i) => {
        if (address_component.types[0] == "locality")
          itemLocality = address_component.long_name;
        if (address_component.types[0] == "administrative_area_level_1")
          itemState = address_component.long_name;
      });

      setaddressForm({
        ...addressForm,
        address: place?.formatted_address,
        state: itemState,
        city: itemLocality,
      });
    });
  }, []);

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

  useEffect(() => {

  });

  async function onUpdateInfoForm(e) {
    e.preventDefault();
    setForm({
      ...form,
      address: addressForm.address,
      city: addressForm.city,
      state: addressForm.state,
    });

    const data = {
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      username: form.userName,
      businessname: form.businessName,
      address: {
        address: addressForm.address,
        city: addressForm.city,
        state: addressForm.state,
      },
    };

    await settingService.partnerProfileUpdate(data).then(async () => {
      await setLoading(false);
      notify("success", "Changed Successfully.");
    })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  };

  return (
    <Layout
      className="site-layout"
      style={{
        background: "#211f1f",
      }}
    >
      <Content
        className="partner-layout"
      >
        <div className="site-card-wrapper">
          <Row className="mb-5">
            <Col md={12} xs={12} sm={12}>
              <Button
                type="primary"
                shape="round"
                icon={<DoubleLeftOutlined />}
                onClick={() => router.push("/partner/settings")}
              >
                Go back
              </Button>
            </Col>
          </Row>
          <div className={styles.business_detail_content}>
            <div className="login-form">
              <form onSubmit={onUpdateInfoForm}>
                <div className="row">
                  <div className="auth-space"></div>
                  <div className="col-lg-12 col-md-12">
                    <FormGroup
                      errors={errors}
                      label="Business Legal Name *"
                      value={form.businessName}
                      onChange={onUpdateField}
                      onBlur={onBlurField}
                      name="businessName"
                      type="text"
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <FormGroup
                      errors={errors}
                      label="Username *"
                      value={form.userName}
                      onChange={onUpdateField}
                      onBlur={onBlurField}
                      name="userName"
                      type="text"
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12" >
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
                  <div className="col-lg-6 col-md-6 col-sm-12">
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
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <FormGroup
                      errors={errors}
                      label="Business Physical Address(Corporate)*"
                      value={addressForm.address}
                      onChange={onUpdateField}
                      onBlur={onBlurField}
                      name="address"
                      type="text"
                      ref={inputRef}
                      disabled
                      placeholder=""
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="authen-text-attr">State *</label>
                      <input
                        name="state"
                        value={addressForm.state}
                        onChange={onUpdateField}
                        className="form-control"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="authen-text-attr">City *</label>
                      <input
                        name="city"
                        value={addressForm.city}
                        onChange={onUpdateField}
                        className="form-control"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
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
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <Spin spinning={loading} indicator={antIcon}>
                      <button className="loginsignButton" type="submit">Update Info</button>
                    </Spin>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Business;
