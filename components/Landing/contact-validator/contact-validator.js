export const emailValidator = (email) => {
  if (!email) {
    return "Email is required";
  } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    return "Incorrect email format";
  }
  return "";
};

export const FirstNameValidator = (firstName) => {
  if (!firstName) {
    return "First Name is required";
  }
  return "";
};

export const LastNameValidator = (LastName) => {
  if (!LastName) {
    return "Last Name is required";
  }
  return "";
};

export const usertypeValidator = (usertype) => {
  if (!usertype) {
    return "User type is required";
  }
  return "";
};

export const subjectValidator = (subject) => {
  if (!subject) {
    return "subject is required";
  }
  return "";
};

export const messageValidator = (messageContent) => {
  if (!messageContent) {
    return "message is required";
  }
  return "";
};
