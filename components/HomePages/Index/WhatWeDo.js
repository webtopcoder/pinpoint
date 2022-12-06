import React from "react";
import Link from "next/link";
import Image from "next/image";

import icon5 from "@/public/images/icon/icon5.png";
import icon6 from "@/public/images/icon/icon6.png";
import icon7 from "@/public/images/icon/icon7.png";
import icon8 from "@/public/images/icon/icon8.png";

const WhatWeDo = () => {
  return (
    <div className="what-we-do-area pt-100 pb-75">
      <div className="container">
        <div className="section-title">
          <span className="sub-title">What We Do</span>
          <h2>Our work is delivered by the best team in the world</h2>
        </div>
        <div className="row">
          <div
            className="col-lg-6 col-md-6 col-sm-6"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <div className="single-what-we-do-box">
              <div className="icon">
                <Image src={icon5} alt="icon" />
              </div>
              <h3>
                <Link href="/services/services-details">
                  <a>Incredible Infrastructure</a>
                </Link>
              </h3>
              <p>
                Lorem ipsum dolor sit amet, conse ctetur adipi scing elit sed
                est. Our work is delivered by the best team in the world.
              </p>
              <Link href="/services/services-details">
                <a className="link-btn">
                  Learn More <i className="bx bx-chevron-right"></i>
                </a>
              </Link>
            </div>
          </div>
          <div
            className="col-lg-6 col-md-6 col-sm-6"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="100"
          >
            <div className="single-what-we-do-box">
              <div className="icon">
                <Image src={icon6} alt="icon" />
              </div>
              <h3>
                <Link href="/services/services-details">
                  <a>Deadline Reminders</a>
                </Link>
              </h3>
              <p>
                Lorem ipsum dolor sit amet, conse ctetur adipi scing elit sed
                est. Our work is delivered by the best team in the world.
              </p>
              <Link href="/services/services-details">
                <a className="link-btn">
                  Learn More <i className="bx bx-chevron-right"></i>
                </a>
              </Link>
            </div>
          </div>
          <div
            className="col-lg-6 col-md-6 col-sm-6"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <div className="single-what-we-do-box">
              <div className="icon">
                <Image src={icon7} alt="icon" />
              </div>
              <h3>
                <Link href="/services/services-details">
                  <a>Information Retrieval</a>
                </Link>
              </h3>
              <p>
                Lorem ipsum dolor sit amet, conse ctetur adipi scing elit sed
                est. Our work is delivered by the best team in the world.
              </p>
              <Link href="/services/services-details">
                <a className="link-btn">
                  Learn More <i className="bx bx-chevron-right"></i>
                </a>
              </Link>
            </div>
          </div>
          <div
            className="col-lg-6 col-md-6 col-sm-6"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="100"
          >
            <div className="single-what-we-do-box">
              <div className="icon">
                <Image src={icon8} alt="icon" />
              </div>
              <h3>
                <Link href="/services/services-details">
                  <a>Simple Dashboard</a>
                </Link>
              </h3>
              <p>
                Lorem ipsum dolor sit amet, conse ctetur adipi scing elit sed
                est. Our work is delivered by the best team in the world.
              </p>
              <Link href="/services/services-details">
                <a className="link-btn">
                  Learn More <i className="bx bx-chevron-right"></i>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
