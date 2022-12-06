import React from "react";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel3"));
import Image from "next/image";

import userImg8 from "@/public/images/user/user8.jpg";
import userImg9 from "@/public/images/user/user9.jpg";
import userImg10 from "@/public/images/user/user10.jpg";

const options = {
  items: 1,
  margin: 25,
  nav: false,
  loop: true,
  dots: true,
  autoplay: true,
  animateIn: "fadeIn",
  animateOut: "fadeOut",
  autoplayHoverPause: true,
  navText: ["<i class='ph-caret-left'></i>", "<i class='ph-caret-right'></i>"],
};

const TestimonialOne = () => {
  const [display, setDisplay] = React.useState(false);

  React.useEffect(() => {
    setDisplay(true);
  }, []);
  return (
    <div className="testimonials-area pt-100 pb-75">
      <div className="container">
        <div
          className="section-title"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <span className="sub-title light-green-color">Testimonials</span>
          <h2>Here’s what our amazing clients are saying</h2>
        </div>
        {display ? (
          <OwlCarousel
            className="testimonials-slides-two owl-carousel owl-theme"
            {...options}
          >
            <div className="single-testimonials-box">
              <div className="row align-items-center">
                <div className="col-lg-7 col-md-7">
                  <i className="flaticon-left-quote"></i>
                  <h5>“I never really lost it to begin with.”</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Urna facilisi viverra felis eleifend ornare urna. Eu mauris,
                    velit volutpat massa volutpat. Risus pellentesque felis nisl
                    ut laoreet euismod vel, integer. Massa sodales lorem nisi,
                    sed massa volutpat.
                  </p>
                  <div className="info">
                    <h3>Lora Joly</h3>
                    <span>Founder at Envato</span>
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 text-center">
                  <div className="img">
                    <Image src={userImg8} alt="user" />
                  </div>
                </div>
              </div>
            </div>
            <div className="single-testimonials-box">
              <div className="row align-items-center">
                <div className="col-lg-7 col-md-7">
                  <i className="flaticon-left-quote"></i>
                  <h5>“Every moment is a fresh beginning.”</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Urna facilisi viverra felis eleifend ornare urna. Eu mauris,
                    velit volutpat massa volutpat. Risus pellentesque felis nisl
                    ut laoreet euismod vel, integer. Massa sodales lorem nisi,
                    sed massa volutpat.
                  </p>
                  <div className="info">
                    <h3>David Warner</h3>
                    <span>Founder at ThemeForest</span>
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 text-center">
                  <div className="img">
                    <Image src={userImg9} alt="user" />
                  </div>
                </div>
              </div>
            </div>
            <div className="single-testimonials-box">
              <div className="row align-items-center">
                <div className="col-lg-7 col-md-7">
                  <i className="flaticon-left-quote"></i>
                  <h5>“Whatever you do, do it well.”</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Urna facilisi viverra felis eleifend ornare urna. Eu mauris,
                    velit volutpat massa volutpat. Risus pellentesque felis nisl
                    ut laoreet euismod vel, integer. Massa sodales lorem nisi,
                    sed massa volutpat.
                  </p>
                  <div className="info">
                    <h3>James Anderson</h3>
                    <span>Founder at EnvyTheme</span>
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 text-center">
                  <div className="img">
                    <Image src={userImg10} alt="user" />
                  </div>
                </div>
              </div>
            </div>
          </OwlCarousel>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default TestimonialOne;
