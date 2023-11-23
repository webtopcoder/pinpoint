import { LikeOutlined, MessageOutlined, UpOutlined, DownOutlined } from "@ant-design/icons";
import {
  Image as Antimage,
  Button,
  Space,
  Typography,
  List,
  Skeleton,
  Avatar,
  Card,
  Rate
} from "antd";
import React, { useEffect, useState } from "react";
import { locationService, commentService } from "@/services/index";
import Comments from "@/components/Layout/comments/CommentsAll";
import { apiBaseUrl } from "@/utils/baseUrl";

const { Text } = Typography;
const { Meta } = Card;
const imgurl = `${apiBaseUrl}/avatar/`;
const avatarurl = `${apiBaseUrl}/avatar/`;

const IconText = ({ postID, text }) => {
  const [like, setLike] = useState(text);
  useEffect(() => {
    setLike(text);
  }, [text]);
  return (
    <Space style={{
      marginRight: 20,
      marginTop: 20
    }}>
      <Button
        type="primary"
        onClick={async () => {
          await locationService.likeReview(postID)
            .then(async (res) => {
              if (res.liked) {
                setLike((like) => like + 1);
              } else {
                setLike((like) => (like ? like - 1 : like));
              };
            })
            .catch((error) => {
              console.log(error);
              return;
            });
        }}
        shape="circle"
        icon={<LikeOutlined />}
      />
      <Text>{like}</Text>
    </Space>
  );
};

const CommentBody = ({ item, user_id, path }) => {
  const [commentCount, setCommentCount] = useState();
  const [expand, setExpand] = useState(true);
  const [expandComments, setExpandComments] = useState(false);

  useEffect(() => {
    commentService.getComments(item._id)
      .then((res) => {
        setCommentCount(res.length);
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }, []);

  return (
    <>
      <div
        className="custom-list-content"
        style={{
          marginTop: 10,
        }}
      >
        <IconText
          postID={item?._id}
          text={item.like ? item?.like?.count : 0}
          key="list-vertical-like-o"
        />
        <Space style={{
          marginRight: 20,
          marginTop: 20
        }}>
          <Button
            type="primary"
            shape="circle"
            onClick={() => {
              setExpand(!expand);
            }}
            icon={<MessageOutlined />}
          />
          <Text>{commentCount}</Text>
        </Space>
        {item.rating !== 0 ? <Rate disabled allowHalf key={item.rating} defaultValue={item.rating} /> : ''}
        <Space
          hidden={commentCount === 0 ? true : false}
          style={{
            float: 'right',
            marginTop: 20
          }}
        >
          <Button type="link"
            onClick={() => {
              setExpandComments(!expandComments);
            }}
            block>
            {expandComments ? <DownOutlined /> : <UpOutlined />}
            View Comments
          </Button>
        </Space>
      </div>
      <Comments currentUserId={user_id} path={path} ownerId={item.user._id} expand={expand} setExpandComments={setExpandComments} expandComments={expandComments} setCommentCount={setCommentCount} type="location" id={item._id} />
    </>
  );
};

function ReviewBox({ review, location, router, user_id }) {

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
                  onClick={() => router.push(`/profile/${review?.user?._id}`)}
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
        {review.images ? (
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
