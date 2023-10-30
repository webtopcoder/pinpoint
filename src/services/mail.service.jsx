import api from "@/utils/callApi";

function MailService() {
  function getIsReadEmails() {
    return api(`mail/isread`, "get");
  }

  function clearMessages() {
    return api(`mail/clearMark`, "get")
  }

  function getMessages(params) {
    return api(`mail`, "get", {}, params);
  }
  return {
    getIsReadEmails,
    getMessages
  };
}

export const mailService = MailService();