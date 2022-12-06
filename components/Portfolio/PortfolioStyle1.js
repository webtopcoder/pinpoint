import React from "react";
import Link from "next/link";
import Image from "next/image";

import caseStudiesImg1 from "@/public/images/case-studies/case-studies1.jpg";
import caseStudiesImg2 from "@/public/images/case-studies/case-studies2.jpg";
import caseStudiesImg3 from "@/public/images/case-studies/case-studies3.jpg";
import caseStudiesImg4 from "@/public/images/case-studies/case-studies4.jpg";
import caseStudiesImg5 from "@/public/images/case-studies/case-studies5.jpg";
import caseStudiesImg6 from "@/public/images/case-studies/case-studies6.jpg";

const PortfolioStyle1 = () => {
  return (
    <>
      <div className="case-studies-area pb-100 bg-f1f5fd">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 col-md-6"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <div className="single-case-studies-box">
                <Link href="/portfolio/portfolio-details">
                  <a className="d-block image">
                    <Image src={caseStudiesImg1} alt="case-studies-image" />
                  </a>
                </Link>
                <div className="content">
                  <div className="icon">
                    <i className="flaticon-startup"></i>
                  </div>
                  <h3>
                    <Link href="/portfolio/portfolio-details">
                      <a>Business Startup</a>
                    </Link>
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consec tetur adipis cing elit.
                    Sed est non feugiat sagi ttis donec.
                  </p>
                  <Link href="/portfolio/portfolio-details">
                    <a className="link-btn">
                      Learn More <i className="bx bx-chevron-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="col-lg-6 col-md-6"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="100"
            >
              <div className="single-case-studies-box">
                <Link href="/portfolio/portfolio-details">
                  <a className="d-block image">
                    <Image src={caseStudiesImg2} alt="case-studies-image" />
                  </a>
                </Link>
                <div className="content">
                  <div className="icon">
                    <i className="flaticon-consulting"></i>
                  </div>
                  <h3>
                    <Link href="/portfolio/portfolio-details">
                      <a>Finance Consulting</a>
                    </Link>
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consec tetur adipis cing elit.
                    Sed est non feugiat sagi ttis donec.
                  </p>
                  <Link href="/portfolio/portfolio-details">
                    <a className="link-btn">
                      Learn More <i className="bx bx-chevron-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="col-lg-6 col-md-6"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <div className="single-case-studies-box">
                <Link href="/portfolio/portfolio-details">
                  <a className="d-block image">
                    <Image src={caseStudiesImg3} alt="case-studies-image" />
                  </a>
                </Link>
                <div className="content">
                  <div className="icon">
                    <i className="flaticon-personal-wealth"></i>
                  </div>
                  <h3>
                    <Link href="/portfolio/portfolio-details">
                      <a>Wealth Management</a>
                    </Link>
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consec tetur adipis cing elit.
                    Sed est non feugiat sagi ttis donec.
                  </p>
                  <Link href="/portfolio/portfolio-details">
                    <a className="link-btn">
                      Learn More <i className="bx bx-chevron-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="col-lg-6 col-md-6"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="100"
            >
              <div className="single-case-studies-box">
                <Link href="/portfolio/portfolio-details">
                  <a className="d-block image">
                    <Image src={caseStudiesImg4} alt="case-studies-image" />
                  </a>
                </Link>
                <div className="content">
                  <div className="icon">
                    <i className="flaticon-management"></i>
                  </div>
                  <h3>
                    <Link href="/portfolio/portfolio-details">
                      <a>Business Planning</a>
                    </Link>
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consec tetur adipis cing elit.
                    Sed est non feugiat sagi ttis donec.
                  </p>
                  <Link href="/portfolio/portfolio-details">
                    <a className="link-btn">
                      Learn More <i className="bx bx-chevron-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="col-lg-6 col-md-6"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <div className="single-case-studies-box">
                <Link href="/portfolio/portfolio-details">
                  <a className="d-block image">
                    <Image src={caseStudiesImg5} alt="case-studies-image" />
                  </a>
                </Link>
                <div className="content">
                  <div className="icon">
                    <i className="flaticon-data-management"></i>
                  </div>
                  <h3>
                    <Link href="/portfolio/portfolio-details">
                      <a>Data Management</a>
                    </Link>
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consec tetur adipis cing elit.
                    Sed est non feugiat sagi ttis donec.
                  </p>
                  <Link href="/portfolio/portfolio-details">
                    <a className="link-btn">
                      Learn More <i className="bx bx-chevron-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="col-lg-6 col-md-6"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="100"
            >
              <div className="single-case-studies-box">
                <Link href="/portfolio/portfolio-details">
                  <a className="d-block image">
                    <Image src={caseStudiesImg6} alt="case-studies-image" />
                  </a>
                </Link>
                <div className="content">
                  <div className="icon">
                    <i className="flaticon-consulting"></i>
                  </div>
                  <h3>
                    <Link href="/portfolio/portfolio-details">
                      <a>Marketing Planning</a>
                    </Link>
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consec tetur adipis cing elit.
                    Sed est non feugiat sagi ttis donec.
                  </p>
                  <Link href="/portfolio/portfolio-details">
                    <a className="link-btn">
                      Learn More <i className="bx bx-chevron-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="col-lg-12 col-md-12"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <div className="pagination-area">
                <div className="nav-links">
                  <Link href="/portfolio/portfolio-1">
                    <a className="prev page-numbers">prev</a>
                  </Link>
                  <span className="page-numbers current">1</span>
                  <Link href="/portfolio/portfolio-1">
                    <a className="page-numbers">2</a>
                  </Link>
                  <Link href="/portfolio/portfolio-1">
                    <a className="page-numbers">3</a>
                  </Link>
                  <Link href="/portfolio/portfolio-1">
                    <a className="next page-numbers">next</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioStyle1;
