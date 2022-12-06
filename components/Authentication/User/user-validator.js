export const emailValidator = email => {
    if (!email) {
      return "Email is required";
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
      return "Incorrect email format";
    }
    return "";
  };

  export const UserInfoValidator = userInfo => {
    if (!userInfo) {
      return "UserName or Email is required";
    } 
    return "";
  };


  export const FirstNameValidator = firstName => {
    if (!firstName) {
      return "firstName is required";
    } 
    return "";
  };
  
  export const LastNameValidator = LastName => {
    if (!LastName) {
      return "LastName is required";
    } 
    return "";
  };

  export const UserNameValidator = userName => {
    if (!userName) {
      return "UserName is required";
    } 
    return "";
  };

  export const BirthdayValidator = Birthday => {
    if (!Birthday) {
      return "Birthday is required";
    } 
    return "";
  };

  export const CityValidator = City => {
    if (!City) {
      return "City is required";
    } 
    return "";
  };

  export const StateValidator = state => {
    if (!state) {
      return "state is required";
    } 
    return "";
  };

  export const passwordValidator = password => {
    if (!password) {
      return "Password is required";
    } else if (password.length < 8) {
      return "Password must have a minimum 8 characters";
    }
    return "";
  };
  
  export const confirmPasswordValidator = (confirmPassword, form) => {
    if (!confirmPassword) {
      return "Confirm password is required";
    } else if (confirmPassword.length < 8) {
      return "Confirm password must have a minimum 8 characters";
    } else if (confirmPassword !== form.password) {
      return "Passwords do not match";
    }
    return "";
  };
  