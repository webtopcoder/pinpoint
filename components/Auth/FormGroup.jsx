import { forwardRef } from "react";
import React, { useState } from "react";
import styles from "./validate.module.css";

const FormGroup = forwardRef(
  (
    { value, onChange, onBlur, errors, label, type = "text", name, ...props },
    ref
  ) => {

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
      setPasswordShown(passwordShown ? false : true);
    };

    return (
      <div className="form-group">
        <label className="authen-text-attr">{label}</label>
        <div className={type === "password" ? 'pass-wrap' : ''}>
          <input
            ref={ref}
            type={type === "password" ? passwordShown ? "text" : "password" : type}
            className="form-control"
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            {...props}
          />{" "}
          {type === "password" ? <i onClick={togglePasswordVisiblity} className={passwordShown?"flaticon-visibility pass-eye": "flaticon-view pass-eye"}></i> : ''}
        </div>
        {errors[name]?.dirty && errors[name]?.error ? (
          <p className={styles.formFieldErrorMessage}>
            {errors[name]?.message}
          </p>
        ) : null}
      </div>
    );
  }
);

export default FormGroup;
