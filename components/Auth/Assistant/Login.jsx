import { React, useState } from "react";
import { loginAdditionUser } from "@/redux/User/actions";
import { assistantLoginFormValidator } from "../hooks/assistantLoginValidator";
import { Spin } from 'antd';
import Select from 'react-select';
import { LoadingOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";
import { settingService } from "@/services/index";
import FormGroup from "../FormGroup";
import { connect } from "react-redux";
import styles from "../validate.module.css";
import { apiBaseUrl } from "@/utils/baseUrl";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const AdditionUserLogin = ({ onLoginAdditionUser }) => {
  const avatarurl = `${apiBaseUrl}/avatar/`;
  const router = useRouter();
  const [form, setForm] = useState({
    password: "",
    email: "",
    partner: ""
  });
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { notify } = useNotify();
  const { errors, validateForm, onBlurField } = assistantLoginFormValidator(form);

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

  const onUpdatePartner = (e) => {
    const field = 'partner';
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

  async function onVerifyAssistant() {
    await settingService.getPartners(form.email)
      .then(async (res) => {
        console.log(res)
        await setPartners(res);
        await setVerify(true);
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

  async function handleLogin(e) {
    e.preventDefault();
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;

    setInitLoading(true);
    onLoginAdditionUser({
      email: form.email,
      owner: form.partner,
      password: form.password,
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
    <form onSubmit={handleLogin}>
      <div className="auth-space"></div>
      <div className="form-group">
        <label className="authen-text-attr">Email *</label>
        <div className="verify-wrap">
          {verify ?
            <input
              disabled
              type="email"
              className="form-control"
              name='email'
              value={form.email}
              onChange={onUpdateField}
              onBlur={onBlurField}
            /> :
            <input
              type="email"
              className="form-control"
              name='email'
              value={form.email}
              onChange={onUpdateField}
              onBlur={onBlurField}
            />}

          <a role="button"
            style={{
              background: verify ? 'green' : '',
              pointerEvents: verify ? 'none' : '',
            }}
            onClick={onVerifyAssistant} className='blue-dark-color pass-eye'>{verify ? "verified" : "verify"}</a>
          {errors['email']?.dirty && errors['email']?.error ? (
            <p className={styles.formFieldErrorMessage}>
              {errors['email']?.message}
            </p>
          ) : null}
        </div>
      </div>
      <div style={{
        display: verify ? 'block' : 'none'
      }}>
        <div className="form-group">
          <label className="authen-text-attr">Partner *</label>
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                minHeight: 54,
                background: '#f9f9f9',
                borderColor: 'none',
                boxShadow: 'none',
                borderStyle: 'none'
              }),
            }}
            name="partner"
            isClearable={true}
            defaultValue={form?.partner}
            onChange={onUpdatePartner}
            onBlur={onBlurField}
            options={partners?.map(item => ({
              label: <div><img src={avatarurl + item.owner?.profile?.avatar?.filepath} height="30px" width="30px" />&nbsp;&nbsp;&nbsp;{item?.owner?.businessname} </div>,
              value: item?.owner?._id
            }))}
          >
          </Select>
          {errors.partner.dirty && errors.partner.error ? (
            <p className={styles.formFieldErrorMessage}>
              {errors.partner.message}
            </p>
          ) : null}
        </div>
        <FormGroup
          label="Password *"
          value={form?.password}
          onChange={onUpdateField}
          onBlur={onBlurField}
          name="password"
          errors={errors}
          type="password"
        />
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <Spin spinning={loading} indicator={antIcon}>
              <button className="loginsignButton" type="submit">Login</button>
            </Spin>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <button style={{
              backgroundColor: '#c82e31'
            }} className="loginsignButton" onClick={() => setVerify(false)}>Reset</button>
          </div>
        </div>
      </div>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onLoginAdditionUser: (data, cb) => dispatch(loginAdditionUser(data, cb)),
});

export default connect(undefined, mapDispatchToProps)(AdditionUserLogin);
