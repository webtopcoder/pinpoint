import React from "react";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel3"));
import Image from "next/image";
import { apiBaseUrl } from "@/utils/baseUrl";

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

  console.log(testimonials)
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
            {/* {testimonials?.map((testimonial, index) => (
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
                  <Image
                    src={imgurl + "/" + testimonial?.image?.filepath}
                    layout="fill"
                    alt="user" />
                </div>
              </div>

            ))} */}
            {testimonials && testimonials[0] ? <div className="testimonials-item">
              <i className="flaticon-left-quotes-sign"></i>
              <p>
                {testimonials[0]?.content}
              </p>
              <div className="info">
                <h3>{testimonials[0]?.username}</h3>
                <span>{testimonials[0]?.occupation}</span>
              </div>
              <div className="img">
                <Image
                  src={imgurl + "/" + testimonials[0]?.image?.filepath}
                  layout="fill"
                  alt="user" />
              </div>
            </div> : ''}
            {testimonials && testimonials[1] ? <div className="testimonials-item">
              <i className="flaticon-left-quotes-sign"></i>
              <p>
                {testimonials[1]?.content}
              </p>
              <div className="info">
                <h3>{testimonials[1]?.username}</h3>
                <span>{testimonials[1]?.occupation}</span>
              </div>
              <div className="img">
                <Image
                  src={imgurl + "/" + testimonials[1]?.image?.filepath}
                  layout="fill"
                  alt="user" />
              </div>
            </div> : ''}
            { testimonials && testimonials[2] ? <div className="testimonials-item">
              <i className="flaticon-left-quotes-sign"></i>
              <p>
                {testimonials[2]?.content}
              </p>
              <div className="info">
                <h3>{testimonials[2]?.username}</h3>
                <span>{testimonials[2]?.occupation}</span>
              </div>
              <div className="img">
                <Image
                  src={imgurl + "/" + testimonials[2]?.image?.filepath}
                  layout="fill"
                  alt="user" />
              </div>
            </div> : ''}
            {testimonials && testimonials[3] ? <div className="testimonials-item">
              <i className="flaticon-left-quotes-sign"></i>
              <p>
                {testimonials[3]?.content}
              </p>
              <div className="info">
                <h3>{testimonials[3]?.username}</h3>
                <span>{testimonials[3]?.occupation}</span>
              </div>
              <div className="img">
                <Image
                  src={imgurl + "/" + testimonials[3]?.image?.filepath}
                  layout="fill"
                  alt="user" />
              </div>
            </div> : ''}
            { testimonials && testimonials[4] ? <div className="testimonials-item">
              <i className="flaticon-left-quotes-sign"></i>
              <p>
                {testimonials[4]?.content}
              </p>
              <div className="info">
                <h3>{testimonials[4]?.username}</h3>
                <span>{testimonials[4]?.occupation}</span>
              </div>
              <div className="img">
                <Image
                  src={imgurl + "/" + testimonials[4]?.image?.filepath}
                  layout="fill"
                  alt="user" />
              </div>
            </div> : ''}
            {testimonials && testimonials[5] ? <div className="testimonials-item">
              <i className="flaticon-left-quotes-sign"></i>
              <p>
                {testimonials[5]?.content}
              </p>
              <div className="info">
                <h3>{testimonials[5]?.username}</h3>
                <span>{testimonials[5]?.occupation}</span>
              </div>
              <div className="img">
                <Image
                  src={imgurl + "/" + testimonials[5]?.image?.filepath}
                  layout="fill"
                  alt="user" />
              </div>
            </div> : ''}
            {testimonials && testimonials[5] ? <div className="testimonials-item">
              <i className="flaticon-left-quotes-sign"></i>
              <p>
                {testimonials[5]?.content}
              </p>
              <div className="info">
                <h3>{testimonials[5]?.username}</h3>
                <span>{testimonials[5]?.occupation}</span>
              </div>
              <div className="img">
                <Image
                  src={imgurl + "/" + testimonials[5]?.image?.filepath}
                  layout="fill"
                  alt="user" />
              </div>
            </div> : ''}

          </OwlCarousel>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Testimonial;
