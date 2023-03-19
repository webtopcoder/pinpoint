import React from "react";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel3"));
import Image from "next/image";
import { apiBaseUrl } from "@/utils/baseUrl";
import userImg1 from "@/public/images/user/user1.jpg";
import userImg2 from "@/public/images/user/user2.jpg";
import userImg3 from "@/public/images/user/user3.jpg";
import userImg4 from "@/public/images/user/user4.jpg";
import {
  Image as Antimage,
} from "antd";

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

const Testimonial = ({ testimonials }) => {

  const imgurl = `${apiBaseUrl}/avatar/`;
  const [display, setDisplay] = React.useState(false);

  const myLoader = ({ src }) => {
    return src;
  };

  React.useEffect(() => {
    setDisplay(true);
  }, []);
  return (
    <div className="testimonials-area bg-black ptb-100">
      <div className="container">
        <div
          className="section-title white-color"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <span className="sub-title">PINPOINT RAVES</span>
          <h2 className="nunito-font">Pinpoint Shout Outs</h2>
        </div>
        {display ? (
          <OwlCarousel
            className="testimonials-slides-four owl-carousel owl-theme"
            {...options}
          >
            {testimonials?.map((testimonial, index) => (
              <div className="testimonials-item">
                <i className="flaticon-left-quotes-sign"></i>
                <p>
                  {testimonial?.content}
                </p>
                <div className="info">
                  <h3>{testimonial?.username}</h3>
                  <span>{testimonial?.occupation}</span>
                </div>
                <div className="img">
                  <Image loader={myLoader}
                    src={imgurl + "/" + testimonial?.files?.filepath}
                    layout="fill"
                    alt="user" />
                </div>
              </div>
            ))}
          </OwlCarousel>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Testimonial;
