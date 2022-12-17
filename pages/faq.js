import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import FaqOne from "@/components/Faq/FaqOne";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

const Faq = () => {
  return (
    <>
      <PageTitle page="Faq" />
      <Header/>
      <div className="page-title-area bg-black">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">Frequently Ask & Question</span>
            <h1>Ciao! How Can We Help You?</h1>
            <form>
              <label>
                <i className="bx bx-search"></i>
              </label>
              <input
                type="text"
                className="input-search"
                placeholder="Search a question..."
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
      <FaqOne />
      <Footer />
    </>
  );
};

export default Faq;
