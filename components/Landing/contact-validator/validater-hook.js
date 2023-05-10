import { useState } from "react";

import {
  FirstNameValidator,
  LastNameValidator,
  emailValidator,
  subjectValidator,
  messageValidator,
} from "./contact-validator.js";

const touchErrors = (errors) => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const ContactFormValidator = (form) => {
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
    email: {
      dirty: false,
      error: false,
      message: "",
    },
    usertype: {
      dirty: false,
      error: false,
      message: "",
    },
    subject: {
      dirty: false,
      error: false,
      message: "",
    },
    messageContent: {
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

    const { usertype, firstName, lastName, email, subject, messageContent } =
      form;

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

    if (nextErrors.usertype.dirty && (field ? field === "usertype" : true)) {
      const usertypeMessage = LastNameValidator(usertype, form);
      nextErrors.usertype.error = !!usertypeMessage;
      nextErrors.usertype.message = usertypeMessage;
      if (!!usertypeMessage) isValid = false;
    }

    if (nextErrors.subject.dirty && (field ? field === "subject" : true)) {
      const subjectMessage = subjectValidator(subject, form);
      nextErrors.subject.error = !!subjectMessage;
      nextErrors.subject.message = subjectMessage;
      if (!!subjectMessage) isValid = false;
    }

    if (
      nextErrors.messageContent.dirty &&
      (field ? field === "messageContent" : true)
    ) {
      const messageContentMessage = messageValidator(messageContent, form);
      nextErrors.messageContent.error = !!messageContentMessage;
      nextErrors.messageContent.message = messageContentMessage;
      if (!!messageContentMessage) isValid = false;
    }

    if (nextErrors.email.dirty && (field ? field === "email" : true)) {
      const emailMessage = emailValidator(email, form);
      nextErrors.email.error = !!emailMessage;
      nextErrors.email.message = emailMessage;
      if (!!emailMessage) isValid = false;
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
