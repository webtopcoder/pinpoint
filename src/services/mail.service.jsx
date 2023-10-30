import api from "@/utils/callApi";

function MailService() {
  function clearMessages() {
    return api(`mail/MarkAll`, "get")
  }

  function getIsReadEmails(params) {
    return api(`mail/unreadMessages`, "get", {}, params);
  }
  return {
    getIsReadEmails,
    clearMessages
  };
}

export const mailService = MailService();