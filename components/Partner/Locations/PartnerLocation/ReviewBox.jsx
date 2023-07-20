import {
  Image as Antimage,
  Space,
  List,
  Skeleton,
  Avatar,
} from "antd";
import React, { useEffect, useState } from "react";
import CommentBody from "./CommentBody";
import { apiBaseUrl } from "@/utils/baseUrl";

const imgurl = `${apiBaseUrl}/avatar/`;
const avatarurl = `${apiBaseUrl}/avatar/`;

function ReviewBox({ review, router, user_id }) {

  return (
    <List.Item>
      <Skeleton avatar title={false} loading={review?.loading} active>
        <List.Item.Meta
          avatar={
            <Avatar
              src={avatarurl + review?.user?.profile?.avatar?.filepath}
              size={64}
            />
          }
          title={
            <>
              <Space direction="vertical" size='small'>
                <a
                  onClick={() => router.push(`/profile/${review?.user?._id}/activity`)}
                  className="custom-userName">
                  {review?.user?.businessname}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                </a>
                <span>
                  @{review?.user?.username}
                </span>
              </Space>
            </>
          }
          description={new Date(review?.createdAt).toLocaleDateString(
            undefined,
            {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              hour12: true,
              minute: "2-digit",
              second: "2-digit",
            }
          )}
        />

        <div className="custom-list-content">{review?.text}</div>
        {review?.images ? (
          <div
            className="custom-list-content"
            style={{
              marginTop: 10,
            }}
          >
            <Antimage.PreviewGroup>
              {review.images.map((item, index) => (
                item.status === "active" ? <Antimage
                  width={"25%"}
                  src={imgurl + item?.filepath}
                  key={index}
                /> : ''
              ))}
            </Antimage.PreviewGroup>
          </div>
        ) : (
          ""
        )}
        <CommentBody item={review} path={router.asPath} user_id={user_id} />
      </Skeleton>
    </List.Item>
  );
}

export default ReviewBox;
