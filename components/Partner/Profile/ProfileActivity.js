import React, { useState, useEffect } from "react";
import Image from "next/image";
import { connect } from "react-redux";
import { UploadOutlined, LikeOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Image as Antimage,
  Divider,
  Button,
  Upload,
  message,
  Form,
  Row,
  Col,
  Avatar,
  Typography,
  List,
  Space,
  Skeleton,
  Mentions,
  Progress,
} from "antd";
import food from "@/public/images/landing/food.png";
import { useRouter } from "next/router";
import { getActivity, getProfilePoll, votePoll } from "@/redux/Profile/actions";
import { getFollowerAndFollowing, getmyFollowers } from "@/redux/User/actions";
import { postThink } from "@/redux/Profile/actions";
import { recommendPost } from "@/redux/Profile/actions";
import config from "@/utils/config";
import baseUrl from "@/utils/baseUrl";
import useNotify from "@/hooks/useNotify";
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

const ProfileActivity = ({
  onrecommendPost,
  ongetmyFollowers,
  ongetActivity,
  onpostThink,
  activityInfo,
  ongetProfilePoll,
  profilePoll,
  onvotePoll,
  ongetFollowerAndFollowings,
  followAndFollowing,
  profileRole,
}) => {
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

  const totalPollVoteCount = profilePoll.votes?.reduce(
    (a, vote) => a + vote,
    0
  );
  const partnerPollQuestion = profilePoll.question;
  const partnerPollOptions = profilePoll.options.reduce(
    (acc, option, index) => {
      const content = option;
      const voteCount = profilePoll.votes[index];
      const votePercentage = ((voteCount / totalPollVoteCount) * 100).toFixed(
        0
      );

      acc.push({
        content,
        votePercentage,
      });

      return acc;
    },
    []
  );

  const followAndFollowingList = Array.from(
    new Set(
      followAndFollowing?.map((item) => {
        let user;
        if (item.following) {
          user = item.following;
        }

        if (item.follower) {
          user = item.follower;
        }
        return user.username;
      })
    )
  ).map((username) => ({
    label: username,
    value: username,
  }));

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

  const router = useRouter();
  const profile = router.query?.profile;

  useEffect(() => {
    if (router.isReady) {
      const { profile } = router.query;
      ongetmyFollowers();
      ongetFollowerAndFollowings();
      ongetActivity(profile, 1, "", (res) => {
        if (res.success) {
          setInitLoading(false);
          setLoading(false);
          setData(res.posts);
          setList(res.posts);
          window.dispatchEvent(new Event("resize"));
        } else notify("error", res.msg);
      });
      ongetProfilePoll(profile);
    }
  }, [router.isReady]);

  useEffect(() => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(10)].map(() => ({
          loading: true,
          from: {},
        }))
      )
    );

    if (router.isReady) {
      const { profile } = router.query;
      ongetActivity(profile, count, "", (res) => {
        if (res.success) {
          const newData = data.concat(res.posts);
          setData(newData);
          setList(newData);
          setLoading(false);
          window.dispatchEvent(new Event("resize"));
        } else notify("error", res.msg);
      });
    }
  }, [count]);

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

  const view_user_id = router.query.profile;

  const [composeForm] = Form.useForm();

  const [upload_name, setUploadFile] = useState([]);

  const onFinish = (values) => {
    const form_data = new FormData();

    upload_name.map((file) => form_data.append("images", file.originFileObj));
    form_data.append("content", values.message);

    const data = {
      userId: view_user_id,
      formData: form_data,
    };

    onpostThink(data, (res) => {
      if (res.success) {
        composeForm.resetFields();
        notify("success", res.msg);
        ongetActivity(profile, 1, "", (res) => {
          if (res.success) {
            setInitLoading(false);
            setData(res.posts);
            setList(res.posts);
            window.dispatchEvent(new Event("resize"));
          } else notify("error", res.msg);
        });
      } else notify("error", res.msg);
    });
  };

  const props = {
    name: "upload",
    onChange(info) {
      if (info.file.status !== "uploading") {
        const fileUploadInfo = info.fileList;
        setUploadFile(fileUploadInfo);
      }

      if (info.file.status == "removed") {
        if (info.fileList.length == 0) setUploadFile("");
        else {
          const fileUploadInfo = info.fileList;
          setUploadFile(fileUploadInfo);
        }
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="blog-details-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-7 col-md-12">
            <div className="avatar-area green-color">
              <div className="avatar-respond">
                <div className="pin-post-header-section">
                  <div className="pin-post-label">
                    <p className="comment-notes">
                      <span id="email-notes">Let us know what you think!</span>
                    </p>
                  </div>
                  <div className="pin-post-logo">
                    <Image
                      src={food}
                      alt="blog-details"
                      width={50}
                      height={70}
                    />
                  </div>
                </div>
                <div className="avatar-form">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <Form
                        form={composeForm}
                        onFinish={onFinish}
                        layout="vertical"
                        autoComplete="off"
                      >
                        <Form.Item
                          name="message"
                          rules={[
                            {
                              required: true,
                              message: "Please input Message!",
                            },
                            {
                              whitespace: true,
                              message: "Please input Message!",
                            },
                          ]}
                        >
                          <Mentions
                            rows={7}
                            style={{
                              width: "100%",
                            }}
                            placeholder="input @ to mention user"
                            prefix={["@"]}
                            options={followAndFollowingList}
                          />
                        </Form.Item>
                        <Form.Item name="fileupload">
                          <Row>
                            <Col span={8}>
                              <Upload listType="picture" {...props}>
                                <Button
                                  icon={<UploadOutlined />}
                                  style={{ marginRight: 10 }}
                                >
                                  Upload a Photo
                                </Button>
                              </Upload>
                            </Col>
                            <Col span={8} offset={8}>
                              <Button
                                type="primary"
                                htmlType="submit"
                                className="btn-submit"
                                style={{
                                  display: "initial",
                                  float: "right",
                                  height: 50,
                                  padding: "10px 40px",
                                }}
                              >
                                POST
                              </Button>
                            </Col>
                          </Row>
                        </Form.Item>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                            actions={
                              item.type == "post" && [
                                <IconText
                                  postID={item._id}
                                  text={item.like ? item?.like?.count : 0}
                                  likePost={likePost}
                                  key="list-vertical-like-o"
                                />,
                              ]
                            }
                          >
                            <Skeleton
                              avatar
                              title={false}
                              loading={item.loading}
                              active
                            >
                              {item.type == "post" ? (
                                <>
                                  <List.Item.Meta
                                    avatar={
                                      <Avatar
                                        src={
                                          avatarurl +
                                          item?.from_user?.avatar?.filepath
                                        }
                                        size={64}
                                      />
                                    }
                                    title={
                                      <>
                                        <Space direction="vertical">
                                          <span className="custom-userName">
                                            {item?.from_user?.username}{" "}
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                          </span>
                                          <a
                                            onClick={() =>
                                              window.open(
                                                baseUrl +
                                                  "/profile/" +
                                                  item.from_user._id +
                                                  "/activity",
                                                "_blank"
                                              )
                                            }
                                          >
                                            @{item?.from_user?.username}
                                          </a>
                                        </Space>
                                        <Space>
                                          Posted to
                                          <a
                                            onClick={() =>
                                              window.open(
                                                baseUrl +
                                                  "/profile/" +
                                                  item?.to_user?._id +
                                                  "/activity",
                                                "_blank"
                                              )
                                            }
                                          >
                                            @{item?.to_user?.username}
                                          </a>
                                        </Space>
                                      </>
                                    }
                                    description={new Date(
                                      item?.createdAt
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
                                  <div className="custom-list-content">
                                    {item.content}
                                  </div>
                                  {item.image ? (
                                    <div
                                      className="custom-list-content"
                                      style={{
                                        marginTop: 10,
                                      }}
                                    >
                                      <Antimage.PreviewGroup>
                                        {item.image.map((item, index) => (
                                          <Antimage
                                            key={index}
                                            loader={myLoader}
                                            width={"25%"}
                                            src={imgurl + item?.filepath}
                                          />
                                        ))}
                                      </Antimage.PreviewGroup>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </>
                              ) : (
                                <>
                                  <List.Item.Meta
                                    avatar={
                                      <Avatar
                                        src={
                                          avatarurl +
                                          item?.follower?.avatar?.filepath
                                        }
                                        size={64}
                                      />
                                    }
                                    title={
                                      <>
                                        <Space direction="vertical">
                                          <span className="custom-userName">
                                            {item?.follower?.username}{" "}
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                          </span>
                                          <a
                                            onClick={() =>
                                              window.open(
                                                baseUrl +
                                                  "/profile/" +
                                                  item.follower._id +
                                                  "/activity",
                                                "_blank"
                                              )
                                            }
                                          >
                                            @{item?.follower?.username}
                                          </a>
                                        </Space>
                                        <Space>
                                          Followed
                                          <a
                                            onClick={() =>
                                              window.open(
                                                baseUrl +
                                                  "/profile/" +
                                                  item?.follower?._id +
                                                  "/activity",
                                                "_blank"
                                              )
                                            }
                                          >
                                            @{item?.following?.username}
                                          </a>
                                        </Space>
                                      </>
                                    }
                                    description={new Date(
                                      item?.updatedAt
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
                                  <div className="custom-list-content"></div>
                                </>
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
          <div className="col-xl-4 col-lg-5 col-md-12">
            <div className="left-sidebar">
              <aside className="widget-area">
                <div className="avatar-area green-color">
                  <div className="avatar-respond">
                    <div
                      className="pin-post-header-section"
                      style={{
                        display: "block",
                      }}
                    >
                      <div className="pin-about-section">
                        <h4 className="comment-notes">
                          <span id="email-notes">About Us</span>
                        </h4>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: activityInfo && activityInfo?.about,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  {profileRole == "partner" && (
                    <div className="avatar-respond">
                      <div
                        className="pin-post-header-section"
                        style={{
                          display: "block",
                        }}
                      >
                        <div className="pin-about-section">
                          <h4 className="comment-notes">
                            <span id="email-notes">Partner Poll</span>
                            <p className="total-votes-count">
                              {totalPollVoteCount}&nbsp;votes
                            </p>
                          </h4>
                          <p className="partner-poll-question">
                            {partnerPollQuestion}
                          </p>
                          <div className="partner-poll-options">
                            {partnerPollOptions.map((item, index) => {
                              return (
                                <div key={index}>
                                  <Space.Compact block size="small">
                                    <Text
                                      style={{
                                        width: "calc(100% - 200px)",
                                      }}
                                    >
                                      {" "}
                                      {item.content}
                                    </Text>

                                    <Button
                                      onClick={() => {
                                        onvotePoll(
                                          profile,
                                          index,
                                          (_, error) => {
                                            if (error) {
                                              notify(
                                                "error",
                                                error?.response?.data
                                                  ?.message ||
                                                  "Something went wrong"
                                              );
                                              return;
                                            }

                                            notify(
                                              "success",
                                              "Successfully voted"
                                            );
                                          }
                                        );
                                      }}
                                      icon={<PlusOutlined />}
                                    />
                                  </Space.Compact>
                                  <Progress
                                    percent={item.votePercentage}
                                    showInfo={false}
                                    strokeColor="#1677FF"
                                    trailColor="black"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="avatar-respond">
                    <div className="pin-post-header-section">
                      <div className="pin-about-section">
                        <h4 className="comment-notes">
                          <span id="email-notes">Photos</span>
                        </h4>
                        <div className="row">
                          <Antimage.PreviewGroup>
                            {activityInfo?.image &&
                              activityInfo.image.map((image, index) => (
                                <Antimage
                                  key={index}
                                  loader={myLoader}
                                  width={"25%"}
                                  src={imgurl + image?.filepath}
                                />
                              ))}
                          </Antimage.PreviewGroup>
                        </div>
                        <div className="row">
                          <Divider orientation="center" plain>
                            <Button
                              onClick={() =>
                                window.open(
                                  baseUrl +
                                    "/profile/" +
                                    view_user_id +
                                    "/allphotos",
                                  "_blank"
                                )
                              }
                              type="link"
                            >
                              View All Photos
                            </Button>
                          </Divider>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="avatar-respond">
                    <div className="pin-post-header-section">
                      <div className="pin-about-section">
                        <h4 className="comment-notes">
                          <span id="email-notes">Social Links</span>
                        </h4>
                        <ul className="social-links">
                          {activityInfo?.social?.facebook ? (
                            <li>
                              <a
                                href={activityInfo.social.facebook}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="flaticon-facebook-app-symbol"></i>
                              </a>
                            </li>
                          ) : (
                            ""
                          )}
                          {activityInfo?.social?.twitter ? (
                            <li>
                              <a
                                href={activityInfo.social.twitter}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="flaticon-twitter"></i>
                              </a>
                            </li>
                          ) : (
                            ""
                          )}
                          {activityInfo?.social?.snapchat ? (
                            <li>
                              <a
                                href={activityInfo.social.snapchat}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="flaticon-snapchat"></i>
                              </a>
                            </li>
                          ) : (
                            ""
                          )}
                          {activityInfo?.social?.instagram ? (
                            <li>
                              <a
                                href={activityInfo.social.instagram}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="flaticon-instagram"></i>
                              </a>
                            </li>
                          ) : (
                            ""
                          )}
                          {activityInfo?.viewInfo?.profile?.social?.tiktok ? (
                            <li>
                              <a
                                href={activityInfo.social.tiktok}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="flaticon-tik-tok"></i>
                              </a>
                            </li>
                          ) : (
                            ""
                          )}
                          {activityInfo?.social?.website ? (
                            <li>
                              <a
                                href={activityInfo.social.website}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="bx bx-world"></i>
                              </a>
                            </li>
                          ) : (
                            ""
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ profile, user }) => {
  return {
    activityInfo: profile.activityInfo,
    myfollowerList: user.myFollowers?.followers || [],
    profilePoll: profile.profilePoll,
    followAndFollowing: user.followAndFollowing,
    profileRole: profile.headerInfo?.profile?.usertype,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onpostThink: (data, cb) => dispatch(postThink(data, cb)),
  onrecommendPost: (id, cb) => dispatch(recommendPost(id, cb)),
  ongetActivity: (data, count, search, cb) =>
    dispatch(getActivity(data, count, search, cb)),
  ongetmyFollowers: () => dispatch(getmyFollowers()),
  ongetProfilePoll: (id) => dispatch(getProfilePoll(id)),
  onvotePoll: (id, option, cb) => dispatch(votePoll(id, option, cb)),
  ongetFollowerAndFollowings: (cb) => dispatch(getFollowerAndFollowing(cb)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileActivity);
