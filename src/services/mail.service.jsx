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

  function getInboxByID(id) {
    return api(`mail/getInboxById/${id}`, "get");
  }

  function getSentByID(id) {
    return api(`mail/getSentById/${id}`, "get");
  }

  function bulkInvite(data) {
    return api(`mail/bulkInvite`, "post", data);
  }

  return {
    getIsReadEmails,
    clearMessages,
    getEmailsByID,
    bulkInvite,
    getInboxByID,
    getSentByID
  };
}

export const mailService = MailService();