import React, { useState } from "react";
import { Modal, Row, Col, Select } from "antd";
import styles from "./settings.module.css";
import { postSettingsValue } from "@/src/redux/User/actions";
import { connect } from "react-redux";
import useNotify from "@/hooks/useNotify";
const AddUserModal = ({
  modal,
  onOk,
  onCancel,
  onSettingsToggle,
  user_settings,
}) => {
  const [form, setForm] = useState({
    email: "",
    role: "admin",
  });
  const notify = useNotify();
  const onUpdateField = (e) => {
    const field = e.target.name;
    const nextFormState = {
      ...form,
      [field]: e.target.value,
    };
    setForm(nextFormState);
  };
  const handleChange = (e) => {
    const nextFormState = {
      ...form,
      role: e,
    };
    setForm(nextFormState);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    const additionalUserSettings = user_settings.find(
      (setting) => (setting.key = "user:additionalUser")
    );
    if (!additionalUserSettings) {
      const additionalUserSettingsArray = [];
      additionalUserSettingsArray.push(form);

      const data = {
        key: `user:additionalUser`,
        value: additionalUserSettingsArray,
      };
      onSettingsToggle(data, (res, error) => {
        if (error) {
          console.log("error");
        } else {
          notify("success", "Settings Changed.");
        }
      });
    } else {
      const additionalUserSettingsArray = additionalUserSettings.value;
      const filtered = additionalUserSettingsArray.filter(
        (user) => user.email != form.email
      );
      filtered.push(form);
      const data = {
        key: `user:additionalUser`,
        value: filtered,
      };
      onSettingsToggle(data, (res, error) => {
        if (error) {
          console.log("error");
        } else {
          notify("success", "Settings Changed.");
        }
      });
    }
  };
  function handleOnOk(e) {
    onSubmitForm(e);
    onOk();
  }
  return (
    <Modal
      className={styles.partner_setting_adduser + " settings"}
      okText="Add User"
      cancelText="Cancel"
      open={modal}
      onOk={handleOnOk}
      onCancel={onCancel}
    >
      <div className={styles.partner_setting_logo}></div>
      <Row className={styles.modal_title}>Add Additional User</Row>
      <Row className={styles.modalform}>
        Additional User Email
        <div className="form-group">
          <label className="authen-text-attr">Email</label>
          <input
            className="form-control"
            name="email"
            value={form?.email}
            onChange={onUpdateField}
          />
        </div>
      </Row>
      <Row className={styles.modalform + " mt-1"}>
        Permissions Type
        <Select
          style={{ width: "100%" }}
          defaultValue={"admin"}
          onChange={handleChange}
          options={[
            {
              value: "admin",
              label: "Admin",
            },
            {
              value: "owner",
              label: "Owner",
            },
            {
              value: "basic",
              label: "Basic",
            },
          ]}
        />
      </Row>
      <Row className="mt-3">
        <Col md={8}>
          <div className={styles.role_title}>Owner</div>
          <div className={styles.role_comment}>Access to everything</div>
        </Col>
        <Col md={8}>
          <div className={styles.role_title}>Admin</div>
          <div className={styles.role_comment}>
            Everything BUT access to payments and adding/removing additional
            users.
          </div>
        </Col>
        <Col md={8}>
          <div className={styles.role_title}>Basic</div>
          <div className={styles.role_comment}>
            Can only mark the Arrival or Departure of a location.
          </div>
        </Col>
      </Row>
    </Modal>
  );
};
const mapStateToProps = ({ user }) => {
  return {
    user_settings: user.settings,
  };
};
const mapDispatchToProps = (dispatch) => ({
  onSettingsToggle: (data, cb) => dispatch(postSettingsValue(data, cb)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddUserModal);
