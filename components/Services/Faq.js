import React from "react";
import Accordion from "../Accordion";
import Image from "next/image";

import faqImg1 from "@/public/images/faq1.png";

const questionsAnswers = [
  {
    question: "How many team members can I invite?",
    answer:
      "You can invite up to 2 additional users on the Free plan. There is no limit on team members for the Premium plan.",
  },
  {
    question: "What is the maximum file upload size?",
    answer:
      "No more than 2GB. All files in your account must fit your allotted storage space.",
  },
  {
    question: "How do I reset my password?",
    answer: `Click “Forgot password” from the login page or “Change password” from your profile page. A reset link will be emailed to you.`,
  },
  {
    question: "Can I cancel my subscription?",
    answer: `Yes! Send us a message and we’ll process your request no questions asked.`,
  },
];

const Faq = () => {
  return (
    <div className="faq-area with-top-border ptb-100">
      <div className="container">
        <div className="row m-0 align-items-end">
          <div className="col-lg-6 col-md-12 p-0">
            <div className="faq-accordion">
              <div className="section-title">
                <span className="sub-title">Frequently Ask & Question</span>
                <h2>Dedicated to help anything people’s needs</h2>
              </div>
              <div className="accordion" id="faqAccordion">
                <Accordion questionsAnswers={questionsAnswers} />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 p-0">
            <div className="faq-image" data-aos="fade-up">
              <Image src={faqImg1} alt="faq-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
