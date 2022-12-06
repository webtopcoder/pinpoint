import React from "react";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel3"));
import Image from "next/image";

import partnerImg1 from "@/public/images/partner/partner1.png";
import partnerImg2 from "@/public/images/partner/partner2.png";
import partnerImg3 from "@/public/images/partner/partner3.png";
import partnerImg4 from "@/public/images/partner/partner4.png";
import partnerImg5 from "@/public/images/partner/partner5.png";

const options = {
  loop: false,
  nav: false,
  autoplay: true,
  autoplayHoverPause: true,
  mouseDrag: true,
  margin: 0,
  center: false,
  dots: false,
  smartSpeed: 1500,
  responsive: {
    0: {
      items: 3,
      margin: 30,
    },
    576: {
      items: 3,
      margin: 30,
    },
    768: {
      items: 5,
      margin: 30,
    },
  },
};

const PartnerStyle1 = () => {
  const [display, setDisplay] = React.useState(false);
  React.useEffect(() => {
    setDisplay(true);
  }, []);
  return (
    <div className="partner-area ptb-100">
      <div className="container">
        <div className="partner-slides">
          {display ? (
            <OwlCarousel
              className="partner-slides owl-carousel owl-theme"
              {...options}
            >
              <div className="partner-item">
                <Image src={partnerImg1} alt="partner-image" />
              </div>
              <div className="partner-item">
                <Image src={partnerImg2} alt="partner-image" />
              </div>
              <div className="partner-item">
                <Image src={partnerImg3} alt="partner-image" />
              </div>
              <div className="partner-item">
                <Image src={partnerImg4} alt="partner-image" />
              </div>
              <div className="partner-item">
                <Image src={partnerImg5} alt="partner-image" />
              </div>
              <div className="partner-item">
                <Image src={partnerImg1} alt="partner-image" />
              </div>
            </OwlCarousel>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerStyle1;
