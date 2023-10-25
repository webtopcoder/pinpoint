import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel3"));
import Image from "next/image";
import manWithLaptop from "@/public/images/landing/man-with-laptop.png";
import { userService } from "@/services/index";

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
  navText: [
    "<i className='ph-caret-left'></i>",
    "<i className='ph-caret-right'></i>",
  ],
};

const Testimonial = () => {
  const [testimonials, setTestimonial] = useState();
  useEffect(async () => {
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

  return (
    <div className="testimonials-area bg-f3feff ptb-100">
      <div className="container">

        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12">
            <div
              className="testimonials-image"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <Image src={manWithLaptop} alt="testimonials-image" />
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="section-title" style={{
              textAlign: 'left',
              marginLeft: 0
            }}>
              <h2 className="nunito-font">
                <span style={{
                  color: '#165593'
                }}>PIN</span><span style={{
                  color: '#EC2226'
                }}>POINT</span> Fans
              </h2>
            </div>
            <div className="testimonials-content">
              {testimonials?.length > 0 ? (
                <OwlCarousel
                  className="testimonials-slides-two owl-carousel owl-theme"
                  {...options}
                >
                  {testimonials?.map((testimonial, index) => (
                    <div className="single-testimonials-box">
                      <i className="flaticon-left-quote"></i>
                      {/* <h5> "{testimonial?.content}"</h5> */}
                      <p>
                        {testimonial?.content}
                      </p>
                      <div className="info">
                        <h3>{testimonial?.username}</h3>
                        <span>{testimonial?.occupation}</span>
                      </div>
                    </div>
                  ))}
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

export default Testimonial;
