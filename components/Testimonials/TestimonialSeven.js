import React from "react";
import Image from "next/image";

import userImg1 from "@/public/images/user/user1.jpg";
import userImg2 from "@/public/images/user/user2.jpg";
import userImg3 from "@/public/images/user/user3.jpg";

const TestimonialSeven = () => {
  return (
    <div className="testimonials-area ptb-100">
      <div className="container">
        <div className="section-title">
          <span className="sub-title yellow-color">Testimonials</span>
          <h2 className="nunito-font">
            Here’s what our amazing Students are saying
          </h2>
        </div>
        <div className="row justify-content-center">
          <div
            className="col-xl-4 col-lg-6 col-md-6"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <div className="testimonials-box">
              <div className="rating">
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna
                facilisi viverra felis eleifend ornare urna. Eu mauris, velit
                volutpat massa volutpat. Pellentesque felis nisl ut laoreet
                euismod vel, integer.
              </p>
              <div className="info d-flex align-items-center">
                <div className="img">
                  <Image src={userImg1} alt="user" />
                </div>
                <div className="title">
                  <h3>Lora Joly</h3>
                  <span>Founder at Envato</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-6 col-md-6"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="100"
          >
            <div className="testimonials-box">
              <div className="rating">
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna
                facilisi viverra felis eleifend ornare urna. Eu mauris, velit
                volutpat massa volutpat. Pellentesque felis nisl ut laoreet
                euismod vel, integer.
              </p>
              <div className="info d-flex align-items-center">
                <div className="img">
                  <Image src={userImg2} alt="user" />
                </div>
                <div className="title">
                  <h3>David Warner</h3>
                  <span>Founder at ThemeForest</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-6 col-md-6"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="200"
          >
            <div className="testimonials-box">
              <div className="rating">
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna
                facilisi viverra felis eleifend ornare urna. Eu mauris, velit
                volutpat massa volutpat. Pellentesque felis nisl ut laoreet
                euismod vel, integer.
              </p>
              <div className="info d-flex align-items-center">
                <div className="img">
                  <Image src={userImg3} alt="user" />
                </div>
                <div className="title">
                  <h3>James Anderson</h3>
                  <span>Founder at EnvyTheme</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSeven;
