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
  
  function ResendVerifyEmail(data) {
    return api(`auth/verify-email`, "post", data)
  }

  return {
    resendverifyEmail,
    recoveryPassword,
    resetPassword,
    VerifyUserEmail,
  };
}

export const authService = AuthService();