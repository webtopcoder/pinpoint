import toast from "@/components/Toast";
import useNotify from "@/hooks/useNotify";
import { getShoutout } from "@/redux/Profile/actions";
import { recommendPost } from "@/redux/Profile/actions";
import baseUrl, { apiBaseUrl } from "@/utils/baseUrl";
import config from "@/utils/config";
import { LikeOutlined } from "@ant-design/icons";
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
import { connect } from "react-redux";

const { Text } = Typography;
const IconText = ({ postID, text, likePost }) => {
  const [like, setLike] = useState(text);
  useEffect(() => {
    setLike(text);
  }, [text]);
  return (
    <Space>
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
    </Space>
  );
};

const ProfileShout = ({ onrecommendPost, ongetShoutout, shoutInfo }) => {
  const { notify } = useNotify();
  const likePost = (id, cb) => {
    onrecommendPost(id, (res, error) => {
      if (error) {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
      } else {
        cb(res.liked);
      }
    });
  };

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
      ongetShoutout(profile, count, "", (res, error) => {
        if (error) {
          console.log("error");
        } else {
          const newData = data.concat(res.results);
          setData(newData);
          setList(newData);
          setLoading(false);
          setInitLoading(false);
          window.dispatchEvent(new Event("resize"));
        }
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
        <Button onClick={onLoadMore}>loading more</Button>
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
                            actions={[
                              <IconText
                                postID={item.post?._id}
                                text={
                                  item.post?.like ? item.post?.like.count : 0
                                }
                                likePost={likePost}
                                key="list-vertical-like-o"
                              />,
                            ]}
                          >
                            <Skeleton
                              avatar
                              title={false}
                              loading={item.loading}
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
                                    <span className="custom-userName">
                                      {item?.from?.firstName +
                                        " " +
                                        item?.from?.lastName}{" "}
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                    </span>
                                    <span className="custom-shoutout-text">
                                      shouted out&nbsp;&nbsp;
                                      <a
                                        className="custom-touser-text"
                                        onClick={() =>
                                          window.open(
                                            baseUrl +
                                              "/profile/" +
                                              item.to._id +
                                              "/activity",
                                            "_blank"
                                          )
                                        }
                                      >
                                        @{item?.to?.username}
                                      </a>
                                    </span>
                                    <br />
                                    <a
                                      onClick={() =>
                                        window.open(
                                          baseUrl +
                                            "/profile/" +
                                            item.from._id +
                                            "/activity",
                                          "_blank"
                                        )
                                      }
                                    >
                                      @{item?.from?.username}
                                    </a>
                                  </>
                                }
                              />
                              <div className="custom-list-content">
                                {item.post?.content}
                              </div>
                              {item.post?.images ? (
                                <div
                                  className="custom-list-content"
                                  style={{
                                    marginTop: 10,
                                  }}
                                >
                                  <Antimage.PreviewGroup>
                                    {item.post?.images?.map((image, index) => (
                                      <Antimage
                                        loader={myLoader}
                                        width={"25%"}
                                        src={imgurl + image.filepath}
                                        key={index}
                                      />
                                    ))}
                                  </Antimage.PreviewGroup>
                                </div>
                              ) : (
                                ""
                              )}
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

const mapStateToProps = ({ profile }) => {
  return {
    shoutInfo: profile.shoutoutInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onrecommendPost: (id, cb) => dispatch(recommendPost(id, cb)),
  ongetShoutout: (data, count, search, cb) =>
    dispatch(getShoutout(data, count, search, cb)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileShout);
