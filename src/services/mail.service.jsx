import api from "@/utils/callApi";

function MailService() {
  function clearMessages() {
    return api(`mail/MarkAll`, "get")
  }

  function getIsReadEmails(params) {
    return api(`mail/unreadMessages`, "get", {}, params);
  }

  function getEmailsByID() {
    return api(`mail/getEmailsByID`, "get");
  }
  return {
    getIsReadEmails,
    clearMessages,
    getEmailsByID
  };
}

export const mailService = MailService();