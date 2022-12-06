import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel3"));

const options = {
  nav: true,
  margin: 25,
  loop: false,
  dots: false,
  autoplay: true,
  autoplayHoverPause: true,
  navText: [
    "<i class='flaticon-left-arrow'></i>",
    "<i class='flaticon-right-arrow'></i>",
  ],
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
      items: 2,
    },
  },
};

import resourcesImg1 from "@/public/images/resources/resources1.jpg";
import resourcesImg2 from "@/public/images/resources/resources2.jpg";
import resourcesImg3 from "@/public/images/resources/resources3.jpg";

const Resources = () => {
  const [display, setDisplay] = React.useState(false);

  React.useEffect(() => {
    setDisplay(true);
  }, []);
  return (
    <div className="resources-area pt-100 pb-75 bg-f9f9f9">
      <div className="container">
        <div
          className="section-title text-start"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <h2 className="nunito-font">Big data resources</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
            mauris amet.
          </p>
        </div>
        {display ? (
          <OwlCarousel
            className="resources-slides owl-carousel owl-theme"
            {...options}
          >
            <div className="single-resources-box">
              <Link href="/portfolio/portfolio-details">
                <a className="image d-block">
                  <Image src={resourcesImg1} alt="resources" />
                </a>
              </Link>
              <div className="content">
                <h3 className="nunito-font">
                  <Link href="/portfolio/portfolio-details">
                    <a>Free Data Sources For Your Next Project</a>
                  </Link>
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Consectetur mauris amet, placerat fames orci elementum
                  adipiscing consectetur sagittis.
                </p>
                <Link href="/portfolio/portfolio-details">
                  <a className="link-btn">
                    Learn More <i className="bx bx-chevron-right"></i>
                  </a>
                </Link>
              </div>
            </div>
            <div className="single-resources-box">
              <Link href="/portfolio/portfolio-details">
                <a className="image d-block">
                  <Image src={resourcesImg2} alt="resources" />
                </a>
              </Link>
              <div className="content">
                <h3 className="nunito-font">
                  <Link href="/portfolio/portfolio-details">
                    <a>Gaining New Insights from Data Lakes</a>
                  </Link>
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Consectetur mauris amet, placerat fames orci elementum
                  adipiscing consectetur sagittis.
                </p>
                <Link href="/portfolio/portfolio-details">
                  <a className="link-btn">
                    Learn More <i className="bx bx-chevron-right"></i>
                  </a>
                </Link>
              </div>
            </div>
            <div className="single-resources-box">
              <Link href="/portfolio/portfolio-details">
                <a className="image d-block">
                  <Image src={resourcesImg3} alt="resources" />
                </a>
              </Link>
              <div className="content">
                <h3 className="nunito-font">
                  <Link href="/portfolio/portfolio-details">
                    <a>Top 10 Data Resources Online in 2022</a>
                  </Link>
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Consectetur mauris amet, placerat fames orci elementum
                  adipiscing consectetur sagittis.
                </p>
                <Link href="/portfolio/portfolio-details">
                  <a className="link-btn">
                    Learn More <i className="bx bx-chevron-right"></i>
                  </a>
                </Link>
              </div>
            </div>
          </OwlCarousel>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Resources;
