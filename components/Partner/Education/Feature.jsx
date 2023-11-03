import React from "react";
import Image from "next/image";
import EducationFeature from "@/public/images/partner/education_feature.png";

const Feature = () => {
  return (
    <div className="features-area bg-darkblue ptb-100">
      <div className="container">
        <div className="section-title">
          <h2 style={{
            color: 'white'
          }}>Partner Features</h2>
          <div className="auth-space desktop"></div>
          <div className="auth-space desktop"></div>
        </div>

        <div className="row justify-content-center">
          <div
            className="col-lg-4 col-md-6 col-sm-12"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <div className="overview-box">
              <div className="row align-items-center">
                <div className="col-lg-12 col-md-12 overview-content">
                  <ul className="overview-list">
                    <li data-aos="fade-up" data-aos-duration="1200">
                      <span>
                        <i className="flaticon-place"></i>
                        Live Location
                      </span>
                    </li>
                    <li
                      data-aos="fade-up"
                      data-aos-duration="1200"
                      data-aos-delay="100"
                    >
                      <span>
                        <i className="flaticon-fast-time"></i>
                        Departure Time Automation
                      </span>
                    </li>
                    <li
                      data-aos="fade-up"
                      data-aos-duration="1200"
                      data-aos-delay="200"
                    >
                      <span>
                        <i className="flaticon-draw-check-mark"></i>
                        Live Checks-ins
                      </span>
                    </li>
                    <li
                      data-aos="fade-up"
                      data-aos-duration="1200"
                      data-aos-delay="300"
                    >
                      <span>
                        <i className="flaticon-satisfaction"></i>
                        Collect Reviews from Customers
                      </span>
                    </li>
                    <li data-aos="fade-up" data-aos-duration="1200">
                      <span>
                        <i className="flaticon-online-registration"></i>
                        Receive Orders
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 overview-item desktop">
            <div
              className="overview-image style-three"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="100"
            >
              <div className="img">
                <Image
                  src={EducationFeature}
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  alt="overview-image"
                />
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 col-sm-12"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="200"
          >
            <div className="overview-box">
              <div className="row align-items-center">
                <div className="col-lg-12 col-md-12 overview-content">
                  <ul className="overview-list">
                    <li data-aos="fade-up" data-aos-duration="1200">
                      <span>
                        <i className="flaticon-tap"></i>
                        Receive Bookings
                      </span>
                    </li>
                    <li
                      data-aos="fade-up"
                      data-aos-duration="1200"
                      data-aos-delay="200"
                    >
                      <span>
                        <i className="flaticon-united"></i>
                        Social Link Sharing
                      </span>
                    </li>
                    <li
                      data-aos="fade-up"
                      data-aos-duration="1200"
                      data-aos-delay="100"
                    >
                      <span>
                        <i className="flaticon-facebook-app-symbol"></i>
                        Share Location arrival with Facebook
                      </span>
                    </li>
                    <li
                      data-aos="fade-up"
                      data-aos-duration="1200"
                      data-aos-delay="300"
                    >
                      <span>
                        <i className="flaticon-happy"></i>
                        Easy to Use
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-lg-4 col-md-6 col-sm-12 overview-item mobile">
            <div
              className="overview-image style-three"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="100"
            >
              <div className="img">
                <Image
                  src={EducationFeature}
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  alt="overview-image"
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Feature;
