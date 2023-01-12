import React from "react";
import Link from "@/utils/ActiveLink";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import rightToggle from "@/public/images/landing/right-toggle.png";

const Header = ({
  toggle
}) => {
  const [menu, setMenu] = React.useState(true);
  const toggleNavbar = () => {
    setMenu(!menu);
  };

  const usertype = '';
  if (typeof window !== 'undefined') {
    usertype = sessionStorage.getItem('usertype')
  }

  React.useEffect(() => {
    let elementId = document.getElementById("navbar");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    });
  });

  const classOne = menu
    ? "collapse navbar-collapse mean-menu"
    : "collapse navbar-collapse show";
  const classTwo = menu
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  return (
    <div id="navbar" className="navbar-area">
      <div className="main-nav">
        <div className="container">

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="col-md-4">
            </div>
            <div className="col-md-4 text-center">
              <Link href="/">
                <a className="navbar-brand">
                  <Image src={logo} alt="site logo" />
                </a>
              </Link>
            </div>
            {usertype !== 'partner' ?
              <>
                <div className="col-md-4 text-right">
                  <div className="others-option">
                    <a onClick={toggle}>
                      <Image
                        src={rightToggle}
                        width={80}
                        height={80}
                        alt="site logo" />
                    </a>
                  </div>
                  <button
                    onClick={toggleNavbar}
                    className={classTwo}
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="icon-bar top-bar"></span>
                    <span className="icon-bar middle-bar"></span>
                    <span className="icon-bar bottom-bar"></span>
                  </button>
                </div>
              </> : ''}

          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
