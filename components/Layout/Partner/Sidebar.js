import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  MessageFilled,
  DashboardFilled,
  SettingFilled,
  ProfileFilled,
  EnvironmentFilled,
  UnorderedListOutlined,
  InfoCircleFilled,
  ExportOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Layout, Menu, Avatar, Space, Badge } from "antd";
import {
  getNotifications,
  updatedNotifications,
  logout,
} from "@/src/redux/User/actions";
import { getIsReadEmails } from "@/src/redux/Mail/actions";
import baseUrl, { apiBaseUrl } from "@/utils/baseUrl";
import NotificationDrawer from "@/components/Profile/NotificationDrawer";

const { Sider } = Layout;

const avatarurl = `${apiBaseUrl}/avatar/`;

function getItem(label, key, icon, children) {
  return {
    label,
    key,
    icon,
    children,
  };
}

function LeftSidebar({
  onLogout,
  notifications,
  avatar,
  role,
  businessName,
  user_id,
  onGetIsReadEmails,
  isReadEmails,
}) {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathurl = router.asPath;
  const [current, setCurrent] = useState(pathurl);

  useEffect(() => {
    onGetIsReadEmails();
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onClick = (e) => {
    if (e.key.substring(1, 8) === "profile") {
      window.open(baseUrl + e.key, "_blank");
    } else {
      setCurrent(e.key);
      router.push(e.key);
    }
  };

  const handleOriginPageRender = (page) => {
    router.push(page);
  };

  const items = [
    getItem("Dashboard", "/partner/dashboard/", <DashboardFilled />),
    getItem(
      "Messages",
      "/partner/message/",
      <Badge dot={isReadEmails.length > 0 ? true : false}>
        <MessageFilled />
      </Badge>
    ),
    getItem(
      "Followers",
      `/profile/${user_id}/followers`,
      <UnorderedListOutlined />
    ),
    getItem("Settings", `/partner/settings/`, <SettingFilled />),
    getItem("Parter Locations", "/partner/locations/", <EnvironmentFilled />),
    getItem("View Profile", `/profile/${user_id}/activity`, <ProfileFilled />),
    getItem("Partnership", "/partner/partnership/", <GiftOutlined />),
    // getItem("Contact Pinpoint", "11", <ContactsFilled />),
  ];

  useEffect(() => {
    if (router.pathname.indexOf("/partner/settings/") > -1) {
      setCurrent(router.pathname);
    }
  }, [router.pathname]);

  const [collapsed, setCollapsed] = useState(false);
  const onLogoutHandler = () => {
    onLogout(() => {
      router.push("/home");
    });
  };

  if (role !== "partner") {
    return null;
  }

  return (
    <>
      <Sider
        style={{
          background: "#2F2F2F",
        }}
        collapsible
        width={270}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        {!collapsed ? (
          <>
            <div className="avatar-panel">
              <div className="partner-avatar-center">
                <div className="rightsidebar-avatar">
                  {avatar ? (
                    <Avatar
                      src={avatarurl + avatar}
                      alt="avatar"
                      style={{
                        width: "100%",
                      }}
                      size={150}
                      height={100}
                      width={100}
                    />
                  ) : (
                    <Avatar
                      style={{
                        border: "3px solid gray",
                      }}
                      size={150}
                      icon={<UserOutlined />}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="avatar-vst-profile">{businessName}</div>
            <div
              className="vst-edit-profile"
              onClick={() => handleOriginPageRender(`/profile/${user_id}/edit`)}
            >
              edit profile
            </div>
            <div className="vst-edit-profile">
              <Space
                size="large"
                style={{
                  textAlign: "center",
                }}
              >
                <Badge dot={notifications.length > 0 ? true : false}>
                  <Avatar
                    shape="square"
                    onClick={showDrawer}
                    size="large"
                    icon={
                      <InfoCircleFilled
                        style={{
                          fontSize: 30,
                        }}
                      />
                    }
                  />
                </Badge>
                <Avatar
                  shape="square"
                  onClick={() => onLogoutHandler()}
                  size="large"
                  icon={
                    <ExportOutlined
                      style={{
                        fontSize: 30,
                      }}
                    />
                  }
                />
              </Space>
            </div>
          </>
        ) : (
          <div className="avatar-panel-collapse">
            <div className="partner-avatar-center">
              <div className="rightsidebar-avatar-collapse">
                {avatar ? (
                  <Avatar src={avatarurl + avatar} alt="avatar" size={50} />
                ) : (
                  <Avatar
                    style={{
                      border: "3px solid gray",
                    }}
                    size={50}
                    icon={<UserOutlined />}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        <Menu
          style={{
            background: "#2F2F2F",
            fontSize: "15px",
          }}
          selectedKeys={[current]}
          theme="dark"
          mode="inline"
          items={items}
          onClick={onClick}
        />
      </Sider>
      <NotificationDrawer onClose={onClose} open={open} placement="left" />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.Layout,
    token: state.user.token,
    notifications: state.user.notifications,
    notificationCount: state.user.notificationCount,
    avatar: state?.profile?.userinfo?.profile?.avatar?.filepath,
    role: state?.user?.role,
    businessName: state?.user?.username,
    user_id: state?.user?.user_id,
    isReadEmails: state?.mail?.isreadlist,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLogout: (cb) => dispatch(logout(cb)),
  onGetNotifications: (params, cb) => dispatch(getNotifications(params, cb)),
  onUpdatedNotifications: (id, cb) => dispatch(updatedNotifications(id, cb)),
  onGetIsReadEmails: () => dispatch(getIsReadEmails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftSidebar);
