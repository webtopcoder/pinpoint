import { Drawer, List, Button, Space, Avatar, Tooltip } from "antd";
import useNotify from "@/hooks/useNotify";
import { connect } from "react-redux";
import {
  getNotifications,
  updatedNotifications,
  clearNotifications,

} from "@/src/redux/User/actions";
import {
  CloseOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiBaseUrl } from "@/utils/baseUrl";
import { useRouter } from "next/router";

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
      closable={false}
      onClose={onClose}
      open={open}
      bodyStyle={{
        color: "white",
        background: "#2f2f2f",
      }}
      headerStyle={{
        color: "white",
      }}
      width={415}
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
            <Link
              style={{
                cursor: "pointer",
              }}
              href={item.url ?? "#"}
              onClick={() => notificationRead(true, item)}
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
                    {item.actor.firstName}{" "}{item.actor.lastName}
                  </span>
                }
                description={
                  <span
                    style={{
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    {item.description}
                  </span>
                }
              />
            </Link>
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
