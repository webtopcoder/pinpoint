import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "@/public/images/logo.png";
import useNotify from "@/hooks/useNotify";
import useMedia from "@/hooks/useMedia";
import shapeImg from "@/public/images/landing/shape5.png";
import leftfooterImg from "@/public/images/landing/left-footer.svg";
import rightfooterImg from "@/public/images/landing/right-footer.svg";

const FooterNine = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');

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
    <div className="template-footer-six bg-175594 pt-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6">
            <div className="single-footer-widget">
              <Image src={leftfooterImg} alt="leftfooterImg" />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
          <div className="auth-space"></div>
            <div className="single-footer-widget">
              <Link href="/">
                <a className="logo">
                  <Image src={logo} alt="logo" />
                </a>
              </Link>
              <p>
                Pinpoint is bringing local business to the communities fingertips.
              </p>

              <ul className="social-links">
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=100090254892269"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="flaticon-facebook-app-symbol"></i>
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
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 desktop">
            <div className="single-footer-widget">
              <Image src={rightfooterImg} alt="rightfooterImg" />
            </div>
          </div>
        </div>
      </div>

      <div className="copyright-area">
        <div className="container">
          <p>
            Copyright &copy; {currentYear} THEPINPOINTSOCIAL. All Rights Reserved.
          </p>
        </div>
      </div>

      <div className="shape5">
        <Image src={shapeImg} alt="shape" />
      </div>
    </div>
  );
};

export default FooterNine;
