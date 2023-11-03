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

  function bulkInvite(data) {
    return api(`mail/bulkInvite`, "post", data);
  }

  return {
    getIsReadEmails,
    clearMessages,
    getEmailsByID,
    bulkInvite,
  };
}

export const mailService = MailService();