import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import FaqOne from "@/components/User/Faq/FaqOne";
import Layout from "../layout";

const Faq = () => {
  return (
    <>
      <PageTitle page="FAQ" />
      <div className="page-title-area bg-black">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">Frequently Asked Question</span>
            <h1>Ciao! How Can We Help You?</h1>
            {/* <form>
              <label>
                <i className="bx bx-search"></i>
              </label>
              <input
                type="text"
                className="input-search"
                placeholder="Search a question..."
              />
              <button type="submit">Search</button>
            </form> */}
          </div>
        </div>
      </div>
      <FaqOne />
    </>
  );
};

Faq.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Faq;
