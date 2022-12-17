import React from "react";
import Link from "next/link";
import Image from "next/image";

import logo from "@/public/images/logo.png";

const FooterNine = () => {
  return (
    <div className="template-footer-nine">
      <div className="container plr-100">
        <div className="row">
          <div className="col-lg-2 col-md-6 col-sm-5">
          </div>
          <div className="col-lg-8 col-md-6 col-sm-5">
            <div className="single-footer-widget">
              <Link href="/">
                <a className="logo">
                  <Image src={logo} width={600} height={150} alt="logo" />
                </a>
              </Link>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-5">
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-5">
            <div className="single-footer-widget">
              <p>
                Stay up to date with Pinpoint!
              </p>

              <div className="input-group mb-3">

                <input
                  type="text"
                  className="input-newsletter"
                  placeholder="Enter your email address"
                  name="EMAIL"
                  required
                  autoComplete="off"
                />
                <div className="input-group-append">

                  <button className="btn btn-outline-secondary" style={{
                    backgroundColor: 'red',
                    color: 'black'
                  }} type="button"><i className="bx bx-right-arrow-alt" style={{
                    fontSize: 41
                  }}></i></button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-5">
            <div className="single-footer-widget">
              <p>
                Stay social with us...
              </p>

              <ul className="social-links">
                <li>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="flaticon-instagram"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="flaticon-snapchat"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.twitter.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="flaticon-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="flaticon-facebook-app-symbol"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-8">
            <div className="single-footer-widget">
              <button type="submit" className="btn-style-one red-light-color view-map-button">
                View Map<i className="bx bx-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterNine;
