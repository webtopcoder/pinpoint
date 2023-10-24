import React from "react";
import Image from "next/image";
import AboutImg from "@/public/images/landing/aboutus.png";
import bannerHero1Desktop from "@/public/images/landing/hero_1.svg";
import bannerImgMobile from "@/public/images/landing/map-4-points.png";
import Link from "next/link";
import useMedia from "@/hooks/useMedia";

const Aboutus = () => {
  const isWebDevice = useMedia('(min-width:700px)');
  return (
    <div className="overview-area ptb-100">
      <div className="container">
        <div className="overview-item">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-12 overview-content">
              <h2>About <span style={{
                color: '#165593'
              }}>PIN</span><span style={{
                color: '#EC2226'
              }}>POINT</span>
              </h2>
              <h3>Discover the <span style={{
                color: '#165593'
              }}>FUTURE OF<br /> SOCIALIZING </span>
                ABOUT <span style={{
                  color: '#EC2226'
                }}>FOOD!</span>
              </h3>
              <p
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay="200"
              >
                Pinpoint is bringing local business to the communities fingertips. Whether you're craving some tacos or looking for your morning coffee fix, let Pinpoint swiftly guide you! With ease, our Interactive Map will locate the hidden gems you never knew existed. After your visit, don't forget to post about your experience to make your friends jealous!
              </p>
            </div>
            <div className="col-lg-7 col-md-12 overview-image style-two">
              <div className="img">
                <Image
                  src={AboutImg}
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  alt="overview-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
