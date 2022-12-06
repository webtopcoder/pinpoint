import React from "react";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel3"));
import Image from "next/image";

import phoneCallImg from "@/public/images/phone-call.jpg";

const options = {
  items: 1,
  margin: 25,
  nav: false,
  loop: false,
  dots: true,
  autoplay: true,
  animateIn: "fadeIn",
  animateOut: "fadeOut",
  autoplayHoverPause: true,
  navText: [
    "<i className='ph-caret-left'></i>",
    "<i className='ph-caret-right'></i>",
  ],
};

const TestimonialFour = () => {
  const [display, setDisplay] = React.useState(false);

  React.useEffect(() => {
    setDisplay(true);
  }, []);
  return (
    <div className="testimonials-area ptb-100">
      <div className="container">
        <div
          className="section-title"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <span className="sub-title green-color">Testimonials</span>
          <h2 className="nunito-font">
            Here’s what our amazing clients are saying
          </h2>
        </div>
        <div className="row m-0">
          <div className="col-lg-6 col-md-12 p-0">
            <div className="testimonials-img">
              <Image src={phoneCallImg} alt="testimonials-image" />
            </div>
          </div>
          <div className="col-lg-6 col-md-12 p-0">
            <div className="testimonials-content-style-two">
              {display ? (
                <OwlCarousel
                  className="testimonials-slides-two owl-carousel owl-theme"
                  {...options}
                >
                  <div className="single-testimonials-box">
                    <i className="flaticon-left-quote"></i>
                    <h5>“I never really lost it to begin with.”</h5>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Urna facilisi viverra felis eleifend ornare urna. Eu
                      mauris, velit volutpat massa volutpat. Risus pellentesque
                      felis nisl ut laoreet euismod vel, integer. Massa sodales
                      lorem nisi, sed massa volutpat.
                    </p>
                    <div className="info">
                      <h3>Lora Joly</h3>
                      <span>Founder at Envato</span>
                    </div>
                  </div>
                  <div className="single-testimonials-box">
                    <i className="flaticon-left-quote"></i>
                    <h5>“Every moment is a fresh beginning.”</h5>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Urna facilisi viverra felis eleifend ornare urna. Eu
                      mauris, velit volutpat massa volutpat. Risus pellentesque
                      felis nisl ut laoreet euismod vel, integer. Massa sodales
                      lorem nisi, sed massa volutpat.
                    </p>
                    <div className="info">
                      <h3>David Warner</h3>
                      <span>Founder at ThemeForest</span>
                    </div>
                  </div>
                  <div className="single-testimonials-box">
                    <i className="flaticon-left-quote"></i>
                    <h5>“Whatever you do, do it well. From now!”</h5>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Urna facilisi viverra felis eleifend ornare urna. Eu
                      mauris, velit volutpat massa volutpat. Risus pellentesque
                      felis nisl ut laoreet euismod vel, integer. Massa sodales
                      lorem nisi, sed massa volutpat.
                    </p>
                    <div className="info">
                      <h3>James Anderson</h3>
                      <span>Founder at EnvyTheme</span>
                    </div>
                  </div>

                  <div className="single-testimonials-box">
                    <i className="flaticon-left-quote"></i>
                    <h5>“Whatever you do, do it well. From now!”</h5>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Urna facilisi viverra felis eleifend ornare urna. Eu
                      mauris, velit volutpat massa volutpat. Risus pellentesque
                      felis nisl ut laoreet euismod vel, integer. Massa sodales
                      lorem nisi, sed massa volutpat.
                    </p>
                    <div className="info">
                      <h3>James MM</h3>
                      <span>Founder at HB</span>
                    </div>
                  </div>

                  <div className="single-testimonials-box">
                    <i className="flaticon-left-quote"></i>
                    <h5>“Whatever you do, do it well. From now!”</h5>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Urna facilisi viverra felis eleifend ornare urna. Eu
                      mauris, velit volutpat massa volutpat. Risus pellentesque
                      felis nisl ut laoreet euismod vel, integer. Massa sodales
                      lorem nisi, sed massa volutpat.
                    </p>
                    <div className="info">
                      <h3>Jisan HR</h3>
                      <span>Founder at HIBO</span>
                    </div>
                  </div>
                </OwlCarousel>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialFour;
