import api from "@/utils/callApi";

function AuthService() {

  function resendverifyEmail(data) {
    return api(`auth/send-verification-email`, "post", data)
  }

  function recoveryPassword(data) {
    return api(`auth/forgot-password`, "post", data)
  }

  function uploadAvatar(data) {
    return api(`profile/avatar`, "post", data)
  }

  function updatePoll(data) {
    return api(`profile/poll`, "patch", data)
  }

  return {
    resendverifyEmail,
    recoveryPassword,
    uploadAvatar,
    updatePoll
  };
}

export const authService = AuthService();