import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Link from "@/utils/ActiveLink";
import Image from "next/image";
import { Space, Badge } from 'antd';
import logo from "@/public/images/logo.png";
import mobilelogo from "@/public/images/logo-mobile.png";
import useMedia from "@/hooks/useMedia";
import ProfileMenu from "./ProfileMenu";
import NotificationDropdown from "./NotificationDropdown";
import MessageDropdown from "./MessageDropdown";
import classNames from "classnames";

const index = ({
  toggle,
  user_id,
  token,
  fullName,
  avatarImg,
  role,
  newNotification,
  additionRole,
  whiteMenu
}) => {

  const router = useRouter();
  const [menu, setMenu] = React.useState(true);
  const isWebDevice = useMedia('(min-width:700px)');
  const [isSticky, setIsSticky] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const toggleNavbar = () => {
    setMenu(!menu);
  };

  const handleOriginPageRender = (page) => {
    router.push(page);
    setMenu(true);
  };

  useEffect(() => {
    setMenu(true);
  }, [router.route]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos > 170 && currentScrollPos < prevScrollPos) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
      setPrevScrollPos(currentScrollPos);
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const classOne = menu
    ? "collapse navbar-collapse mean-menu"
    : "collapse navbar-collapse show";
  const classTwo = menu
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  return (
    <>
      <div id="navbar" className={classNames('navbar-area', 'navbar-style-two', { 'is-sticky': isSticky }, { 'bg-white': whiteMenu })}
      >
        <div className="main-nav">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link href="/">
                <a className="navbar-brand">
                  <Image src={isWebDevice ? logo : mobilelogo} alt="site logo" />
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
                  {
                    token ?
                      <li className="nav-item">
                        <Link href="/profile/mysocial" activeClassName="active">
                          <a className="nav-link"> Pinpoint Social</a>
                        </Link>
                      </li>
                      : ''
                  }
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
                    <>
                      <li className="nav-item mobile">
                        <hr style={{
                          color: '#fff'
                        }} />
                        <Space>

                          <Link href="/auth/login">
                            <a className="btn-style-one white-color">
                              Log In
                            </a>
                          </Link>
                          <Link href="/auth/signup">
                            <a className="btn-style-one white-color">
                              Sign Up
                            </a>
                          </Link>
                        </Space>
                      </li></>}

                </ul>
              </div>
              {token ? (
                <div className="others-option d-flex align-items-center">
                  <div className="info d-flex align-items-center">
                    <MessageDropdown />
                    <NotificationDropdown user_id={user_id} />
                    <ProfileMenu role={role} fullName={fullName} avatarImg={avatarImg} />
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
                      </a>
                    </Link>
                  </Space>
                </div>}
            </nav>
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

export default connect(mapStateToProps, undefined)(index);
