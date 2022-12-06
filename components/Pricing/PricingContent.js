import React from "react";
import Link from "next/link";

const PricingContent = () => {
  return (
    <div className="pricing-area bg-f1f5fd pb-75">
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="col-lg-4 col-md-6"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <div className="single-pricing-box">
              <h3>Basic Team</h3>
              <p>Powerful & awesome elements</p>
              <div className="price">
                $29<span>/month</span>
              </div>
              <Link href="/contact">
                <a className="btn-style-one light-green-color">
                  Purchage Plan <i className="bx bx-chevron-right"></i>
                </a>
              </Link>
              <ul className="features-list">
                <li>
                  <i className="flaticon-draw-check-mark"></i>
                  Up to 10 Website
                </li>
                <li>
                  <i className="flaticon-draw-check-mark"></i>
                  Lifetime Free Support
                </li>
                <li>
                  <i className="flaticon-draw-check-mark"></i>
                  10 GB Dedicated Hosting Free
                </li>
                <li>
                  <i className="flaticon-draw-check-mark"></i>
                  24/7 Support
                </li>
                <li className="close">
                  <i className="flaticon-draw-check-mark"></i>
                  SEO Optimized
                </li>
                <li className="close">
                  <i className="flaticon-cancel"></i>
                  Live Support
                </li>
              </ul>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="100"
          >
            <div className="single-pricing-box">
              <h3>Small Team</h3>
              <p>Powerful & awesome elements</p>
              <div className="price">
                $49<span>/month</span>
              </div>
              <Link href="/contact">
                <a className="btn-style-one light-green-color">
                  Purchage Plan <i className="bx bx-chevron-right"></i>
                </a>
              </Link>
              <ul className="features-list">
                <li>
                  <i className="flaticon-draw-check-mark"></i>
                  Up to 10 Website
                </li>
                <li>
                  <i className="flaticon-draw-check-mark"></i>
                  Lifetime Free Support
                </li>
                <li>
                  <i className="flaticon-draw-check-mark"></i>
                  10 GB Dedicated Hosting Free
                </li>
                <li>
                  <i className="flaticon-draw-check-mark"></i>
                  24/7 Support
                </li>
                <li>
                  <i className="flaticon-draw-check-mark"></i>
                  SEO Optimized
                </li>
                <li className="close">
                  <i className="flaticon-cancel"></i>
                  Live Support
                </li>
              </ul>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="200"
          >
            <div className="single-pricing-box">
              <h3>Business Plan</h3>
              <p>Powerful & awesome elements</p>
              <div className="price">
                $69<span>/month</span>
              </div>
              <Link href="/contact">
                <a className="btn-style-one light-green-color">
                  Purchage Plan <i className="bx bx-chevron-right"></i>
                </a>
              </Link>
              <ul className="features-list">
                <li>
                  <i className="flaticon-draw-check-mark"></i>
                  Up to 80 Website
                </li>
                <li>
                  <i className="flaticon-draw-check-mark"></i>
                  Lifetime Free Support
                </li>
                <li>
                  <i className="flaticon-draw-check-mark"></i>
                  80 GB Dedicated Hosting Free
                </li>
                <li>
                  <i className="flaticon-draw-check-mark"></i>
                  24/7 Support
                </li>
                <li>
                  <i className="flaticon-draw-check-mark"></i>
                  SEO Optimized
                </li>
                <li>
                  <i className="flaticon-draw-check-mark"></i>
                  Live Support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingContent;
