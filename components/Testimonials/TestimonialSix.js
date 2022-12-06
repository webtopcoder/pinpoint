import React from "react";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel3"));
import Image from "next/image";

import userImg1 from "@/public/images/user/user1.jpg";
import userImg2 from "@/public/images/user/user2.jpg";
import userImg3 from "@/public/images/user/user3.jpg";
import userImg4 from "@/public/images/user/user4.jpg";

const options = {
  margin: 25,
  nav: false,
  loop: true,
  dots: true,
  autoplay: true,
  animateIn: "fadeIn",
  animateOut: "fadeOut",
  mouseDrag: false,
  autoplayHoverPause: true,
  navText: ["<i class='ph-caret-left'></i>", "<i class='ph-caret-right'></i>"],
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 1,
    },
    768: {
      items: 2,
    },
    992: {
      items: 2,
    },
    1200: {
      items: 3,
    },
  },
};

const TestimonialSix = () => {
  const [display, setDisplay] = React.useState(false);

  React.useEffect(() => {
    setDisplay(true);
  }, []);
  return (
    <div className="testimonials-area bg-263238 ptb-100">
      <div className="container">
        <div
          className="section-title white-color"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <span className="sub-title">Testimonials</span>
          <h2 className="nunito-font">
            Here’s what our amazing Students are saying
          </h2>
        </div>
        {display ? (
          <OwlCarousel
            className="testimonials-slides-four owl-carousel owl-theme"
            {...options}
          >
            <div className="testimonials-item">
              <i className="flaticon-left-quotes-sign"></i>
              <p>
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna
                facilisi viverra felis eleifend ornare urna. Eu mauris, velit
                volutpat massa volutpat. Risus pellentesque felis nisl ut
                laoreet euismod vel”
              </p>
              <div className="info">
                <h3>Lora Joly</h3>
                <span>Founder at Envato</span>
              </div>
              <div className="img">
                <Image src={userImg1} alt="user" />
              </div>
            </div>
            <div className="testimonials-item">
              <i className="flaticon-left-quotes-sign"></i>
              <p>
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna
                facilisi viverra felis eleifend ornare urna. Eu mauris, velit
                volutpat massa volutpat. Risus pellentesque felis nisl ut
                laoreet euismod vel”
              </p>
              <div className="info">
                <h3>Alina Smith</h3>
                <span>Founder at EnvyTheme</span>
              </div>
              <div className="img">
                <Image src={userImg2} alt="user" />
              </div>
            </div>
            <div className="testimonials-item">
              <i className="flaticon-left-quotes-sign"></i>
              <p>
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna
                facilisi viverra felis eleifend ornare urna. Eu mauris, velit
                volutpat massa volutpat. Risus pellentesque felis nisl ut
                laoreet euismod vel”
              </p>
              <div className="info">
                <h3>James Andy</h3>
                <span>Founder at ThemeForest</span>
              </div>
              <div className="img">
                <Image src={userImg3} alt="user" />
              </div>
            </div>
            <div className="testimonials-item">
              <i className="flaticon-left-quotes-sign"></i>
              <p>
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna
                facilisi viverra felis eleifend ornare urna. Eu mauris, velit
                volutpat massa volutpat. Risus pellentesque felis nisl ut
                laoreet euismod vel”
              </p>
              <div className="info">
                <h3>David Warner</h3>
                <span>Founder at Code</span>
              </div>
              <div className="img">
                <Image src={userImg4} alt="user" />
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

export default TestimonialSix;
