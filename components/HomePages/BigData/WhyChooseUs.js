import React from "react";
import Link from "next/link";

const WhyChooseUs = () => {
  return (
    <div className="why-choose-us-area pt-100 pb-75">
      <div className="container">
        <div className="section-title">
          <h2 className="nunito-font">Why Choose Abev?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
            mauris amet, placerat fames orci elementum adipiscing.
          </p>
        </div>
        <div className="row justify-content-center">
          <div
            className="col-lg-4 col-md-6 col-sm-6"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <div className="single-why-choose-us-box">
              <div className="icon">
                <i className="flaticon-expand"></i>
              </div>
              <h3 className="nunito-font">
                <Link href="/services/services-details">
                  <a>Easy to Deploy</a>
                </Link>
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed est
                non feugiat sagittis, donec.
              </p>
              <Link href="/services/services-details">
                <a className="link-btn">
                  Learn More <i className="bx bx-chevron-right"></i>
                </a>
              </Link>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 col-sm-6"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="100"
          >
            <div className="single-why-choose-us-box active">
              <div className="icon">
                <i className="flaticon-return-on-investment"></i>
              </div>
              <h3 className="nunito-font">
                <Link href="/services/services-details">
                  <a>Cost Effective</a>
                </Link>
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed est
                non feugiat sagittis, donec.
              </p>
              <Link href="/services/services-details">
                <a className="link-btn">
                  Learn More <i className="bx bx-chevron-right"></i>
                </a>
              </Link>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 col-sm-6"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="200"
          >
            <div className="single-why-choose-us-box">
              <div className="icon">
                <i className="flaticon-simple"></i>
              </div>
              <h3 className="nunito-font">
                <Link href="/services/services-details">
                  <a>Simple & Flexible</a>
                </Link>
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed est
                non feugiat sagittis, donec.
              </p>
              <Link href="/services/services-details">
                <a className="link-btn">
                  Learn More <i className="bx bx-chevron-right"></i>
                </a>
              </Link>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 col-sm-6"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <div className="single-why-choose-us-box">
              <div className="icon">
                <i className="flaticon-bell"></i>
              </div>
              <h3 className="nunito-font">
                <Link href="/services/services-details">
                  <a>Real-Time Alerts</a>
                </Link>
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed est
                non feugiat sagittis, donec.
              </p>
              <Link href="/services/services-details">
                <a className="link-btn">
                  Learn More <i className="bx bx-chevron-right"></i>
                </a>
              </Link>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 col-sm-6"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="100"
          >
            <div className="single-why-choose-us-box">
              <div className="icon">
                <i className="flaticon-maximize"></i>
              </div>
              <h3 className="nunito-font">
                <Link href="/services/services-details">
                  <a>Massively Scalable</a>
                </Link>
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed est
                non feugiat sagittis, donec.
              </p>
              <Link href="/services/services-details">
                <a className="link-btn">
                  Learn More <i className="bx bx-chevron-right"></i>
                </a>
              </Link>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 col-sm-6"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="200"
          >
            <div className="single-why-choose-us-box">
              <div className="icon">
                <i className="flaticon-security"></i>
              </div>
              <h3 className="nunito-font">
                <Link href="/services/services-details">
                  <a>Robust Security</a>
                </Link>
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed est
                non feugiat sagittis, donec.
              </p>
              <Link href="/services/services-details">
                <a className="link-btn">
                  Learn More <i className="bx bx-chevron-right"></i>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
