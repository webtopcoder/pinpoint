import { Drawer, List, Button, Space, Avatar, Tooltip, Tag } from "antd";
import useNotify from "@/hooks/useNotify";
import { connect } from "react-redux";
import {
  getNotifications,
  updatedNotifications,
  clearNotifications,
} from "@/src/redux/User/actions";
import {
  CloseOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiBaseUrl } from "@/utils/baseUrl";
import { useRouter } from "next/router";
import { getDiffToNow } from "@/utils/date";
import useMedia from "@/hooks/useMedia";

function NotificationDrawer({
  placement = "left",
  open,
  onClose,
  notifications,
  notificationCount,
  onGetNotifications,
  onUpdatedNotifications,
  onclearNotifications
}) {
  const avatarurl = `${apiBaseUrl}/avatar/`;
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');
  const router = useRouter();
  const notificationRead = (flag, item) => {
    onUpdatedNotifications(item?._id, (res) => {
      if (res.success) {
        onGetNotifications(
          {
            sort: "createdAt:desc",
            limit: 10
          },
          (_, err) => {
            if (err) {
              console.log(err);
            } else {
              setInitLoading(false);
            }
          }
        );
        flag ? router.push(item?.url) : ''
      }
    });
  };

  const onLoadMore = () => {
    setLoading(true);
    onGetNotifications(
      {
        sort: "createdAt:desc",
        limit: 9999
      },
      (_, err) => {
        if (err) {
          console.log(err);
        } else {
          setInitLoading(false);
        }
      }
    );
  };

  const loadMore =
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
      }}
    >
      <Button onClick={onLoadMore}>Show All</Button>
    </div>


  useEffect(() => {
    onGetNotifications(
      {
        sort: "createdAt:desc",
        limit: 10
      },
      (_, err) => {
        if (err) {
          console.log(err);
        } else {
          setInitLoading(false);
        }
      }
    );
  }, []);
  return (
    <Drawer
      title="Notifications"
      placement={placement}
      closable={true}
      onClose={onClose}
      open={open}
      bodyStyle={{
        color: "white",
        background: "#2f2f2f",
      }}
      headerStyle={{
        color: "white",
      }}
      width={isWebDevice ? 416 : 366}
      extra={
        <Space>
          <Button type="link" onClick={() => {
            onclearNotifications();
          }}
          >
            Clear All
          </Button>
        </Space>
      }
    >
      <List
        loadMore={loadMore}
        loading={initLoading}
        size="small"
        dataSource={notifications}
        renderItem={(item, index) => (
          <List.Item
            style={{
              color: "white",
              borderBlockEnd: "1px solid white",
            }}
            actions={[<Space.Compact>
              <Tooltip title="Mark as Read">
                <Button type="link" onClick={() => notificationRead(false, item)} icon={<CloseOutlined />}></Button>
              </Tooltip>
            </Space.Compact>]}
          >
            <List.Item.Meta
              avatar={<Avatar src={avatarurl + "/" + item?.actor.profile?.avatar.filepath} />}
              title={
                <span
                  style={{
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  {item.actor.businessname}
                </span>
              }
              onClick={() => notificationRead(true, item)}
              description={
                <>
                  <span
                    style={{
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    {item.description}
                  </span>
                  <span
                    style={{
                      color: "gray",
                      cursor: "pointer",
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {getDiffToNow(item.createdAt)} ago
                  </span>
                </>
              }
            />
          </List.Item>
        )}
      />
    </Drawer>
  );
}

const mapStateToProps = (state) => {
  return {
    notifications: state.user.notifications,
    notificationCount: state.user.notificationCount,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGetNotifications: (params, cb) => dispatch(getNotifications(params, cb)),
  onUpdatedNotifications: (id, cb) => dispatch(updatedNotifications(id, cb)),
  onclearNotifications: () => dispatch(clearNotifications()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationDrawer);
