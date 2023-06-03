import React, { useState, useEffect } from "react";
import Image from "next/image";
import { connect } from "react-redux";
import { UploadOutlined, LikeOutlined, PlusOutlined, DownloadOutlined } from "@ant-design/icons";
import {
  Image as Antimage, Divider, Button, Upload, message, Form, Row, Col, Avatar, Dropdown, Typography, List, Space, Skeleton, Mentions, Progress,
} from "antd";
import food from "@/public/images/landing/food.png";
import { useRouter } from "next/router";
import { votePoll } from "@/redux/Profile/actions";
import { apiBaseUrl } from "@/utils/baseUrl";
import useNotify from "@/hooks/useNotify";
import { profileService } from "@/services/index";
import useMedia from "@/hooks/useMedia";
import {
  downloadFile,
} from "@/redux/Mail/actions";
const { Text } = Typography;

const attachurl = `${apiBaseUrl}/avatar/`;

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
  onvotePoll,
  profileRole,
  ondownloadFile
}) => {

  const isWebDevice = useMedia('(min-width:700px)');
  const { notify } = useNotify();
  const pattern = /@\w+/g;
  const myLoader = ({ src }) => {
    return src;
  };
  const imgurl = `${apiBaseUrl}/avatar/`;
  const avatarurl = `${apiBaseUrl}/avatar/`;
  const [paginationInfo, setPageInfo] = useState({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  });
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [myallPhotos, setAllphotos] = useState([]);
  const [myprofilePoll, setProfilePoll] = useState([]);
  const [followAndFollowing, setfollowAndFollowing] = useState([]);
  const [activityInfo, setactivityInfo] = useState([]);
  const [list, setList] = useState([]);
  const router = useRouter();
  const profile = router.query?.profile;

  const onMenuClick = (e) => {
    ondownloadFile(e.key);
    window.open(attachurl + e.key, "_blank");
  };

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

  async function allActivities(id, count, search) {
    await profileService.getActivity(id, count, search)
      .then((res) => {
        if (res.success) {
          setInitLoading(false);
          setLoading(false);
          setactivityInfo(res);
          if (count !== 1) {
            const newData = data.concat(res.posts);
            setData(newData);
            setList(newData);
          }
          else {
            setData(res.posts);
            setList(res.posts);
          }
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

  async function initFunc(profileId) {
    const allphotos = await profileService.getAllphotos(profileId, paginationInfo);
    await setAllphotos(allphotos?.image.slice(0, 8));
    await profileService.updateProfileViewsCount(profileId);
    const followingList = await profileService.getFollowerAndFollowings();
    await setfollowAndFollowing(followingList?.data);
    await allActivities(profileId, 1, "");
    await profileService.getProfilePoll(profileId).then((res) => {
      setProfilePoll(res);
    }).catch((error) => {
      console.log(error?.response?.data?.message)
      return;
    });;

  }

  const totalPollVoteCount = myprofilePoll.votes?.reduce(
    (a, vote) => a + vote,
    0
  );
  const partnerPollQuestion = myprofilePoll.question;
  const partnerPollOptions = myprofilePoll.options?.reduce(
    (acc, option, index) => {
      const content = option;
      const voteCount = myprofilePoll.votes[index];
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
          user = item?.following;
        }

        if (item.follower) {
          user = item?.follower;
        }
        return user?.username;
      })
    )
  ).map((username) => ({
    label: username,
    value: username,
  }));

  useEffect(() => {
    initFunc(profile);
  }, [router.isReady, profile]);

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
      allActivities(profile, count, "");
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
        <Button onClick={onLoadMore}>Load More</Button>
      </div>
    ) : null;

  const view_user_id = router.query.profile;
  const [composeForm] = Form.useForm();
  const [upload_name, setUploadFile] = useState([]);

  async function onFinish(values) {
    const form_data = new FormData();
    upload_name.map((file) => form_data.append("images", file.originFileObj));
    form_data.append("content", values.message);

    const data = {
      userId: view_user_id,
      formData: form_data,
    };

    await profileService.postThink(data)
      .then((res) => {
        if (res.success) {
          composeForm.resetFields();
          setUploadFile([]);
          notify("success", res.msg);
          allActivities(profile, 1, "");
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

  const beforeUpload = (file) => {

    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/pdf';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG/PDF file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error('Attached File must smaller than 10MB!');
    }
    return isJpgOrPng && isLt2M;
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
                        <Form.Item name="fileupload"
                          help={`File must smaller than 10MB! Only accept ${process.env.NEXT_PUBLIC_IMAGE_ACCPET}.`}>
                          <Row>
                            <Col span={8} style={{
                              margin: 'auto'
                            }}>
                              <Upload
                                listType="picture"
                                method="get"
                                beforeUpload={beforeUpload}
                                {...props}
                                multiple

                              >
                                <Button
                                  icon={<UploadOutlined />}
                                  style={{ marginRight: 10 }}
                                >
                                  Upload Files
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
                                        <Space size={0} direction={isWebDevice ? "vertical" : 'horizontal'}>
                                          <a
                                            onClick={() => router.push(`/profile/${item?.from_user?._id}/activity`)}
                                            className="custom-userName">
                                            {item?.from_user?.businessname}
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                          </a>
                                          <span>
                                            @{item?.from_user?.username}
                                          </span>
                                        </Space>
                                        <Space>
                                          Posted to
                                          <a
                                            onClick={() => router.push(`/profile/${item?.to_user?._id}/activity`)}
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
                                    <div className="ql-snow">
                                      <div
                                        className="ql-editor"
                                        dangerouslySetInnerHTML={{
                                          __html: item.content.match(pattern) ? (item.content.match(pattern).map((mention, key) => {
                                            item.content = item.content.replace(mention, `<a style="cursor:pointer" href="/profile/${item.shortlist[key]}/activity">${mention}</a>`)
                                            if ((item.content.match(pattern)).length - 1 === key) {
                                              return item.content;
                                            }
                                          }
                                          )) : item.content
                                        }}
                                      />
                                    </div>
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
                                          item.status === "active" && item.mimetype === "image/jpeg" || item.mimetype === "image/png" || item.mimetype === "image/jpg" ?
                                            <Antimage
                                              key={index}
                                              loader={myLoader}
                                              width={"25%"}
                                              src={imgurl + item?.filepath}
                                            /> : ''
                                        ))}
                                      </Antimage.PreviewGroup>
                                      {item.image.filter((image) => image.mimetype === "application/pdf").length > 0 ?
                                        <Dropdown.Button
                                          menu={{
                                            items: item.image?.map((item) => ({
                                              key: item.filepath,
                                              label: item.filepath,
                                            })),
                                            onClick: onMenuClick,
                                          }}
                                          icon={<DownloadOutlined />}
                                        >
                                          PDF Files
                                        </Dropdown.Button> : ""}
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
                                        <Space size={0} direction={isWebDevice ? "vertical" : 'horizontal'}>
                                          <a
                                            onClick={() => router.push(`/profile/${item?.follower?._id}/activity`)}
                                            className="custom-userName">
                                            {item?.follower?.businessname}
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                          </a>
                                          <span>
                                            @{item?.follower?.username}
                                          </span>
                                        </Space>
                                        <Space>
                                          Followed
                                          <a
                                            onClick={() => router.push(`/profile/${item?.following?._id}/activity`)}
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
                        <div className="ql-snow">
                          <div
                            className="ql-editor"
                            dangerouslySetInnerHTML={{ __html: activityInfo && activityInfo?.about, }}
                          />
                        </div>
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
                            {partnerPollOptions?.map((item, index) => {
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
                            {myallPhotos &&
                              myallPhotos.map((image, index) => (
                                image.status === "active" ?
                                  <Antimage
                                    onClick={() => {
                                      console.log(234234)
                                    }}
                                    key={index}
                                    loader={myLoader}
                                    style={{
                                      padding: "2px",
                                    }}
                                    width={"25%"}
                                    src={imgurl + image?.filepath}
                                  /> : ''
                              ))}
                          </Antimage.PreviewGroup>
                        </div>
                        <div className="row">
                          <Divider orientation="center" plain>
                            <Button
                              onClick={() => router.push(`/profile/${view_user_id}/allphotos`)}
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
                                href={'https://' + activityInfo.social.facebook}
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
                                href={'https://' + activityInfo.social.twitter}
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
                                href={'https://' + activityInfo.social.snapchat}
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
                                href={'https://' + activityInfo.social.instagram}
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
                                href={'https://' + activityInfo.social.tiktok}
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
                                href={'https://' + activityInfo.social.website}
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
    followAndFollowing: user.followAndFollowing,
    profileRole: profile.headerInfo?.profile?.usertype,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onvotePoll: (id, option, cb) => dispatch(votePoll(id, option, cb)),
  ondownloadFile: (filename) => dispatch(downloadFile(filename)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileActivity);
