import { useState } from "react";

import {
  UserInfoValidator,
  passwordValidator,
} from "../user-validator.js";

const touchErrors = errors => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const useLoginFormValidator = form => {
  const [errors, setErrors] = useState({
    userInfo: {
      dirty: false,
      error: false,
      message: "",
    },
    password: {
      dirty: false,
      error: false,
      message: "",
    },
  });

  const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
    let isValid = true;

    // Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(errors));

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { userInfo, password } = form;

    if (nextErrors.userInfo.dirty && (field ? field === "userInfo" : true)) {
      const userInfoMessage = UserInfoValidator(userInfo, form);
      nextErrors.userInfo.error = !!userInfoMessage;
      nextErrors.userInfo.message = userInfoMessage;
      if (!!userInfoMessage) isValid = false;
    }

    if (nextErrors.password.dirty && (field ? field === "password" : true)) {
      const passwordMessage = passwordValidator(password, form);
      nextErrors.password.error = !!passwordMessage;
      nextErrors.password.message = passwordMessage;
      if (!!passwordMessage) isValid = false;
    }

    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  const onBlurField = e => {
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
