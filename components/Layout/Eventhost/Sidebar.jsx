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
  CalendarOutlined 
} from "@ant-design/icons";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Layout, Menu, Avatar, Space, Badge, Tag } from "antd";
import {
  logout,
} from "@/src/redux/User/actions";
import { apiBaseUrl } from "@/utils/baseUrl";
import NotificationDrawer from "@/components/Profile/NotificationDrawer";
import { mailService, userService } from "@/services/index";

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
  avatar,
  role,
  businessName,
  user_id,
  newNotification,
  additionRole
}) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState();
  const [isreadEmails, setisreadEmails] = useState();
  const [initLoading, setInitLoading] = useState(true);
  const router = useRouter();
  const pathurl = router.asPath;
  const [current, setCurrent] = useState(pathurl);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  function getCurrentDimension() {
    if (typeof window !== "undefined") {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
  }

  async function onLoadMore() {
    setInitLoading(true);
    const result = await userService.getNotifications({
      sort: "createdAt:desc",
      limit: 9999
    });
    await setNotifications(result);
    setInitLoading(false);
  };


  async function initialize() {
    const IsreadEmails = await mailService.getIsReadEmails();
    await setisreadEmails(IsreadEmails);
    const result = await userService.getNotifications({
      sort: "createdAt:desc",
      limit: 10
    });
    await setNotifications(result);
    await setScreenSize(getCurrentDimension());
    screenSize.width < 766 ? await setCollapsed(true) : await setCollapsed(false);
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

  const onClick = (e) => {
    setCurrent(e.key);
    router.push(e.key);
  };

  const handleOriginPageRender = (page) => {
    router.push(page);
  };

  const items = [
    getItem("Dashboard", "/eventhost/dashboard/", <DashboardFilled />),
    getItem(
      "Messages",
      "/eventhost/message/",
      <Badge dot={isreadEmails?.length > 0 ? true : false}>
        <MessageFilled />
      </Badge>
    ),
    getItem(
      "Followers",
      `/profile/${user_id}/followers`,
      <UnorderedListOutlined />
    ),
    getItem("Settings", `/eventhost/settings/`, <SettingFilled />),
    getItem("Events", "/eventhost/events/", <EnvironmentFilled />),
    getItem("Event Schedule", "/eventhost/event-schedule/", <CalendarOutlined />),
    getItem("View Profile", 'sub1', <ProfileFilled />, [
      getItem('Activity', `/profile/${user_id}/activity`),
      getItem('Shout out', `/profile/${user_id}/shout-outs`),
      getItem('Followers', `/profile/${user_id}/followers`),
      getItem('Events', `/profile/${user_id}/events`),
    ]),
    getItem("Partnership", "/eventhost/partnership/", <GiftOutlined />),
  ];

  useEffect(() => {
    if (router.pathname.indexOf("/eventhost/settings/") > -1) {
      setCurrent(router.pathname);
    }
  }, [router.pathname]);

  const [collapsed, setCollapsed] = useState(false);
  const onLogoutHandler = () => {
    onLogout(() => {
      router.push("/");
    });
  };

  if (role !== "eventhost") {
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
                {avatar ? (
                  <Avatar src={avatarurl + avatar} alt="avatar" size={170} />
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
            <div className="avatar-vst-profile">{businessName}</div>
            {additionRole !== "Location Manager" ? <div
              className="vst-edit-profile"
              onClick={() => handleOriginPageRender(`/profile/${user_id}/edit`)}
            >
              edit profile
            </div> : ''
            }
            <div className="vst-edit-profile">
              <Space
                size="large"
                style={{
                  textAlign: "center",
                }}
              >
                <Badge
                  dot={
                    newNotification || notifications?.results?.length > 0 ? true : false
                  }
                >
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
      <NotificationDrawer onLoadMore={onLoadMore} initLoading={initLoading} notifications={notifications} onClose={onClose} open={open} placement="left" />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.Layout,
    token: state.user.token,
    avatar: state?.user?.avatar,
    role: state?.user?.role,
    businessName: state?.user?.businessname,
    user_id: state?.user?.user_id,
    newNotification: state.socket.newNotification,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLogout: (cb) => dispatch(logout(cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftSidebar);
