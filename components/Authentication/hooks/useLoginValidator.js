import { useState } from "react";

const touchErrors = (errors) => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const useLoginFormValidator = (form, formValidator) => {
  const initialState = Object.keys(form).reduce((obj, key) => {
    return {
      ...obj,
      [key]: {
        value: form[key],
        dirty: false,
        error: false,
      },
    };
  }, {});

  const [errors, setErrors] = useState(initialState);

  const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
    let isValid = true;

    // Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(errors));

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    Object.entries(form).forEach(([formField, value]) => {
      if (nextErrors[formField].dirty && (field ? field === formField : true)) {
        const message = formValidator[formField](value, form);
        nextErrors[formField].error = false;
        nextErrors[formField].message = "";
        if (message) isValid = false;
      }
    });

    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  const onBlurField = (e) => {
    const field = e.target.name;
    const fieldError = errors[field];
    if (fieldError.dirty) return;

    const updatedErrors = {
      ...errors,
      [field]: {
        ...errors[field],
        dirty: true,
      },
    };

    validateForm({ form, field, errors: updatedErrors });
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};
