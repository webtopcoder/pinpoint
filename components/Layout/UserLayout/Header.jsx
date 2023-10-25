import React, { useState } from "react";
import Link from "@/utils/ActiveLink";
import Image from "next/image";
import { Avatar, Badge, Space } from 'antd';
import logo from "@/public/images/logo.png";
import courseImg from "@/public/images/navbar.jpg";
import { connect } from "react-redux";
import { useRouter } from "next/router";

const Navbar5 = ({
  toggle,
  onLogout,
  user_id,
  token,
  avatarImg,
  role,
  newNotification,
  additionRole
}) => {

  const router = useRouter();
  const [menu, setMenu] = React.useState(true);
  const toggleNavbar = () => {
    setMenu(!menu);
  };

  const handleOriginPageRender = (page) => {
    router.push(page);
  };

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

  // Search Modal
  const [isActiveSearchModal, setActiveSearchModal] = useState("false");
  const handleToggleSearchModal = () => {
    setActiveSearchModal(!isActiveSearchModal);
  };

  // Sidebar Modal
  const [isActiveSidebarModal, setActiveSidebarModal] = useState("false");
  const handleToggleSidebarModal = () => {
    setActiveSidebarModal(!isActiveSidebarModal);
  };

  return (
    <>
      <div id="navbar" className="navbar-area navbar-style-two">
        <div className="main-nav">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link href="/">
                <a className="navbar-brand">
                  <Image src={logo} alt="site logo" />
                </a>
              </Link>
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

              <div className={classOne} id="navbarSupportedContent">

                <ul className="navbar-nav">

                  <li className="nav-item">
                    <Link href="/">
                      <a className="nav-link">Home</a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link href="#">
                      <a className="nav-link">Interactive Map</a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <a role="button" onClick={() =>
                      handleOriginPageRender("/#pinpoint_contactus")
                    } className="nav-link">
                      Contact Us
                    </a>
                  </li>


                  <li className="nav-item">
                    <Link href="/faq" activeClassName="active">
                      <a className="nav-link">FAQ</a>
                    </Link>
                  </li>
                  <li className="nav-item mobile">
                    <Space>
                      <Link href="/auth/login">
                        <a className="btn-style-one blue-dark-color">
                          Log In
                        </a>
                      </Link>
                      <Link href="/auth/signup">
                        <a className="btn-style-one white-color">
                          Sign Up
                          {/* <i className="bx bx-chevron-right"></i> */}
                        </a>
                      </Link>
                      {/* <div
                    className="search-icon"
                    onClick={handleToggleSearchModal}
                  >
                    <i className="bx bxs-cart"></i>
                  </div> */}
                    </Space>
                  </li>
                </ul>
              </div>

              {token && (
                <div className="others-option d-flex align-items-center">
                  {/* <div className="contact-info">
                             <div>
                               <i className="flaticon-call"></i>
                               <a href="tel:+11234567890">+1 (123) 456 7890</a>
                             </div>
                             <div>
                               <i className="flaticon-email"></i>
                               <a href="mailto:hello@abev.com">hello@abev.com</a>
                             </div>
                           </div> */}
                  <div className="info d-flex align-items-center">
                    <div
                      className="search-icon"
                      onClick={handleToggleSearchModal}
                    >
                      <Badge count={5} size="small">
                        <i className="flaticon-email-1"></i>
                      </Badge>
                    </div>
                    <div
                      className="search-icon"
                      onClick={handleToggleSearchModal}
                    >
                      <i className="flaticon-bell"></i>
                    </div>
                    {/* <div
                               className="search-icon"
                               onClick={handleToggleSearchModal}
                             >
                               <i className="flaticon-search-interface-symbol"></i>
                             </div> */}
                    <div>
                      <button type="button" onClick={handleToggleSidebarModal}>
                        <i className="flaticon-menu"></i>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="others-option desktop">
                <Space>
                  <Link href="/auth/login">
                    <a className="btn-style-one blue-dark-color">
                      Log In
                    </a>
                  </Link>
                  <Link href="/auth/signup">
                    <a className="btn-style-one white-color">
                      Sign Up
                      {/* <i className="bx bx-chevron-right"></i> */}
                    </a>
                  </Link>
                  {/* <div
                    className="search-icon"
                    onClick={handleToggleSearchModal}
                  >
                    <i className="bx bxs-cart"></i>
                  </div> */}
                </Space>

              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div
        className={`search-overlay ${isActiveSearchModal ? "" : "search-overlay-active"
          }`}
      >
        <div className="d-table">
          <div className="d-table-cell">
            <div className="search-overlay-layer"></div>
            <div className="search-overlay-layer"></div>
            <div className="search-overlay-layer"></div>
            <div
              className="search-overlay-close"
              onClick={handleToggleSearchModal}
            >
              <span className="search-overlay-close-line"></span>
              <span className="search-overlay-close-line"></span>
            </div>

            <div className="search-overlay-form">
              <form>
                <input
                  type="text"
                  className="input-search"
                  placeholder="Enter your keywords..."
                />
                <button type="submit">
                  <i className="flaticon-search-interface-symbol"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Modal */}
      <div
        className={`sidebarModal modal right ${isActiveSidebarModal ? "" : "show"
          }`}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <button
              type="button"
              className="close"
              onClick={handleToggleSidebarModal}
            >
              <i className="flaticon-cancel"></i>
            </button>

            <div className="modal-body">
              <div className="logo">
                <Link href="/">
                  <a className="d-inline-block">
                    <Image src={logo} alt="image" />
                  </a>
                </Link>
              </div>

              <ul className="sidebar-contact-info">
                <li>
                  <i className="bx bx-phone-call"></i>
                  <span>Mon to Fri : 10:00AM - 06:00PM</span>
                  <a href="tel:1235421457852">+123 54214 578 52</a>
                </li>
                <li>
                  <i className="bx bx-envelope"></i>
                  <span>Do You Have a Question?</span>
                  <a href="mailto:hello@abev.com">hello@abev.com</a>
                </li>
                <li>
                  <i className="bx bx-map"></i>
                  <span>2750 Quadra Street Victoria, Canada</span>
                  <a href="#" target="_blank" rel="noreferrer">
                    Find Us on Map
                  </a>
                </li>
              </ul>

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

              <div className="box">
                <p>Latest resources, sent to your inbox weekly</p>
                <form className="newsletter-form">
                  <input
                    type="text"
                    className="input-newsletter"
                    placeholder="Enter your email address"
                  />
                  <button type="submit" className="btn-style-one green-color">
                    Subscribe Now <i className="bx bx-chevron-right"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


const mapStateToProps = (state) => {
  return {
    ...state.Layout,
    token: state.user.token,
    user_id: state.user.user_id,
    role: state.user.role,
    avatarImg: state.user.avatar,
    newNotification: state.socket.newNotification,
    additionRole: state.user.additionRole,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLogout: (cb) => dispatch(logout(cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar5);
