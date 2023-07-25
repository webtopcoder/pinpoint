import React, { useEffect, useState } from "react";
import { Avatar, Button, List, Skeleton, Space, Tag, Badge } from "antd";
import {
  UserOutlined,
  MessageFilled,
  UserDeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  SyncOutlined,
  UserAddOutlined
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { apiBaseUrl } from "@/utils/baseUrl";
import useNotify from "@/hooks/useNotify";
import Link from "next/link";
import { profileService } from "@/services/index";
import useMedia from "@/hooks/useMedia";
import binavatar from "@/public/images/landing/avatar.png";

const AllList = ({
  ongetAllMemebers,
  getHeader,
  data,
  initLoading,
  loading,
  profile,
  search,
  userRole,
  setCount,
  count,
  loadStatus,
  LoadMoreRemain
}) => {
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');
  const avatarurl = `${apiBaseUrl}/avatar/`;
  const router = useRouter();

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
        <Button onClick={onLoadMore}>Load More</Button>
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
            <Button
              onClick={() => router.push(`/profile/${item?._id}/activity`)}
              type="primary"
              icon={<UserOutlined />}
              size={isWebDevice ? "default" : "small"}
              key="button-view-profile"
            >
              {isWebDevice ? "View Profile" : "Profile"}
            </Button>,
            <Button
              onClick={async () => {
                if (!userRole) {
                  notify(
                    "error",
                    "Please login"
                  );
                  return;
                }
                await profileService.postFollower(item?.id)
                  .then(async (res) => {
                    notify(res.data.type, res?.data?.message);
                    await getHeader();
                    await ongetAllMemebers(profile, count, search);
                  })
                  .catch((error) => {
                    notify(
                      "error",
                      error?.response?.data?.message || "Something went wrong"
                    );
                    return;
                  });
              }}
              type="primary"
              icon={<UserAddOutlined />}
              size={isWebDevice ? "default" : "small"}
              key="button-message"
            >
              Follow
            </Button>
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
                    item?.profile?.avatar?.filepath
                      ? avatarurl +
                      item?.profile?.avatar?.filepath
                      : binavatar
                  }
                />
              }
              title={
                <Space size={0} direction={isWebDevice ? "vertical" : 'horizontal'}>
                  <Space size="small" direction='horizontal'>
                    <Link href={"/profile/" + item?._id + "/activity"}>
                      {item?.name}
                    </Link>
                    <Tag color="success">{item?.role}</Tag>
                  </Space>
                  <p> @{item?.username}</p>
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

export default AllList;
