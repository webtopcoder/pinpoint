import { React, useState } from "react";
import Link from "next/link";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import { loginAdditionUser } from "@/redux/User/actions";
import { useLoginFormValidator } from "../hooks/useLoginValidator";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";
import { settingService } from "@/services/index";
import FormGroup from "../FormGroup";
import { connect } from "react-redux";
import PartnerModal from "@/components/Authentication/AdditionUser/partnersModal";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const AdditionUserLogin = ({ onLoginAdditionUser }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    password: "",
    email: ""
  });
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { notify } = useNotify();
  const { errors, validateForm, onBlurField } = useLoginFormValidator(form);

  async function onUpdateField(e) {
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
    // if (!isValid) return;

    await settingService.getPartners(form.email)
      .then(async (res) => {
        await setPartners(res);
        await setAddModalOpen(true);
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }

  async function handleLogin(values, ownerID) {
    setInitLoading(true);
    onLoginAdditionUser({
      email: form.email,
      owner: ownerID,
      password: values.password,
    }, (res) => {
      setLoading(false);
      setInitLoading(false);
      if (res.user.owner.status !== 'active') {
        notify("error", 'The partner account is on inactive.');
        return false;
      }
      else {
        notify("success", `Welcome to Login as ${res.user.role}`);
        router.push("/partner/dashboard");
      }
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
          <FormGroup
            label="Email"
            value={form.email}
            onChange={onUpdateField}
            onBlur={onBlurField}
            name="email"
            errors={errors}
          />

          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <Spin spinning={loading} indicator={antIcon}>
                <button className="loginsignButton" type="submit">Login</button>
              </Spin>
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
      <PartnerModal
        open={addModalOpen}
        setModalOpen={setAddModalOpen}
        loading={initLoading}
        partners={partners}
        handleLogin={(values, owner) => handleLogin(values, owner)}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onLoginAdditionUser: (data, cb) => dispatch(loginAdditionUser(data, cb)),
});

export default connect(undefined, mapDispatchToProps)(AdditionUserLogin);
