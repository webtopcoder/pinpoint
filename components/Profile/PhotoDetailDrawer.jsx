import { Drawer, List, Button, Space, Avatar, Tooltip, Tag } from "antd";
import useNotify from "@/hooks/useNotify";
import {
  CloseOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useState } from "react";
import { apiBaseUrl } from "@/utils/baseUrl";
import { useRouter } from "next/router";
import { getDiffToNow } from "@/utils/date";
import useMedia from "@/hooks/useMedia";
import { userService } from "@/services/index";

function PhotoDetailDrawer({
  placement = "left",
  open,
  onClose,
  notifications,
  initLoading,
  onLoadMore
}) {
  const avatarurl = `${apiBaseUrl}/avatar/`;
  const isWebDevice = useMedia('(min-width:700px)');
  const router = useRouter();

  async function notificationRead(flag, item) {
    await userService.UpdatedNotifications(item?._id)
      .then((res) => {
        if (res.success) {
          onLoadMore();
          flag ? router.push(item?.url) : ''
        }
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  async function clearNotifications() {
    await userService.clearNotifications()
      .then(() => {
        onLoadMore();
      })
      .catch((error) => {
        console.log(error);
        return;
      });
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
          <Button type="link" onClick={clearNotifications}
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
        dataSource={notifications?.results}
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
              avatar={<Avatar src={avatarurl + "/" + item?.actor?.profile?.avatar?.filepath} />}
              title={
                <span
                  style={{
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  {item?.actor?.businessname}
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
                    {item?.description}
                  </span><br />
                  <span
                    style={{
                      color: "gray",
                      cursor: "pointer",
                    }}
                  >
                    {getDiffToNow(item?.createdAt)} ago
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

export default PhotoDetailDrawer;
