import api from "@/utils/callApi";

function FaqService() {
  function getFaqs() {
    return api(`faq/getFaqs`, "get")
  }

  function SearchFaqs(data) {
    return api(`faq/searchFaqs?q=${data}&&limit=100`, "get");
  }
  return {
    getFaqs,
    SearchFaqs
  };
}

export const faqService = FaqService();