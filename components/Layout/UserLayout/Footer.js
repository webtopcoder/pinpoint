import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "@/public/images/logo.png";
import useNotify from "@/hooks/useNotify";

const FooterNine = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const { notify } = useNotify();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  const handlePageRender = (page) => {
    if (token) {
      router.push(page);
    } else {
      notify("error", "Please login");
    }
  };

  const currentYear = new Date().getFullYear();
  return (
    <div className="template-footer-nine">
      <div className="container plr-100">
        <div className="row">
          <div className="col-lg-2 col-md-6 col-sm-5"></div>
          <div className="col-lg-8 col-md-6 col-sm-5">
            <div className="single-footer-widget">
              <Link href="/">
                <a className="logo">
                  <Image src={logo} width={500} height={150} alt="logo" />
                </a>
              </Link>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-5"></div>
        </div>
        <div className="row">
          {/* <div className="col-lg-4 col-md-6 col-sm-5">
            <div className="single-footer-widget">
              <p>Stay up to date with Pinpoint!</p>
              <div className="widget-area">
                <div className="widget widget_search">
                  <form className="search-form">
                    <input
                      type="search"
                      className="search-field"
                      placeholder="Enter your email"
                    />
                    <button type="submit">
                      <i className="bx bx-send"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div> */}
          <div className="col-lg-6 col-md-6 col-sm-5">
            <div className="single-footer-widget">
              <p>Stay social with us...</p>

              <ul className="social-links">
                <li>
                  <a
                    href="https://www.instagram.com/thepinpointsocial"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="flaticon-instagram"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.snapchat.com/add/pinpointsocial?share_id=lmgsWMD_i3s&locale=en-US"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="flaticon-snapchat"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.twitter.com/_PinpointSocial"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="flaticon-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=100090254892269"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="flaticon-facebook-app-symbol"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-8">
            <div className="single-footer-widget">
              <button
                onClick={() => handlePageRender("/user/map/interactive-map")}
                className="btn-style-one red-light-color view-map-button"
              >
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
