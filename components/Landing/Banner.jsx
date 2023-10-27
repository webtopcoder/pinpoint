import React from "react";
import Image from "next/image";
import bannerImgDesktop from "@/public/images/landing/hero_2.svg";
import bannerHero1Desktop from "@/public/images/landing/hero_1.svg";

const Banner = () => {
  return (
    <div className="property-banner-area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12">
            <div className="property-banner-content">
              <h1
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay="100"
                className="nunito-font"
              >
                Finding your favourite <span style={{
                  color: '#165593'
                }}>Business</span> on <span style={{
                  color: '#EC2226'
                }}>Wheels</span>  has never been easier!
              </h1>
              <p
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay="200"
              >
                Skip the Google Search - Pinpoint Brings Your Favourites to You!
              </p>
              <div className="desktop">
                <Image src={bannerHero1Desktop} alt="banner-image" />
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div
              className="property-banner-image"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <form
                className="search-form"
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay="300"
              >
                <div className="row">
                  <div className="col-lg-8 col-md-4">
                    <div className="form-group">
                      <label>Location</label>
                      <input type="text" placeholder="FIND NEARBY FOOD TRUCKS" />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <button type="submit" className="btn-style-one red-dark-color">
                      Search <i className="bx bx-search"></i>
                    </button>
                  </div>
                </div>
              </form>
              <div className="auth-space"></div>
              <div className="auth-space"></div>
              <Image src={bannerImgDesktop} alt="banner-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
