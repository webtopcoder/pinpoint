import React from "react";
import Image from "next/image";
import whyPartner from "@/public/images/partner/why_partner.png";
import shapeImg14 from "@/public/images/shape/shape14.png";
import shapeImg15 from "@/public/images/shape/shape15.png";

const Whypinpoint = () => {
  return (
    <div className="goal-area ptb-100 bg-fffbfb">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12">
            <div className="goal-content style-two">
              <h2 className="nunito-font">
                Why Partner with <span style={{
                  color: '#165593'
                }}>PIN</span><span style={{
                  color: '#EC2226'
                }}>POINT</span>
              </h2>
              <ul className="overview-list">
                <li data-aos="fade-up" data-aos-duration="1200">
                  <i className="flaticon-draw-check-mark"></i>
                  Widen your business footprint and reach more customers.
                </li>
                <li
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  data-aos-delay="100"
                >
                  <i className="flaticon-draw-check-mark"></i>
                  Give your customers a transparent outlook on your business.
                </li>
                <li
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  data-aos-delay="200"
                >
                  <i className="flaticon-draw-check-mark"></i>
                  Generate real reviews from your customer.
                </li>
                <li
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  data-aos-delay="200"
                >
                  <i className="flaticon-draw-check-mark"></i>
                  Socialize directly with your community.
                </li>
                <li
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  data-aos-delay="200"
                >
                  <i className="flaticon-draw-check-mark"></i>
                  Receive private bookings from customers.
                </li>
              </ul>
              <div
                className="btn-box"
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay="300"
              >
                {/* <Link href="/contact">
                  <a className="btn-style-one white-color">
                    Get Started Now <i className="bx bx-chevron-right"></i>
                  </a>
                </Link> */}
              </div>
            </div>
          </div>
          <div
            className="col-lg-6 col-md-12"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <div className="goal-image style-two">
              <Image src={whyPartner} alt="goal4" />
            </div>
          </div>
        </div>
      </div>
      <div className="shape10">
        <Image src={shapeImg14} alt="shape" />
      </div>
      <div className="shape11">
        <Image src={shapeImg15} alt="shape" />
      </div>
    </div>
  );
};

export default Whypinpoint;
