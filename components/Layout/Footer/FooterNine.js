import React from "react";
import Link from "next/link";
import Image from "next/image";

import logo from "@/public/images/logo.png";

const FooterNine = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="template-footer-nine pt-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-5">
            <div className="single-footer-widget">
              <Link href="/">
                <a className="logo">
                  <Image src={logo} alt="logo" />
                </a>
              </Link>

              <p>
                Best solution for your it startup business, conectetur
                adipiscing elit. Scelerisque amet odio velit, auctor.
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

          <div className="col-lg-2 col-md-6 col-sm-3">
            <div className="single-footer-widget pl-2">
              <h3>Company</h3>
              <ul className="links-list">
                <li>
                  <Link href="/about-us">
                    <a>About Us</a>
                  </Link>
                </li>
                <li>
                  <Link href="/services">
                    <a>Core Services</a>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy">
                    <a>Refund Policy</a>
                  </Link>
                </li>
                <li>
                  <Link href="/faq">
                    <a>FAQ&apos;s</a>
                  </Link>
                </li>
                <li>
                  <Link href="/testimonials">
                    <a>Reviews</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 col-sm-4">
            <div className="single-footer-widget">
              <h3>Useful Links</h3>
              <ul className="links-list">
                <li>
                  <Link href="/privacy-policy">
                    <a>Privacy Policy</a>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy">
                    <a>Return Policy</a>
                  </Link>
                </li>
                <li>
                  <Link href="/terms-conditions">
                    <a>Terms & Conditions</a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <a>How It Works?</a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <a>Contact Us</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 col-sm-4">
            <div className="single-footer-widget">
              <h3>Support</h3>
              <ul className="links-list">
                <li>
                  <Link href="/services">
                    <a>Services</a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <a>Support</a>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy">
                    <a>Privacy Policy</a>
                  </Link>
                </li>
                <li>
                  <Link href="/faq">
                    <a>FAQ&apos;s</a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <a>Contact</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-8">
            <div className="single-footer-widget">
              <h3>Newsletter</h3>
              <p>Best solution for your it startup.</p>
              <form className="newsletter-form">
                <input
                  type="text"
                  className="input-newsletter"
                  placeholder="Enter your email address"
                  name="EMAIL"
                  required
                  autoComplete="off"
                />
                <button type="submit" className="btn-style-one red-light-color">
                  Subscribe Now <i className="bx bx-chevron-right"></i>
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="copyright-area">
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

export default FooterNine;
