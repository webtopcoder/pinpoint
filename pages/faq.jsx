import { React, useState, useEffect } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import FaqComponent from "@/components/Faq"
import Layout from "../layout";
import { faqService } from "@/services/index";

const Faq = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [Faqs, setFaqs] = useState([]);

  async function onSubmitForm(e) {
    e.preventDefault();
    setFlag(search !== "" ? true : false)
    const result = await faqService.SearchFaqs(search);
    await setFaqs(result?.results);
  }
  async function initializeFaq() {
    const result = await faqService.getFaqs();
    await setLoading(false);
    await setFaqs(result.data);
  }

  useEffect(() => {
    setLoading(true);
    initializeFaq();
  }, []);

  return (
    <>
      <PageTitle page="FAQ" />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">Frequently Asked Question</span>
            <h1>Let’s see if we can read your mind.</h1>
            <form onSubmit={onSubmitForm}>
              <label>
                <i className="bx bx-search"></i>
              </label>
              <input
                name="search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-search"
                placeholder="Search a question..."
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
      <FaqComponent flag={flag} Faqs={Faqs} search={search} loading={loading} />
    </>
  );
};

Faq.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Faq;
