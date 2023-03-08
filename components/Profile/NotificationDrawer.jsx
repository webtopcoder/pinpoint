import { Drawer, List, Button } from "antd";
import useNotify from "@/hooks/useNotify";
import { connect } from "react-redux";
import {
  getNotifications,
  updatedNotifications,
} from "@/src/redux/User/actions";
import { useEffect, useState } from "react";
import Link from "next/link";

function NotificationDrawer({
  placement = "left",
  open,
  onClose,
  notifications,
  notificationCount,
  onGetNotifications,
  onUpdatedNotifications,
}) {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [notificationPage, setNotificationPage] = useState(1);
  const { notify } = useNotify();
  const notificationRead = (item) => {
    onUpdatedNotifications(item?._id, (_, error) => {
      if (error) {
        notify("error", "Error");
        return;
      }
      router.push(item?.url);
    });
  };

  const onLoadMore = () => {
    setLoading(true);

    if (notificationCount / 10 > notificationPage) {
      setNotificationPage(notificationPage + 1);
    }
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  useEffect(() => {
    onGetNotifications(
      {
        sort: "createdAt:asc",
        page: notificationPage,
      },
      (_, err) => {
        if (err) {
          console.log(err);
        } else {
          setInitLoading(false);
        }
      }
    );
  }, [notificationPage]);
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
    >
      <List
        loadMore={loadMore}
        loading={initLoading}
        size="small"
        dataSource={notifications}
        pagination={{
          onChange: (page) => {
            setNotificationPage(page);
          },
          pageSize: 10,
        }}
        renderItem={(item) => (
          <List.Item
            style={{
              color: "white",
              borderBlockEnd: "1px solid white",
            }}
          >
            <Link
              style={{
                cursor: "pointer",
              }}
              href={item.url ?? "#"}
              onClick={() => notificationRead(item)}
            >
              <List.Item.Meta
                title={
                  <span
                    style={{
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    {item.title}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationDrawer);
