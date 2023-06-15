import useNotify from "@/hooks/useNotify";
import { apiBaseUrl } from "@/utils/baseUrl";
import { LikeOutlined, MessageOutlined, UpOutlined, DownOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Image as Antimage,
  List,
  Skeleton,
  Space,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Comments from "@/components/Layout/comments/CommentsAll";
import { connect } from "react-redux";
import { commentService, profileService } from "@/services/index";

const { Text } = Typography;
const IconText = ({ postID, text, likePost }) => {
  const [like, setLike] = useState(text);
  useEffect(() => {
    setLike(text);
  }, [text]);
  return (
    <Space style={{
      marginRight: 20,
      marginTop: 20
    }} >
      <Button
        type="primary"
        onClick={() => {
          likePost(postID, (liked) => {
            if (liked) {
              setLike((like) => like + 1);
            } else {
              setLike((like) => (like ? like - 1 : like));
            }
          });
        }}
        shape="circle"
        icon={<LikeOutlined />}
      />
      <Text>{like}</Text>
    </Space >
  );
};

const CommentBody = ({ item, likePost, user_id, path }) => {

  const [commentCount, setCommentCount] = useState();
  const [expand, setExpand] = useState(true);
  const [expandComments, setExpandComments] = useState(false);

  useEffect(() => {
    commentService.getComments(item?._id)
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
          text={item?.like ? item?.like?.count : 0}
          likePost={likePost}
          icon={<LikeOutlined />}
          key="list-vertical-like-o"
        />
        {/* <Space style={{
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
        </Space> */}
      </div>
      <Comments currentUserId={user_id} expand={expand} ownerId={item?.from} setExpandComments={setExpandComments} expandComments={expandComments} setCommentCount={setCommentCount} type="shoutout" id={item?._id} />
    </>
  );
};

const ProfileShout = ({ user_id }) => {
  const { notify } = useNotify();

  async function likePost(id, callback) {
    await profileService.recommendPost(id)
      .then((res) => {
        callback(res.liked);
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }

  const myLoader = ({ src }) => {
    return src;
  };
  const imgurl = `${apiBaseUrl}/avatar/`;
  const avatarurl = `${apiBaseUrl}/avatar/`;
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(5)].map(() => ({
          loading: true,
          from: {},
        }))
      )
    );

    if (router.isReady) {
      const { profile } = router.query;
      profileService.getShoutout(profile, count, "")
        .then((res) => {
          if (res) {
            const newData = data.concat(res.results);
            setData(newData);
            setList(newData);
            setLoading(false);
            setInitLoading(false);
            window.dispatchEvent(new Event("resize"));
          } else notify("error", res.msg);
        })
        .catch((error) => {
          notify(
            "error",
            error?.response?.data?.message || "Something went wrong"
          );
          return;
        });
    }
  }, [count, router.query]);

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
    <div className="blog-details-area">
      <div className="container">
        <br />
        <div className="row justify-content-center">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="avatar-area green-color">
              <div className="avatar-respond">
                <div className="avatar-form">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <List
                        itemLayout="vertical"
                        size="large"
                        loading={initLoading}
                        loadMore={loadMore}
                        dataSource={list}
                        renderItem={(item, index) => (
                          <List.Item
                            key={index}
                          >
                            <Skeleton
                              avatar
                              title={false}
                              loading={item?.loading}
                              active
                            >
                              <List.Item.Meta
                                avatar={
                                  <Avatar
                                    src={
                                      avatarurl +
                                      item?.from?.profile?.avatar?.filepath
                                    }
                                    size={64}
                                  />
                                }
                                title={
                                  <>
                                    <Space size={0} direction="vertical">
                                      <a
                                        onClick={() => router.push(`/profile/${item?.from?._id}/activity`)}
                                        className="custom-userName">
                                        {item?.from?.businessname}
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                      </a>
                                      <span>
                                        @{item?.from?.username}
                                      </span>
                                    </Space>
                                    <Space>
                                      shouted out
                                      <a
                                        onClick={() => router.push(`/profile/${item?.to?._id}/activity`)}
                                      >
                                        @{item?.to?.username}
                                      </a>
                                    </Space>
                                  </>
                                }
                              />
                              <div className="custom-list-content">
                                {item?.post?.content}
                              </div>
                              {item?.post?.images ? (
                                <div
                                  className="custom-list-content"
                                  style={{
                                    marginTop: 10,
                                  }}
                                >
                                  <Antimage.PreviewGroup>
                                    {item?.post?.images?.map((image, index) => (
                                      image.status === "active" ?
                                        <Antimage
                                          loader={myLoader}
                                          width={"25%"}
                                          src={imgurl + image?.filepath}
                                          key={index}
                                        /> : ''
                                    ))}
                                  </Antimage.PreviewGroup>
                                </div>
                              ) : (
                                ""
                              )}
                              <CommentBody path={router.asPath} item={item?.post} likePost={likePost} user_id={user_id} />
                            </Skeleton>
                          </List.Item>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user_id: user.user_id,
  };
};

export default connect(mapStateToProps)(ProfileShout);
