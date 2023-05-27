import useNotify from "@/hooks/useNotify";
import { getShoutout } from "@/redux/Profile/actions";
import { apiBaseUrl } from "@/utils/baseUrl";
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
                                    <Space direction="vertical">
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
                                      image.status === "active" ?
                                        <Antimage
                                          loader={myLoader}
                                          width={"25%"}
                                          src={imgurl + image.filepath}
                                          key={index}
                                        /> : ''
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
  ongetShoutout: (data, count, search, cb) =>
    dispatch(getShoutout(data, count, search, cb)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileShout);
