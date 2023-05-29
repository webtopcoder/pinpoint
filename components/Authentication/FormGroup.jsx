import { forwardRef } from "react";
import styles from "./validate.module.css";

const FormGroup = forwardRef(
  (
    { value, onChange, onBlur, errors, label, type = "text", name, ...props },
    ref
  ) => {
    return (
      <div className="form-group">
        <label className="authen-text-attr">{label}</label>
        <input
          ref={ref}
          type={type}
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />{" "}
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
