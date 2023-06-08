import api from "@/utils/callApi";

function MailService() {
  function getIsReadEmails() {
    return api(`mail/isread`, "get");
  }
  return {
    getIsReadEmails,
  };
}

export const mailService = MailService();