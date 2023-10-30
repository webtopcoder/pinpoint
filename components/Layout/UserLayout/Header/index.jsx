import React, { useState } from "react";
import Link from "@/utils/ActiveLink";
import Image from "next/image";
import { Avatar, Badge, Space } from 'antd';
import logo from "@/public/images/logo.png";
import courseImg from "@/public/images/navbar.jpg";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import ProfileMenu from "./ProfileMenu";
import NotificationDropdown from "./NotificationDropdown";
import MessageDropdown from "./MessageDropdown";
import { logout } from "@/src/redux/User/actions";

const index = ({
  toggle,
  onLogout,
  user_id,
  token,
  fullName,
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
                  {token ? '' :
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
                          </a>
                        </Link>
                        {/* <div
                  className="search-icon"
                  onClick={handleToggleSearchModal}
                >
                  <i className="bx bxs-cart"></i>
                </div> */}
                      </Space>
                    </li>}
                </ul>
              </div>
              {token ? (
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
                    {/* <div
                      className="search-icon"
                      onClick={handleToggleSearchModal}
                    >
                      <Badge count={5} size="small">
                        <i className="flaticon-email-1"></i>
                      </Badge>
                    </div> */}
                    {/* <div
                      className="search-icon"
                      onClick={handleToggleSearchModal}
                    >
                      <i className="flaticon-bell"></i>
                    </div> */}
                    {/* <div
                               className="search-icon"
                               onClick={handleToggleSearchModal}
                             >
                               <i className="flaticon-search-interface-symbol"></i>
                             </div> */}
                    {/* <button type="button" onClick={handleToggleSidebarModal}>
                        <i className="flaticon-menu"></i>
                      </button> */}
                    <MessageDropdown />
                    <NotificationDropdown user_id={user_id} />
                    <ProfileMenu fullName={fullName} avatarImg={avatarImg} />
                  </div>
                </div>
              ) :
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

                </div>}

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
    fullName: state.profile.userinfo.name,
    newNotification: state.socket.newNotification,
    additionRole: state.user.additionRole,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLogout: (cb) => dispatch(logout(cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
