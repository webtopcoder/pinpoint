import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { connect } from "react-redux";
import { UploadOutlined, LikeOutlined } from "@ant-design/icons";
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
} from "antd";
import food from "@/public/images/landing/food.png";
import { useRouter } from "next/router";
import { getActivity } from "@/redux/Profile/actions";
import { getmyFollowers } from "@/redux/User/actions";
import { postThink } from "@/redux/Profile/actions";
import { recommendPost } from "@/redux/Profile/actions";
import toast from "@/components/Toast";
import config from "@/utils/config";
import baseUrl from "@/utils/baseUrl";
const { Text, Link } = Typography;

const ProfileActivity = ({
  onrecommendPost,
  ongetmyFollowers,
  ongetActivity,
  onpostThink,
  activityInfo,
  myfollowerList,
}) => {
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

  const myLoader = ({ src }) => {
    return src;
  };
  const imgurl = `http://${config.server}:${config.port}/post/`;
  const avatarurl = `http://${config.server}:${config.port}/avatar/`;

  const [prefix, setPrefix] = useState("@");
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [likeState, setLikesState] = useState();

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

  const router = useRouter();

  const recommendPost = (postID) => {
    const movieObj = likeState.find((x) => x._id === postID);
    const myID = sessionStorage.getItem("user_id");
    const found = movieObj?.like?.find((element) => element == myID);

    if (found !== undefined) {
      notify("error", "You already like this post");
      return false;
    }

    if (myID == movieObj?.from_user._id) {
      notify("error", "You can not like your post");
      return false;
    } else movieObj?.like?.push(myID);
    updatePosts(postID, movieObj);

    onrecommendPost(postID, (res) => {
      if (res.success) {
        notify("success", res.msg);
      } else notify("error", res.msg);
    });
  };

  useEffect(() => {
    if (router.isReady) {
      const { profile } = router.query;
      ongetmyFollowers();
      ongetActivity(profile, 1, "", (res) => {
        if (res.success) {
          setInitLoading(false);
          setData(res.posts);
          setList(res.posts);
          window.dispatchEvent(new Event("resize"));
          setLikesState(res.posts);
        } else notify("error", res.msg);
      });
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
          setLikesState(res.posts);
          window.dispatchEvent(new Event("resize"));
        } else notify("error", res.msg);
      });
    }
  }, [count]);

  // useEffect(() => {
  //     window.addEventListener('scroll', scrollmore);
  // }, []);

  // const scrollmore = () => {
  //     setCount(count + 1);
  //     if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
  //         setLoading(true);
  //         setList(
  //             data.concat(
  //                 [...new Array(10)].map(() => ({
  //                     loading: true,
  //                     from: {},
  //                 })),
  //             ),
  //         );
  //         const { profile } = router.query;

  //         ongetActivity(profile, count, '', res => {
  //             if (res.success) {
  //                 const newData = data.concat(res.posts);
  //                 setData(newData);
  //                 setList(newData);
  //                 setLoading(false);
  //                 window.dispatchEvent(new Event('resize'));
  //             }
  //             else notify("error", res.msg)
  //         });
  //     }
  // }

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

  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const dismiss = useCallback(() => {
    toast.dismiss();
  }, []);
  const view_user_id = router.query.profile;

  const [composeForm] = Form.useForm();

  const [upload_name, setUploadFile] = useState([]);

  const onFinish = (values) => {
    const form_data = new FormData();

    upload_name.map((file, index) =>
      form_data.append("image", file.originFileObj)
    );
    form_data.append("content", values.message);
    form_data.append("userid", view_user_id);

    onpostThink(form_data, (res) => {
      if (res.success) {
        composeForm.resetFields();
        notify("success", res.msg);
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
                            options={(
                              (myfollowerList && myfollowerList[0]?.[prefix]) ||
                              []
                            ).map((value) => ({
                              key: value,
                              value,
                              label: value,
                            }))}
                          />
                        </Form.Item>
                        <Form.Item name="fileupload">
                          <Row>
                            <Col span={8}>
                              <Upload
                                method="get"
                                listType="picture"
                                {...props}
                              >
                                <Button
                                  icon={<UploadOutlined />}
                                  style={{ marginRight: 10 }}
                                >
                                  Click to Upload
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
                            actions={[
                              item?.type == "post" ? (
                                <IconText
                                  postID={item._id}
                                  text={item?.like ? item.like.length : 0}
                                  key="list-vertical-like-o"
                                />
                              ) : (
                                ""
                              ),
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
                                    src={avatarurl + item?.from_user?.avatar}
                                    size={64}
                                  />
                                }
                                // title={<a onClick={() => window.open(baseUrl + '/user/' + item.from_user._id + '/activity', '_blank')}>{item?.from_user?.realname?.first + '  ' + item?.from_user?.realname?.last} / @{item?.from_user?.username}</a>}
                                title={
                                  <>
                                    <span className="custom-userName">
                                      {item?.from_user?.realname.first +
                                        " " +
                                        item?.from_user?.realname.last}{" "}
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                    </span>
                                    <span className="custom-shoutout-text">
                                      {item?.type !== "post"
                                        ? item.other_content
                                        : ""}
                                    </span>
                                    <br />
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
                                {item?.type == "post"
                                  ? item?.content
                                  : item?.other}
                              </div>
                              {item.image ? (
                                <div
                                  className="custom-list-content"
                                  style={{
                                    marginTop: 10,
                                  }}
                                >
                                  <Antimage.PreviewGroup>
                                    {item.image.map((item, index) => {
                                      <Antimage
                                        loader={myLoader}
                                        width={"25%"}
                                        src={imgurl + "/" + item}
                                      />;
                                    })}
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
                          <span id="email-notes">About Me</span>
                        </h4>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: activityInfo && activityInfo?.about,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="avatar-respond">
                    <div className="pin-post-header-section">
                      <div className="pin-about-section">
                        <h4 className="comment-notes">
                          <span id="email-notes">Photos</span>
                        </h4>
                        <div className="row">
                          <Antimage.PreviewGroup>
                            {activityInfo?.image &&
                              activityInfo.image.map((image, index) => {
                                <Antimage
                                  loader={myLoader}
                                  width={"25%"}
                                  src={imgurl + "/" + image}
                                />;
                              })}
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
    myfollowerList: user.myFollowers.followers,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onpostThink: (data, cb) => dispatch(postThink(data, cb)),
  onrecommendPost: (id, cb) => dispatch(recommendPost(id, cb)),
  ongetActivity: (data, count, search, cb) =>
    dispatch(getActivity(data, count, search, cb)),
  ongetmyFollowers: () => dispatch(getmyFollowers()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileActivity);
