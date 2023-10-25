import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import Accordion from "./Accordion";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;

const index = ({ flag, loading, Faqs }) => {
  return (
    <div className="faq-area bg-f1f5fd pb-75">
      <div className="container">
        <div className="faq-accordion-content">
          <div className="box">
            <h3>{flag ? `Searched ${Faqs?.length} items` : "Getting Started"}</h3>
            <div className="accordion" id="faqAccordion">
              {loading && (
                <Spin
                  indicator={antIcon}
                  style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              )}
              <Accordion questionsAnswers={Faqs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
