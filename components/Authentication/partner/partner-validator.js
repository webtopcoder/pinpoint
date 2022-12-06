export const emailValidator = email => {
    if (!email) {
      return "Email is required";
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
      return "Incorrect email format";
    }
    return "";
  };

  export const OwnerFirstNameValidator = ownerfirstName => {
    if (!ownerfirstName) {
      return "Owner First Name is required";
    } 
    return "";
  };
  
  export const OwnerLastNameValidator = ownerlastName => {
    if (!ownerlastName) {
      return "Owner Last Name is required";
    } 
    return "";
  };

  export const OwnerLegalNameValidator = legalName => {
    if (!legalName) {
      return "Legal Name is required";
    } 
    return "";
  };

  export const AddressValidator = address => {
    if (!address) {
      return "address is required";
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
  