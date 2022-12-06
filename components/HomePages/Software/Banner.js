import React from "react";
import Link from "next/link";
import Image from "next/image";

import bannerImg from "@/public/images/banner/banner.png";

const Banner = () => {
  return (
    <div className="software-banner-area">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12">
            <div className="software-banner-content">
              <span className="sub-title">Get your 14 days free trail</span>
              <h1>Manage All of Your Stuff Using a Abev</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
                tincidunt eifend odio viverra diam aliquet donec again.
              </p>
              <Link href="/contact">
                <a className="btn-style-one red-light-color"> 
                  Get Started Now <i className="bx bx-chevron-right"></i>
                </a>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="software-banner-image" data-aos="fade-up">
              <Image src={bannerImg} alt="banner-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
