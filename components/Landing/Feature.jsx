import React from "react";
import Image from "next/image";
import AboutImg from "@/public/images/landing/iphone.png";

const Feature = () => {
  return (
    <div className="features-area bg-darkblue ptb-100">
      <div className="container">
        <div className="section-title">
          <h2 style={{
            color: 'white'
          }}>User Features</h2>
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
                        <i className="flaticon-menu"></i>
                        Seamless Navigation
                      </span>
                    </li>
                    <li
                      data-aos="fade-up"
                      data-aos-duration="1200"
                      data-aos-delay="100"
                    >
                      <span>
                        <i className="flaticon-place"></i>
                        Open Locations Only
                      </span>
                    </li>
                    <li
                      data-aos="fade-up"
                      data-aos-duration="1200"
                      data-aos-delay="200"
                    >
                      <span>
                        <i className="flaticon-consulting"></i>
                        Review Your Visits
                      </span>
                    </li>
                    <li
                      data-aos="fade-up"
                      data-aos-duration="1200"
                      data-aos-delay="300"
                    >
                      <span>
                        <i className="flaticon-people"></i>
                        Socialize with Friends
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
                  src={AboutImg}
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
                        <i className="flaticon-life"></i>
                        FREE to Use!
                      </span>
                    </li>
                    <li
                      data-aos="fade-up"
                      data-aos-duration="1200"
                      data-aos-delay="100"
                    >
                      <span>
                        <i className="flaticon-tap"></i>
                        Book Food Trucks for Your Event
                      </span>
                    </li>
                    <li
                      data-aos="fade-up"
                      data-aos-duration="1200"
                      data-aos-delay="200"
                    >
                      <span>
                        <i className="flaticon-facebook-app-symbol"></i>
                        Social Link Sharing
                      </span>
                    </li>
                    <li
                      data-aos="fade-up"
                      data-aos-duration="1200"
                      data-aos-delay="300"
                    >
                      <span>
                        <i className="flaticon-online-registration"></i>
                        Post and View Photos
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 overview-item mobile">
            <div
              className="overview-image style-three"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="100"
            >
              <div className="img">
                <Image
                  src={AboutImg}
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  alt="overview-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
