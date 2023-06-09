import React, { useEffect, useState } from "react";
import { Row, Badge, Popconfirm, Button, Avatar } from "antd";
import {
  ExportOutlined,
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import Image from "next/image";
import { connect } from "react-redux";
import Link from "next/link";
import Logo from "@/public/images/logo.png";
import mailIcon from "@/public/images/landing/user-mail.png";
import LIcon from "@/public/images/landing/l.png";
import {
  logout,
} from "@/src/redux/User/actions";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import useNotify from "@/hooks/useNotify";
import { apiBaseUrl } from "@/utils/baseUrl";
import NotificationDrawer from "@/components/Profile/NotificationDrawer";
import { mailService, userService } from "@/services/index";

const RightSidebar = ({
  visible,
  onLogout,
  user_id,
  role,
  token,
  avatarImg,
  newNotification,
}) => {
  const router = useRouter();
  const avatarurl = `${apiBaseUrl}/avatar/`;
  const [notifications, setNotifications] = useState();
  const [isreadEmails, setisreadEmails] = useState();
  const [initLoading, setInitLoading] = useState(true);
  const [notificationDrawerOpen, setOpen] = useState(false);

  const { notify } = useNotify();
  const onLogoutHandler = () => {
    onLogout(() => {
      router.push("/home");
    });
  };

  async function onLoadMore() {
    setInitLoading(true);
    const result = await userService.getNotifications({
      sort: "createdAt:desc",
      limit: 9999
    });
    await setNotifications(result);
    setInitLoading(false);
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

  async function initialize() {
    await mailService.getIsReadEmails().then(async (res) => {
      await setisreadEmails(res);
    }).catch((error) => {
      console.log(error)
    });

    await userService.getNotifications({
      sort: "createdAt:desc",
      limit: 10
    }).then(async (res) => {
      await setNotifications(res);
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    initialize();
  }, []);

  async function showDrawer() {
    await setOpen(true);
    const result = await userService.getNotifications({
      sort: "createdAt:desc",
      limit: 10
    });
    await setNotifications(result);
    await setInitLoading(false);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        className={
          role !== "partner" && visible ? "right-sidebar show" : "right-sidebar"
        }
        role="document"
        id="right-sidebar"
      >
        <PerfectScrollbar>
          <div className="logo-image">
            <Image src={Logo} width={280} height={80} />
          </div>
          <div className="avatar-panel">
            <div className="avatar-left">
              {token && (
                <div style={{ marginBottom: 20 }}>
                  <Link href="/user/message">
                    <a>
                      <Badge
                        dot={isreadEmails?.length > 0 ? true : false}
                        className="mailboxLIcon"
                      >
                        <Image
                          src={mailIcon}
                          alt="mail"
                          width={60}
                          height={40}
                        />
                      </Badge>
                    </a>
                  </Link>
                </div>
              )}
              {token && (
                <div>
                  <Badge
                    dot={
                      newNotification || notifications?.results?.length > 0 ? true : false
                    }
                    className="mailboxIcon"
                    onClick={showDrawer}
                  >
                    <Image src={LIcon} alt="l" width={40} height={40} />
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
                    size={160}
                    src={avatarurl + avatarImg}
                  />
                ) : (
                  <Avatar
                    style={{
                      border: "3px solid gray",
                    }}
                    size={160}
                    icon={<UserOutlined />}
                  />
                )}
              </div>
            </div>
            <div className="avatar-right">
              {token && (
                <ExportOutlined
                  style={{ color: "#686868", fontSize: 40 }}
                  onClick={() => onLogoutHandler()}
                />
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
                  onConfirm={() => SignupOrLogin("/authentication/user/login")}
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
            <>
              <div
                onClick={() =>
                  handleOriginPageRender(`/profile/${user_id}/activity`)
                }
                className="vst-profile"
              >
                View Profile
              </div>
              <div
                onClick={() =>
                  handleOriginPageRender(`/profile/${user_id}/edit`)
                }
                className="vst-edit-profile"
              >
                edit profile
              </div>
            </>
          )}
          <Row
            className="sidebar-menu-item"
            onClick={() => handleOriginPageRender("/home")}
          >
            Home
          </Row>
          <Row
            className="sidebar-menu-item"
            onClick={() => handlePageRender("/user/map/interactive-map")}
          >
            Interactive Map
          </Row>
          <Row
            className="sidebar-menu-item"
            onClick={() => handleOriginPageRender("/home/#pinpoint_location")}
          >
            Locations
          </Row>
          <Row
            className="sidebar-menu-item"
            onClick={() => handleOriginPageRender("/home/#pinpoint_contactus")}
          >
            Contact Us
          </Row>
          <Row
            className="sidebar-menu-item"
            onClick={() => handleOriginPageRender("/faq")}
          >
            FAQ
          </Row>
        </PerfectScrollbar>
      </div>

      <NotificationDrawer
        onClose={onClose}
        open={notificationDrawerOpen}
        placement="right"
      />
      <NotificationDrawer onLoadMore={onLoadMore} initLoading={initLoading} notifications={notifications} onClose={onClose} open={notificationDrawerOpen} placement="right" />
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLogout: (cb) => dispatch(logout(cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RightSidebar);
