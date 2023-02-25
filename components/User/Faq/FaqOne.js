import useNotify from "@/hooks/useNotify";
import { getFaqs } from "@/src/redux/User/actions";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import Accordion from "./Accordion";

const FaqOne = ({ fetchFaqs, faqs }) => {
  const { notify } = useNotify();
  useEffect(() => {
    fetchFaqs((_, err) => {
      if (err) {
        notify("error", err?.response?.data?.message ?? "Something went wrong");
      }
    });
  }, []);
  return (
    <div className="faq-area bg-black pb-75 pin-faq">
      <div className="container">
        <div className="faq-accordion-content">
          <div className="box">
            <h3>Getting Started</h3>
            <div className="accordion" id="faqAccordion">
              <Accordion questionsAnswers={faqs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  faqs: state.user.faqs,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFaqs: (cb) => dispatch(getFaqs(cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FaqOne);
