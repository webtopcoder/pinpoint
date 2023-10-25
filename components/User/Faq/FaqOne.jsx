import React, { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import Accordion from "./Accordion";
import { Spin } from "antd";
import { faqService } from "@/services/index";

const antIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;

const FaqOne = () => {
  const [loading, setLoading] = React.useState(false);
  const [Faqs, setFaqs] = React.useState([]);

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
    <div className="faq-area bg-f1f5fd pb-75">
      <div className="container">
        <div className="faq-accordion-content">
          <div className="box">
            <h3>Getting Started</h3>
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

export default FaqOne;
