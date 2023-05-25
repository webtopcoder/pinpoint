import api from "@/utils/callApi";

function FaqService() {
  function getFaqs() {
    return api(`base/faq`, "get")
  }
  return {
    getFaqs,
  };
}

export const faqService = FaqService();