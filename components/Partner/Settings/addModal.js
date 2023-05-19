import React, { useCallback, useState } from "react";
import { Modal, Row, Col, Select, Input } from "antd";
import styles from "./settings.module.css";
import { postSettingsValue } from "@/src/redux/User/actions";
import { connect } from "react-redux";
import toast from "@/components/Toast";
import { useLoginFormValidator } from "@/components/Authentication/hooks/useLoginValidator";

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

  const { errors, validateFormAddUser, onBlurField } = useLoginFormValidator(
    form,
  );
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const onUpdateField = (e) => {
    const field = e.target.name;
    const nextFormState = {
      ...form,
      [field]: e.target.value,
    };

    setForm(nextFormState);
    if (errors[field].dirty) {
      validateFormAddUser({
        form: nextFormState,
        errors,
        field,
      });
    }
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
    const { isValid } = validateFormAddUser({ form, errors, forceTouchErrors: true });
    if (!isValid) {
      notify("error", "Please Enter a valid email-id.");

      return;
    }
    const additionalUserSettings = user_settings.find(
      (setting) => setting.key == "user:additionalUser"
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
          setForm({
            email: "",
            role: "admin",
          })
        }
      });
    }
  };
  function handleOnOk(e) {
    onSubmitForm(e);
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
        <Input
          value={form?.email}
          onChange={onUpdateField}
          onBlur={onBlurField}
          name="email"
          errors={errors}
        />
      </Row>
      <Row className={styles.modalform + " mt-1"}>
        Permissions Type
        <Select
          style={{ width: "100%" }}
          defaultValue={""}
          onChange={handleChange}
          options={[
            {
              value: "owner",
              label: "Owner",
            },
            {
              value: "Lmanager",
              label: "Location Manager",
            },
          ]}
        />
      </Row>
      <Row className="mt-3">
        <Col md={12}>
          <div className={styles.role_title}>Owner</div>
          <div className={styles.role_comment}>Access to everything</div>
        </Col>
        <Col md={12}>
          <div className={styles.role_title}>Location Manager</div>
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
