import React from "react";
import Link from "next/link";
import Image from "next/image";

import logo from "@/public/images/logo.png";

const FooterSeven = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="template-footer-seven pt-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6">
            <div className="single-footer-widget">
              <Link href="/">
                <a className="logo">
                  <Image src={logo} alt="logo" />
                </a>
              </Link>

              <p>
                Lorem ipsum dolor sit amet, consectetur, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua minim.
              </p>

              <ul className="social-links">
                <li>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="flaticon-facebook-app-symbol"></i>
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
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="flaticon-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="flaticon-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <div className="single-footer-widget">
              <h3 className="nunito-font">Resources</h3>
              <ul className="quick-links">
                <li>
                  <Link href="/portfolio/portfolio-details">
                    <a>Business Startup</a>
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio/portfolio-details">
                    <a>Finance Consulting</a>
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio/portfolio-details">
                    <a>Wealth Management</a>
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio/portfolio-details">
                    <a>Business Planning</a>
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio/portfolio-details">
                    <a>Data Management</a>
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio/portfolio-details">
                    <a>Marketing Planning</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <div className="single-footer-widget">
              <h3 className="nunito-font">About Us</h3>
              <ul className="quick-links">
                <li>
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                <li>
                  <Link href="/about-us">
                    <a>About Us</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blogs/blog-grid">
                    <a>Latest News</a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <a>Contact Us</a>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy">
                    <a>Privacy Policy</a>
                  </Link>
                </li>
                <li>
                  <Link href="/terms-conditions">
                    <a>Terms & Condition</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="single-footer-widget">
              <h3 className="nunito-font">Contact Info</h3>
              <ul className="footer-contact-info">
                <li>
                  <i className="bx bx-phone-call"></i>
                  <span>Mon to Fri : 10:00AM - 06:00PM</span>
                  <a href="tel:1235421457852">+123 54214 578 52</a>
                </li>
                <li>
                  <i className="bx bx-envelope"></i>
                  <span>Do You Have a Question?</span>
                  <a href="mailto:hello@aveb.com">hello@aveb.com</a>
                </li>
                <li>
                  <i className="bx bx-map"></i>
                  <span>2750 Quadra Street Victoria, Canada</span>
                  <a href="#" target="_blank" rel="noreferrer">
                    Find Us on Map
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright-area">
        <div className="container">
          <p>
            Copyright &copy; {currentYear} Aveb. All Rights Reserved by{" "}
            <a href="https://envytheme.com/" target="_blank" rel="noreferrer">
              EnvyTheme
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterSeven;
