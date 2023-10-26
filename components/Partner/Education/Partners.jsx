import React from "react";
import Link from "next/link";
import Image from "next/image";
import teamImg1 from "@/public/images/partner/education_location1.png";
import teamImg2 from "@/public/images/partner/education_location2.png";
import teamImg3 from "@/public/images/partner/education_comingsoon.png";
import teamImg4 from "@/public/images/partner/education_comingsoon.png";
import teamImg5 from "@/public/images/partner/education_comingsoon.png";
import teamImg6 from "@/public/images/partner/education_comingsoon.png";
import earth from "@/public/images/partner/education_earth.png";
import shapeImg15 from "@/public/images/shape/shape15.png";
import shapeImg16 from "@/public/images/shape/shape16.png";

const Partners = () => {
  return (
    <div className="features-area ptb-100">
      <div className="container">
        <div className="section-title">
          <h2>
            <span style={{
              color: '#165593'
            }}>PIN</span><span style={{
              color: '#EC2226'
            }}>POINT</span> Partners
          </h2>
          <p
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="200"
          >
            Pinpoint is currently accepting Partnerships with the following businesses.
          </p>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-12">
            <div className="team-member-list">
              <ul>
                <li data-aos="zoom-in" data-aos-duration="1200">
                  <Image src={teamImg1} alt="member-image" />
                </li>
                <li
                  data-aos="fade-down"
                  data-aos-duration="1200"
                  data-aos-delay="100"
                >
                  <Image src={teamImg2} alt="member-image" />
                </li>
                <li
                  data-aos="fade-down"
                  data-aos-duration="1200"
                  data-aos-delay="200"
                >
                  <Image src={teamImg3} alt="member-image" />
                </li>
                <li
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  data-aos-delay="300"
                >
                  <Image src={teamImg4} alt="member-image" />
                </li>
                <li
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  data-aos-delay="400"
                >
                  <Image src={teamImg5} alt="member-image" />
                </li>
                <li
                  data-aos="fade-down"
                  data-aos-duration="1200"
                  data-aos-delay="500"
                >
                  <Image src={teamImg6} alt="member-image" />
                </li>
              </ul>
              <div className="bg-image">
                <Image src={earth} alt="bg-image" />
              </div>
              <div className="shape15">
                <Image src={shapeImg15} alt="shape" />
              </div>
              <div className="shape16">
                <Image src={shapeImg16} alt="shape" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
