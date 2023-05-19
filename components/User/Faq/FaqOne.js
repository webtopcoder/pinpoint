import useNotify from "@/hooks/useNotify";
import { getFaqs } from "@/src/redux/User/actions";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import Accordion from "./Accordion";
import { Spin } from "antd";
import { faqService } from "@/services/index";

const antIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;

const FaqOne = ({ fetchFaqs, faqs }) => {
  const [loading, setLoading] = React.useState(false);
  const { notify } = useNotify();

  useEffect(() => {
    setLoading(true);
    getFaqs();
    fetchFaqs((_, err) => {
      setLoading(false);
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
