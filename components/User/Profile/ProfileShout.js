import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import {
  Image as Antimage,
  Button,
  Avatar,
  List,
  Space,
  Skeleton,
  Typography,
} from "antd";
import { LikeOutlined } from "@ant-design/icons";
import { getShoutout } from "@/redux/Profile/actions";
import { recommendPost } from "@/redux/Profile/actions";
import config from "@/utils/config";
import baseUrl from "@/utils/baseUrl";
import toast from "@/components/Toast";

const { Text, Link } = Typography;

const ProfileShout = ({ onrecommendPost, ongetShoutout, shoutInfo }) => {
  const IconText = ({ postID, text }) => (
    <Space>
      <Button
        type="primary"
        onClick={() => recommendPost(postID)}
        shape="circle"
        icon={<LikeOutlined />}
      />
      <Text> {text}</Text>
    </Space>
  );

  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const dismiss = useCallback(() => {
    toast.dismiss();
  }, []);
  const updatePosts = (id, updatedMovieObj) => {
    return likeState.map((item, index) => {
      if (item._id !== id) {
        // This isn't the item we care about - keep it as-is
        return item;
      }
      const updatedState = [
        ...likeState.slice(0, index),
        updatedMovieObj,
        ...likeState.slice(index + 1),
      ];

      return setLikesState(updatedState);
    });
  };

  const recommendPost = (postID) => {
    const movieObj = likeState.find((x) => x._id === postID);
    const myID = sessionStorage.getItem("user_id");
    const found = movieObj.like?.find((element) => element == myID);

    if (found !== undefined) {
      notify("error", "You already like this post");
      return false;
    } else movieObj.like?.push(myID);
    updatePosts(postID, movieObj);
    onrecommendPost(postID, (res) => {
      if (res.success) {
        notify("success", res.msg);
      } else notify("error", res.msg);
    });
  };

  const myLoader = ({ src }) => {
    return src;
  };
  const imgurl = `http://${config.server}:${config.port}/avatar/`;
  const avatarurl = `http://${config.server}:${config.port}/avatar/`;

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [likeState, setLikesState] = useState();

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
          setLikesState(newData);
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
                                postID={item._id}
                                text={item?.like ? item.like.length : 0}
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
