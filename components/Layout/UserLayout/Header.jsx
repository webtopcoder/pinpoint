import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge, Popconfirm, Button, Avatar, Divider, List, Space } from "antd";
import {
  ExportOutlined,
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
  MailFilled,
  NotificationFilled,
  EnvironmentFilled
} from "@ant-design/icons";
import { useRouter } from "next/router";
import mobilelogo from "@/public/images/mobilelogo.png";
import logo from "@/public/images/logo.png";
import { connect } from "react-redux";
import rightToggle from "@/public/images/landing/right-toggle.png";
import useNotify from "@/hooks/useNotify";
import { getNotifications, logout } from "@/src/redux/User/actions";
import { getIsReadEmails } from "@/src/redux/Mail/actions";
import { apiBaseUrl } from "@/utils/baseUrl";
import NotificationDrawer from "@/components/Profile/NotificationDrawer";

const Header = ({
  toggle,
  onLogout,
  user_id,
  token,
  avatarImg,
  onGetNotifications,
  notifications,
  notificationCount,
  role,
  onGetIsReadEmails,
  isReadEmails,
  newNotification,
  additionRole
}) => {

  const router = useRouter();
  const [menu, setMenu] = React.useState(true);
  const toggleNavbar = () => {
    setMenu(!menu);
  };
  const avatarurl = `${apiBaseUrl}/avatar/`;

  const { notify } = useNotify();

  const onLogoutHandler = () => {
    onLogout(() => {
      router.push("/home");
    });
  };

  const SignupOrLogin = (path) => {
    router.push(path);
  };


  const handlePageRender = (page) => {
    if (token) {
      router.push(page);
    } else {
      notify("error", "Please login");
    }
  };

  const handleOriginPageRender = (page) => {
    router.push(page);
  };

  const [initLoading, setInitLoading] = useState(true);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [notificationDrawerOpen, setOpen] = useState(false);
  const [notificationPage, setNotificationPage] = useState(1);

  useEffect(() => {
    onGetNotifications(
      {
        sort: "createdAt:asc",
        page: notificationPage,
      },
      () => {
        setInitLoading(false);
      }
    );
  }, [notificationPage]);

  useEffect(() => {
    setMenu(true);
    onGetIsReadEmails();
  }, [router.pathname]);

  const onLoadMore = () => {
    setNotificationLoading(true);

    if (notificationCount / 10 > notificationPage) {
      setNotificationPage(notificationPage + 1);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const loadMore =
    !initLoading && !notificationLoading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>Load More</Button>
      </div>
    ) : null;

  const hasWindow = typeof window !== "undefined";

  React.useEffect(() => {
    let elementId = document.getElementById("navbar");
    if (hasWindow) {
      document.addEventListener("scroll", () => {
        if (window.scrollY > 170) {
          elementId.classList.add("is-sticky");
        } else {
          elementId.classList.remove("is-sticky");
        }
      });
    }
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
            <div className="col-md-4 desktop"></div>
            <div className="col-md-4 text-center desktop">
              <Link href="/">
                <a className="navbar-brand">
                  <Image src={logo} alt="site logo" />
                </a>
              </Link>
            </div>
            {role !== "partner" ? (
              <div className="col-md-4 text-right desktop">
                <div className="others-option">
                  <a onClick={toggle}>
                    <Image
                      src={rightToggle}
                      width={80}
                      height={80}
                      alt="site logo"
                    />
                  </a>
                </div>
              </div>
            ) : (
              ""
            )}
            <div
              className="mobile"
              style={{
                width: "100%",
              }}
            >
              <Link href="/">
                <a className="navbar-brand">
                  <Image src={mobilelogo} alt="site logo" />
                </a>
              </Link>
              <div
                className={classOne}
                style={{
                  textAlign: "center",
                }}
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <div className="avatar-panel">
                      <div className="avatar-left">
                        {token && (
                          <div style={{ marginBottom: 20 }}>
                            {additionRole === "" || additionRole === "Owner" ?
                              <Link href={role === "partner" ? `/partner/message` : "/user/message"}>
                                <a>
                                  <Badge dot={isReadEmails.length > 0 ? true : false}
                                    className="mailboxLIcon">
                                    <MailFilled
                                      style={{ color: "#686868", fontSize: 40 }}
                                    />
                                  </Badge>
                                </a>
                              </Link> : ''}
                          </div>
                        )}
                        {token && (
                          <div>
                            <Badge
                              dot={
                                newNotification || notifications.length > 0 ? true : false
                              } className="mailboxIcon"
                              onClick={showDrawer}
                            >
                              <NotificationFilled
                                style={{ color: "#686868", fontSize: 40 }}
                              />
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="avatar-center">
                        <div className="rightsidebar-avatar">
                          {avatarImg ? (
                            <Avatar
                              style={{
                                border: "3px solid gray",
                              }}
                              size={140}
                              src={avatarurl + avatarImg}
                            />
                          ) : (
                            <Avatar
                              style={{
                                border: "3px solid gray",
                              }}
                              size={100}
                              icon={<UserOutlined />}
                            />
                          )}
                        </div>
                      </div>
                      <div className="avatar-left">
                        {token && (
                          <div style={{ marginBottom: 20 }}>
                            <EnvironmentFilled
                              style={{ color: "#686868", fontSize: 40 }}
                              onClick={() => handlePageRender("/user/map/interactive-map")}
                            />
                          </div>
                        )}
                        {token && (
                          <div style={{ marginBottom: 20 }}>
                            <ExportOutlined
                              style={{ color: "#686868", fontSize: 40 }}
                              onClick={() => onLogoutHandler()}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {!token && (
                      <div className="login-btn-panel">
                        <div className="login-btn">
                          <Popconfirm
                            style={{ position: "fixed" }}
                            title="WHO AM I?"
                            description="Who are you?"
                            okText="User"
                            cancelText="Partner"
                            onCancel={() =>
                              SignupOrLogin("/authentication/partner/login")
                            }
                            onConfirm={() =>
                              SignupOrLogin("/authentication/user/login")
                            }
                          >
                            <a href="#">
                              <Button
                                shape="round"
                                style={{ width: 100 }}
                                icon={<LoginOutlined />}
                              >
                                Login
                              </Button>
                            </a>
                          </Popconfirm>
                        </div>
                        <div className="signup-btn">
                          <Popconfirm
                            title="WHO AM I?"
                            description="Who are you?"
                            okText="User"
                            cancelText="Partner"
                            onCancel={() =>
                              SignupOrLogin("/authentication/partner/register")
                            }
                            onConfirm={() =>
                              SignupOrLogin("/authentication/user/register")
                            }
                          >
                            <a href="#">
                              <Button
                                shape="round"
                                style={{ width: 100 }}
                                icon={<UserAddOutlined />}
                              >
                                Sign Up
                              </Button>
                            </a>
                          </Popconfirm>
                        </div>
                      </div>
                    )}
                    {token && (
                      <Space className="vst-profile" wrap>
                        <Button
                          onClick={() =>
                            handleOriginPageRender(
                              `/profile/${user_id}/activity`
                            )
                          }
                          type="primary">View Profile</Button>

                        {additionRole === "" || additionRole === "Owner" ?
                          <Button
                            onClick={() =>
                              handleOriginPageRender(`/profile/${user_id}/edit`)
                            }
                          >Edit Profile</Button> : ''}

                      </Space>
                    )}
                  </li>
                  <Divider />

                  {token && role == "partner" ?
                    additionRole === "" || additionRole === "Owner" ? <>
                      <li className="nav-item">
                        <a
                          className="dropdown-toggle nav-link"
                          onClick={() => handleOriginPageRender("/partner/dashboard")}
                        >
                          Dashboard
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="dropdown-toggle nav-link"
                          onClick={() =>
                            handlePageRender("/partner/message")
                          }
                        >
                          Message
                        </a>
                      </li>

                      <li className="nav-item">
                        <Link href="#" activeClassName="active">
                          <a
                            className="dropdown-toggle nav-link"
                            onClick={() =>
                              handleOriginPageRender(`/profile/${user_id}/followers`)
                            }
                          >
                            Followers
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <a
                          className="dropdown-toggle nav-link"
                          onClick={() =>
                            handleOriginPageRender("/partner/settings")
                          }
                        >
                          Settings
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="dropdown-toggle nav-link"
                          onClick={() => handleOriginPageRender(`/partner/locations`)}
                        >
                          Locations
                        </a>
                      </li>
                      {additionRole === "Owner" ? '' : <li className="nav-item">
                        <a
                          className="dropdown-toggle nav-link"
                          onClick={() => handleOriginPageRender(`/partner/partnership`)}
                        >
                          Partnership
                        </a>
                      </li>}
                    </> : <>
                      <li className="nav-item">
                        <a
                          className="dropdown-toggle nav-link"
                          onClick={() => handleOriginPageRender("/partner/dashboard")}
                        >
                          Dashboard
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="dropdown-toggle nav-link"
                          onClick={() => handleOriginPageRender(`/partner/locations`)}
                        >
                          Locations
                        </a>
                      </li>
                    </>
                    : <>
                      <li className="nav-item">
                        <a
                          className="dropdown-toggle nav-link"
                          onClick={() => handleOriginPageRender("/home")}
                        >
                          Home
                        </a>
                      </li>

                      <li className="nav-item">
                        <a
                          className="dropdown-toggle nav-link"
                          onClick={() =>
                            handlePageRender("/user/map/interactive-map")
                          }
                        >
                          Interactive Map
                        </a>
                      </li>

                      <li className="nav-item">
                        <Link href="#" activeClassName="active">
                          <a
                            className="dropdown-toggle nav-link"
                            onClick={() =>
                              handleOriginPageRender("/home/#pinpoint_location")
                            }
                          >
                            Locations
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <a
                          className="dropdown-toggle nav-link"
                          onClick={() =>
                            handleOriginPageRender("/home/#pinpoint_contactus")
                          }
                        >
                          Contact Us
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="dropdown-toggle nav-link"
                          onClick={() => handleOriginPageRender("/faq")}
                        >
                          FAQ
                        </a>
                      </li></>}
                </ul>
              </div>
            </div>
            <div className="others-option">
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
          </nav>
        </div>
        <NotificationDrawer
          onClose={onClose}
          open={notificationDrawerOpen}
          placement="right"
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.Layout,
    token: state.user.token,
    user_id: state.user.user_id,
    role: state.user.role,
    avatarImg: state.user.avatar,
    notifications: state.user.notifications,
    newNotification: state.socket.newNotification,
    notificationCount: state.user.notificationCount,
    isReadEmails: state?.mail?.isreadlist,
    additionRole: state.user.additionRole,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLogout: (cb) => dispatch(logout(cb)),
  onGetNotifications: (params, cb) => dispatch(getNotifications(params, cb)),
  onGetIsReadEmails: () => dispatch(getIsReadEmails()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
