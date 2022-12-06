import React, { useState } from "react";
import Link from "@/utils/ActiveLink";
import Image from "next/image";

import logo from "@/public/images/logo.png";
import courseImg from "@/public/images/navbar.jpg";

const Navbar5 = () => {
  const [menu, setMenu] = React.useState(true);
  const toggleNavbar = () => {
    setMenu(!menu);
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
                    <Link href="#">
                      <a className="dropdown-toggle nav-link">Home</a>
                    </Link>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link href="/" activeClassName="active">
                          <a className="nav-link">IT Startup</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/business" activeClassName="active">
                          <a className="nav-link">Business</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/app" activeClassName="active">
                          <a className="nav-link">App</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/insurance" activeClassName="active">
                          <a className="nav-link">Insurance</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/property" activeClassName="active">
                          <a className="nav-link">Property</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/big-data" activeClassName="active">
                          <a className="nav-link">Big Data</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          href="/distance-learning"
                          activeClassName="active"
                        >
                          <a className="nav-link">Distance Learning</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/chatbot" activeClassName="active">
                          <a className="nav-link">Chatbot</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/software" activeClassName="active">
                          <a className="nav-link">Software</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/medical" activeClassName="active">
                          <a className="nav-link">Medical</a>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item megamenu">
                    <Link href="#">
                      <a className="dropdown-toggle nav-link">Features</a>
                    </Link>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <div className="container">
                          <div className="row">
                            <div className="col-12 col-sm-6 col-md-3 mtb-5">
                              <ul className="megamenu-submenu">
                                <li className="nav-item">
                                  <Link
                                    href="/services/services"
                                    activeClassName="active"
                                  >
                                    <a className="nav-link">
                                      Services Style 01
                                    </a>
                                  </Link>
                                </li>
                                <li className="nav-item">
                                  <Link
                                    href="/services/services-2"
                                    activeClassName="active"
                                  >
                                    <a className="nav-link">
                                      Services Style 02
                                    </a>
                                  </Link>
                                </li>
                                <li className="nav-item">
                                  <Link
                                    href="/services/services-3"
                                    activeClassName="active"
                                  >
                                    <a className="nav-link">
                                      Services Style 03
                                    </a>
                                  </Link>
                                </li>
                                <li className="nav-item">
                                  <Link
                                    href="/services/services-4"
                                    activeClassName="active"
                                  >
                                    <a className="nav-link">
                                      Services Style 04
                                    </a>
                                  </Link>
                                </li>
                                <li className="nav-item">
                                  <Link
                                    href="/services/services-details"
                                    activeClassName="active"
                                  >
                                    <a className="nav-link">Services Details</a>
                                  </Link>
                                </li>
                              </ul>
                            </div>

                            <div className="col-12 col-sm-6 col-md-3 mtb-5">
                              <ul className="megamenu-submenu">
                                <li className="nav-item">
                                  <Link
                                    href="/features"
                                    activeClassName="active"
                                  >
                                    <a className="nav-link">Features</a>
                                  </Link>
                                </li>
                                <li className="nav-item">
                                  <Link href="/team" activeClassName="active">
                                    <a className="nav-link">Team</a>
                                  </Link>
                                </li>
                                <li className="nav-item">
                                  <Link
                                    href="/pricing"
                                    activeClassName="active"
                                  >
                                    <a className="nav-link">Pricing</a>
                                  </Link>
                                </li>
                                <li className="nav-item">
                                  <Link
                                    href="/courses"
                                    activeClassName="active"
                                  >
                                    <a className="nav-link">Courses</a>
                                  </Link>
                                </li>
                                <li className="nav-item">
                                  <Link
                                    href="/courses/courses-details"
                                    activeClassName="active"
                                  >
                                    <a className="nav-link">Courses Details</a>
                                  </Link>
                                </li>
                              </ul>
                            </div>

                            <div className="col-12 col-sm-6 col-md-3 mtb-5">
                              <ul className="megamenu-submenu">
                                <li className="nav-item">
                                  <Link
                                    href="/blogs/blog-grid"
                                    activeClassName="active"
                                  >
                                    <a className="nav-link">Blog Grid</a>
                                  </Link>
                                </li>
                                <li className="nav-item">
                                  <Link
                                    href="/blogs/blog-left-sidebar"
                                    activeClassName="active"
                                  >
                                    <a className="nav-link">
                                      Blog Left Sidebar
                                    </a>
                                  </Link>
                                </li>
                                <li className="nav-item">
                                  <Link
                                    href="/blogs/blog-right-sidebar"
                                    activeClassName="active"
                                  >
                                    <a className="nav-link">
                                      Blog Right Sidebar
                                    </a>
                                  </Link>
                                </li>
                                <li className="nav-item">
                                  <Link
                                    href="/blogs/blog-special"
                                    activeClassName="active"
                                  >
                                    <a className="nav-link">Blog Special</a>
                                  </Link>
                                </li>
                                <li className="nav-item">
                                  <Link
                                    href="/blogs/blog-details"
                                    activeClassName="active"
                                  >
                                    <a className="nav-link">Blog Details</a>
                                  </Link>
                                </li>
                              </ul>
                            </div>

                            <div className="col-12 col-sm-6 col-md-3 mtb-5">
                              <Link href="/courses" activeClassName="active">
                                <a className="d-block p-0">
                                  <Image src={courseImg} alt="image" />
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link href="#" activeClassName="active">
                      <a className="dropdown-toggle nav-link">Pages</a>
                    </Link>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <a href="#" className="dropdown-toggle nav-link">
                          About Us
                        </a>
                        <ul className="dropdown-menu">
                          <li className="nav-item">
                            <Link href="/about-us" activeClassName="active">
                              <a className="nav-link">IT Startup</a>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link href="/about-us-2" activeClassName="active">
                              <a className="nav-link">Insurance</a>
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="nav-item">
                        <Link href="/team" activeClassName="active">
                          <a className="nav-link">Team</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/testimonials" activeClassName="active">
                          <a className="nav-link">Testimonials</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="dropdown-toggle nav-link">
                          Courses
                        </a>
                        <ul className="dropdown-menu">
                          <li className="nav-item">
                            <Link href="/courses" activeClassName="active">
                              <a className="nav-link">Courses</a>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              href="/courses/courses-details"
                              activeClassName="active"
                            >
                              <a className="nav-link">Courses Details</a>
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="nav-item">
                        <Link href="/pricing" activeClassName="active">
                          <a className="nav-link">Pricing</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/features" activeClassName="active">
                          <a className="nav-link">Features</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="dropdown-toggle nav-link">
                          Services
                        </a>
                        <ul className="dropdown-menu">
                          <li className="nav-item">
                            <Link
                              href="/services/services"
                              activeClassName="active"
                            >
                              <a className="nav-link">Services Style 01</a>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              href="/services/services-2"
                              activeClassName="active"
                            >
                              <a className="nav-link">Services Style 02</a>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              href="/services/services-3"
                              activeClassName="active"
                            >
                              <a className="nav-link">Services Style 03</a>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              href="/services/services-4"
                              activeClassName="active"
                            >
                              <a className="nav-link">Services Style 04</a>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              href="/services/services-details"
                              activeClassName="active"
                            >
                              <a className="nav-link">Services Details</a>
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="nav-item">
                        <Link href="/authentication" activeClassName="active">
                          <a className="nav-link">Login/Register</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/lost-password" activeClassName="active">
                          <a className="nav-link">Forgot Password</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/faq" activeClassName="active">
                          <a className="nav-link">FAQ</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/privacy-policy" activeClassName="active">
                          <a className="nav-link">Privacy Policy</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/terms-conditions" activeClassName="active">
                          <a className="nav-link">Terms & Conditions</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/coming-soon" activeClassName="active">
                          <a className="nav-link">Coming Soon</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/404" activeClassName="active">
                          <a className="nav-link">404 Error Page</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/thank-you" activeClassName="active">
                          <a className="nav-link">Thank You</a>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <a href="#" className="dropdown-toggle nav-link">
                      Portfolio
                    </a>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link
                          href="/portfolio/portfolio-1"
                          activeClassName="active"
                        >
                          <a className="nav-link">Classic Two Column</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          href="/portfolio/portfolio-2"
                          activeClassName="active"
                        >
                          <a className="nav-link">Modern Two Column</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          href="/portfolio/portfolio-details"
                          activeClassName="active"
                        >
                          <a className="nav-link">Portfolio Details</a>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <a href="#" className="dropdown-toggle nav-link">
                      Services
                    </a>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link
                          href="/services/services"
                          activeClassName="active"
                        >
                          <a className="nav-link">Services Style 01</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          href="/services/services-2"
                          activeClassName="active"
                        >
                          <a className="nav-link">Services Style 02</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          href="/services/services-3"
                          activeClassName="active"
                        >
                          <a className="nav-link">Services Style 03</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          href="/services/services-4"
                          activeClassName="active"
                        >
                          <a className="nav-link">Services Style 04</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          href="/services/services-details"
                          activeClassName="active"
                        >
                          <a className="nav-link">Services Details</a>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <a href="#" className="dropdown-toggle nav-link">
                      Blog
                    </a>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link href="/blogs/blog-grid" activeClassName="active">
                          <a className="nav-link">Blog Grid</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          href="/blogs/blog-left-sidebar"
                          activeClassName="active"
                        >
                          <a className="nav-link">Blog Left Sidebar</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          href="/blogs/blog-right-sidebar"
                          activeClassName="active"
                        >
                          <a className="nav-link">Blog Right Sidebar</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          href="/blogs/blog-special"
                          activeClassName="active"
                        >
                          <a className="nav-link">Blog Special</a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="dropdown-toggle nav-link">
                          Single Layouts
                        </a>
                        <ul className="dropdown-menu">
                          <li className="nav-item">
                            <Link
                              href="/blogs/blog-details"
                              activeClassName="active"
                            >
                              <a className="nav-link">Left Sidebar</a>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              href="/blogs/blog-details-2"
                              activeClassName="active"
                            >
                              <a className="nav-link">Right Sidebar</a>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              href="/blogs/blog-details-3"
                              activeClassName="active"
                            >
                              <a className="nav-link">No Sidebar</a>
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="dropdown-toggle nav-link">
                          Extra
                        </a>
                        <ul className="dropdown-menu">
                          <li className="nav-item">
                            <Link
                              href="/blogs/blog-author"
                              activeClassName="active"
                            >
                              <a className="nav-link">Author</a>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              href="/blogs/blog-categories"
                              activeClassName="active"
                            >
                              <a className="nav-link">Categories</a>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              href="/blogs/blog-tag"
                              activeClassName="active"
                            >
                              <a className="nav-link">Tag</a>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              href="/blogs/blog-search-result"
                              activeClassName="active"
                            >
                              <a className="nav-link">Search Result</a>
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link href="/contact" activeClassName="active">
                      <a className="nav-link">Contact</a>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="others-option d-flex align-items-center">
                <div className="contact-info">
                  <div>
                    <i className="flaticon-call"></i>
                    <a href="tel:+11234567890">+1 (123) 456 7890</a>
                  </div>
                  <div>
                    <i className="flaticon-email"></i>
                    <a href="mailto:hello@abev.com">hello@abev.com</a>
                  </div>
                </div>

                <div className="info d-flex align-items-center">
                  <div
                    className="search-icon"
                    onClick={handleToggleSearchModal}
                  >
                    <i className="flaticon-search-interface-symbol"></i>
                  </div>
                  <div>
                    <button type="button" onClick={handleToggleSidebarModal}>
                      <i className="flaticon-menu"></i>
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div
        className={`search-overlay ${
          isActiveSearchModal ? "" : "search-overlay-active"
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
        className={`sidebarModal modal right ${
          isActiveSidebarModal ? "" : "show"
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

export default Navbar5;
