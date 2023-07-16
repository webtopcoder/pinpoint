import React from "react";
import { Avatar, Button, List, Skeleton, Space, Tag, Badge } from "antd";
import {
  UserOutlined,
  MessageFilled,
  UserDeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  SyncOutlined
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { apiBaseUrl } from "@/utils/baseUrl";
import useNotify from "@/hooks/useNotify";
import Link from "next/link";
import { profileService } from "@/services/index";
import useMedia from "@/hooks/useMedia";
import binavatar from "@/public/images/landing/avatar.png";

const FollwersList = ({
  ongetFollowers,
  initLoading,
  data,
  getHeader,
  loading,
  setLoading,
  count,
  profile,
  setCount,
  search,
  userRole,
  user_id,
  loadStatus,
  LoadMoreRemain
}) => {
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');
  const avatarurl = `${apiBaseUrl}/avatar/`;
  const router = useRouter();

  async function unfriend(id) {
    await profileService.onunFriend(id)
      .then(() => {
        setLoading(true);
        notify("success", "Unfriend successfully");
        ongetFollowers(profile, count, search);
        getHeader(profile);
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }

  async function AcceptFollowerRequest(id, type) {
    await profileService.acceptFollowerRequest(id, type)
      .then(() => {
        setLoading(true);
        notify("success", type === "active" ? "Accepted successfully" : 'Declined successfully');
        ongetFollowers(profile, count, search);
        getHeader(profile);
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }

  const onLoadMore = () => {
    setCount(count + 1);
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
        <Button onClick={onLoadMore}>Load More({LoadMoreRemain})</Button>
      </div>
    ) : null;

  return (

    <List
      grid={isWebDevice ? false : {
        column: 1,
        xs: 1,
        sm: 2,
      }}
      className="demo-loadmore-list"
      itemLayout="horizontal"
      loading={initLoading}
      loadMore={loadStatus ? null : loadMore}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          actions={[
            item?.status !== "requesting" ? (<Button
              onClick={() => router.push(`/profile/${item?.follower?._id}/activity`)}
              type="primary"
              icon={<UserOutlined />}
              size={isWebDevice ? "default" : "small"}
              key="button-view-profile"
            >
              {isWebDevice ? "View Profile" : "Profile"}
            </Button>) : '',
            userRole ? (
              user_id !== profile ? (
                ""
              ) : item?.status !== "active" ? (
                item?.status === "pending" ? (<Space direction="horizontal">
                  <Button
                    onClick={() => AcceptFollowerRequest(item?._id, "active")}
                    type="primary"
                    icon={<CheckOutlined />}
                    size={isWebDevice ? "default" : "small"}
                    key="button-message"
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => AcceptFollowerRequest(item?._id, "decline")}
                    style={
                      user_id == profile
                        ? {
                          display: "block",
                        }
                        : {
                          display: "none",
                        }
                    }
                    danger
                    type="primary"
                    icon={<CloseOutlined />}
                    size={isWebDevice ? "default" : "small"}
                    key="button-unfriend"
                  >
                    Decline
                  </Button>
                </Space>)
                  :
                  (<Space direction="horizontal">
                    <Tag icon={<SyncOutlined spin />} color="processing">
                      pending
                    </Tag>
                  </Space>)

              ) : (
                <Space direction="horizontal">
                  <Button
                    onClick={() => router.push(`/${userRole}/message?user=${item?.follower?._id}`)}
                    type="primary"
                    icon={<MessageFilled />}
                    size={isWebDevice ? "default" : "small"}
                    key="button-message"
                  >
                    Message
                  </Button>
                  <Button
                    onClick={() => unfriend(item?.follower?._id)}
                    style={
                      user_id == profile
                        ? {
                          display: "block",
                        }
                        : {
                          display: "none",
                        }
                    }
                    danger
                    type="primary"
                    icon={<UserDeleteOutlined />}
                    size={isWebDevice ? "default" : "small"}
                    key="button-unfriend"
                  >
                    Unfriend
                  </Button>
                </Space>
              )
            ) : (
              <Space direction="horizontal">
                <Button
                  onClick={() => router.push(`/${userRole}/message?user=${item?.follower?.id}`)}
                  type="primary"
                  icon={<MessageFilled />}
                  size={isWebDevice ? "default" : "small"}
                  key="button-message"
                >
                  Accept
                </Button>
                <Button
                  onClick={() => unfriend(item?.follower?._id)}
                  style={
                    user_id == profile
                      ? {
                        display: "block",
                      }
                      : {
                        display: "none",
                      }
                  }
                  danger
                  type="primary"
                  icon={<UserDeleteOutlined />}
                  size={isWebDevice ? "default" : "small"}
                  key="button-unfriend"
                >
                  Decline
                </Button>
              </Space>
            ),
          ]}
        >
          <Skeleton avatar title={false} loading={loading} active>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{
                    width: 70,
                    height: 70,
                  }}
                  src={
                    item?.follower?.profile?.avatar?.filepath
                      ? avatarurl +
                      item?.follower?.profile?.avatar?.filepath
                      : binavatar
                  }
                />
              }
              title={
                <Space size={0} direction={isWebDevice ? "vertical" : 'horizontal'}>
                  <Space size="small" direction='horizontal'>
                    <Link href={"/profile/" + item?.follower?._id + "/activity"}>
                      {item?.follower?.name}
                    </Link>
                    <Tag color="success">{item?.follower?.role}</Tag>
                  </Space>
                  <p> @{item?.follower?.username}</p>
                </Space>
              }
              description={new Date(
                item.updatedAt
              ).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                hour12: true,
                minute: "2-digit",
                second: "2-digit",
              })}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default FollwersList;
