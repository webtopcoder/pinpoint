import { LikeOutlined, MessageOutlined, UpOutlined, DownOutlined } from "@ant-design/icons";
import {
  Button,
  Space,
  Typography,
  Rate
} from "antd";
import React, { useEffect, useState } from "react";
import { locationService, commentService } from "@/services/index";
import Comments from "@/components/Layout/comments/CommentsAll";

const { Text } = Typography;

const IconText = ({ postID, text, user_id }) => {
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
          if (!user_id) {
            notify(
              "error",
              "Please login"
            );
            return;
          }
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
          user_id={user_id}
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
              if (!user_id) {
                notify(
                  "error",
                  "Please login"
                );
                return;
              }
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
            {expandComments ? <UpOutlined /> : <DownOutlined />}
            View Comments
          </Button>
        </Space>
      </div>
      <Comments currentUserId={user_id} path={path} ownerId={item.user._id} expand={expand} setExpandComments={setExpandComments} expandComments={expandComments} setCommentCount={setCommentCount} type="location" id={item._id} />
    </>
  );
};

export default CommentBody;
