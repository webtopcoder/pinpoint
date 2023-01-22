import { useState } from "react";

import {
  FirstNameValidator,
  LastNameValidator,
  UserNameValidator,
  BirthdayValidator,
  CityValidator,
  StateValidator,
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
} from "../user-validator.js/index.js";

const touchErrors = (errors) => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const useRegisterFormValidator = (form) => {
  const [errors, setErrors] = useState({
    firstName: {
      dirty: false,
      error: false,
      message: "",
    },
    lastName: {
      dirty: false,
      error: false,
      message: "",
    },
    userName: {
      dirty: false,
      error: false,
      message: "",
    },
    birthday: {
      dirty: false,
      error: false,
      message: "",
    },
    city: {
      dirty: false,
      error: false,
      message: "",
    },
    state: {
      dirty: false,
      error: false,
      message: "",
    },
    email: {
      dirty: false,
      error: false,
      message: "",
    },
    password: {
      dirty: false,
      error: false,
      message: "",
    },
    confirmPassword: {
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

    const {
      firstName,
      lastName,
      userName,
      birthday,
      city,
      state,
      email,
      password,
      confirmPassword,
    } = form;

    if (nextErrors.firstName.dirty && (field ? field === "firstName" : true)) {
      const firstNameMessage = FirstNameValidator(firstName, form);
      nextErrors.firstName.error = !!firstNameMessage;
      nextErrors.firstName.message = firstNameMessage;
      if (!!firstNameMessage) isValid = false;
    }

    if (nextErrors.lastName.dirty && (field ? field === "lastName" : true)) {
      const lastNameMessage = LastNameValidator(lastName, form);
      nextErrors.lastName.error = !!lastNameMessage;
      nextErrors.lastName.message = lastNameMessage;
      if (!!lastNameMessage) isValid = false;
    }

    if (nextErrors.userName.dirty && (field ? field === "userName" : true)) {
      const userNameMessage = UserNameValidator(userName, form);
      nextErrors.userName.error = !!userNameMessage;
      nextErrors.userName.message = userNameMessage;
      if (!!userNameMessage) isValid = false;
    }

    if (nextErrors.email.dirty && (field ? field === "email" : true)) {
      const emailMessage = emailValidator(email, form);
      nextErrors.email.error = !!emailMessage;
      nextErrors.email.message = emailMessage;
      if (!!emailMessage) isValid = false;
    }

    if (nextErrors.birthday.dirty && (field ? field === "birthday" : true)) {
      const birthdayMessage = BirthdayValidator(birthday, form);
      nextErrors.birthday.error = !!birthdayMessage;
      nextErrors.birthday.message = birthdayMessage;
      if (!!birthdayMessage) isValid = false;
    }

    if (nextErrors.city.dirty && (field ? field === "city" : true)) {
      const cityMessage = CityValidator(city, form);
      nextErrors.city.error = !!cityMessage;
      nextErrors.city.message = cityMessage;
      if (!!cityMessage) isValid = false;
    }

    if (nextErrors.state.dirty && (field ? field === "state" : true)) {
      const stateMessage = StateValidator(state, form);
      nextErrors.state.error = !!stateMessage;
      nextErrors.state.message = stateMessage;
      if (!!stateMessage) isValid = false;
    }

    if (nextErrors.password.dirty && (field ? field === "password" : true)) {
      const passwordMessage = passwordValidator(password, form);
      nextErrors.password.error = !!passwordMessage;
      nextErrors.password.message = passwordMessage;
      if (!!passwordMessage) isValid = false;
    }

    if (
      nextErrors.confirmPassword.dirty &&
      (field ? field === "confirmPassword" : true)
    ) {
      const confirmPasswordMessage = confirmPasswordValidator(
        confirmPassword,
        form
      );
      nextErrors.confirmPassword.error = !!confirmPasswordMessage;
      nextErrors.confirmPassword.message = confirmPasswordMessage;
      if (!!confirmPasswordMessage) isValid = false;
    }

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
