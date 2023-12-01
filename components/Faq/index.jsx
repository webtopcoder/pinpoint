import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import Accordion from "./Accordion";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;

const index = ({ flag, loading, Faqs, search }) => {
  return (
    <div className="faq-area bg-f8fbff pb-75">
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
              <Accordion search={search} questionsAnswers={Faqs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
