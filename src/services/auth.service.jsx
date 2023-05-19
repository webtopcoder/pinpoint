import api from "@/utils/callApi";

function AuthService() {

  function resendverifyEmail(data) {
    return api(`auth/send-verification-email`, "post", data)
  }

  function recoveryPassword(data) {
    return api(`auth/forgot-password`, "post", data)
  }

  function resetPassword(data) {
    return api(`auth/reset-password`, "post", data)
  }

  function VerifyUserEmail(data) {
    return api(`auth/verify-email`, "post", data)
  }

  function getDefaultAvatar() {
    return api(`auth/getDefaultAvatar`, "get")
  }

  function RegisterUser(data) {
    return api(`auth/register`, "post", data)
  }

  return {
    resendverifyEmail,
    recoveryPassword,
    resetPassword,
    VerifyUserEmail,
    getDefaultAvatar,
    RegisterUser
  };
}

export const authService = AuthService();