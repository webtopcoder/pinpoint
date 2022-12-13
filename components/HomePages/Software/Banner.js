import React from "react";
import Link from "next/link";
import Image from "next/image";

import bannerImg from "@/public/images/banner/banner.png";

const Banner = () => {
  return (
    <div className="software-banner-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="software-banner-content">
              <h1>Finding YOUR<br /> favorite <u>Business</u><br /> <u>on Wheels</u> has<br /> never been <br />easier!</h1>
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="banner-background"></div>
            <div className="software-banner-image" data-aos="fade-up">
              <div><Image src={bannerImg} alt="banner-image" /></div>
            </div>
          </div>

        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 col-md-12 banner-sub-description">
            <p style={{
              fontSize: 26,
              color: "#2F2F2FBF",
              lineHeight: 1.5
            }}>
              No more going down the Google black hole<br /> when it comes to finding your favorite Food<br /> Truck, Farmers Markets or other mobile<br /> businesses.. Pinpoint will bring your favorites to<br /> your front door!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
