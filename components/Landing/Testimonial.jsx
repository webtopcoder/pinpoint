import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel3"));
import Image from "next/image";
import { userService } from "@/services/index";
import { apiBaseUrl } from "@/utils/baseUrl";
import useNotify from "@/hooks/useNotify";

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

const Testimonial = () => {

  const imgurl = `${apiBaseUrl}/avatar/`;
  const [testimonials, setTestimonial] = useState();
  const [display, setDisplay] = React.useState(false);
  const { notify } = useNotify();

  useEffect(async () => {
    setDisplay(true);
    await userService.getTestimonials()
      .then((res) => {
        setTestimonial(res?.data)
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }, []);

  const myLoader = ({ src }) => {
    return src;
  };

  return (
    <div className="testimonials-area bg-175594 ptb-100">
      <div className="container">
        <div
          className="section-title white-color"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          {/* <span className="sub-title">PINPOINT RAVES</span> */}
          {/* <h2 className="nunito-font">Pinpoint Shout Outs</h2> */}
          <h2 className="nunito-font">
            <span style={{
              color: '#165593'
            }}>PIN</span><span style={{
              color: '#EC2226'
            }}>POINT</span> Fans
          </h2>
        </div>
        {testimonials?.length > 0 && display ? (
          <OwlCarousel
            className="testimonials-slides-four owl-carousel owl-theme"
            {...options}
          >
            {testimonials?.map((testimonial, index) => (
              <div className="testimonials-item" key={index}>
                <i className="flaticon-left-quotes-sign"></i>
                <p>
                  {testimonial?.content}
                </p>
                <div className="info">
                  <h3>{testimonial?.username}</h3>
                  <span>{testimonial?.occupation}</span>
                </div>
                <div className="img">
                  <Image
                    src={imgurl + "/" + testimonial?.image?.filepath}
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