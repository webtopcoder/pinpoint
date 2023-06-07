import React, { useEffect, useState } from "react";
import Image from "next/image";
import { connect } from "react-redux";
import {
  UploadOutlined,
  EnvironmentFilled,
  LikeOutlined,
  EnvironmentOutlined,
  DownOutlined,
  ClockCircleFilled,
  MessageOutlined,
  UpOutlined,
} from "@ant-design/icons";
import {
  Image as Antimage, Button, Form, Row, Col, Avatar, Typography, Space, Mentions, Layout, Card, List, Skeleton, Rate, message, Upload, Badge, Divider
} from "antd";
import food from "@/public/images/landing/food.png";
import { apiBaseUrl } from "@/utils/baseUrl";
import {
  checkInArrival,
  likeArrival,
  likeLocationReview,
  postReview,
  getLocationById,
} from "@/src/redux/Location/actions";
import useNotify from "@/hooks/useNotify";
import { useRouter } from "next/router";
import useMedia from "@/hooks/useMedia";
import Comments from "@/components/Layout/comments/CommentsAll";
import { commentService, locationService } from "@/services/index";

const { Meta } = Card;
const { Title } = Typography;

const { Content } = Layout;
const { Text } = Typography;

const IconText = ({ reviewId, text, likeReview }) => {
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
        onClick={() => {
          likeReview(reviewId, (liked) => {
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

const CommentBody = ({ item, likePost, user_id }) => {

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
          postID={item._id}
          text={item.like ? item?.like?.count : 0}
          likePost={likePost}
          icon={<LikeOutlined />}
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
            {expandComments ? <UpOutlined /> : <DownOutlined />}
            View Comments
          </Button>
        </Space>
      </div>
      <Comments currentUserId={user_id} expand={expand} setExpandComments={setExpandComments} expandComments={expandComments} setCommentCount={setCommentCount} type="shoutout" id={item._id} />
    </>
  );
};

const LikeArrvial = ({ likeArrival, arrvialID, text }) => {
  const [like, setLike] = useState(text);
  const isWebDevice = useMedia('(min-width:700px)');
  useEffect(() => {
    setLike(text);
  }, [text]);
  return (
    <Space style={{
      float: isWebDevice ? '' : 'right'
    }}>
      <Button
        type="primary"
        onClick={() => {
          likeArrival(arrvialID, (liked) => {
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

const imgurl = `${apiBaseUrl}/avatar/`;
const avatarurl = `${apiBaseUrl}/avatar/`;

const PartnerLocation = ({
  // location,
  onPostReview,
  getLocationInfo,
  likeReview,
  onLikeArrival,
  onCheckInArrival,
  checkIncount,
  expiredArrivals,
  userRole,
  user_id
}) => {

  const router = useRouter();
  const { notify } = useNotify();
  const [reviews, setReviews] = useState([]);
  const [expand, setExpand] = useState(false);
  const [location, setLocationInfo] = useState();

  useEffect(() => {
    if (router.isReady) {
      const locationId = router.query.location;
      // getLocationInfo({ id: locationId, expand: expand }, (_, err) => {
      //   if (err) {
      //     notify(
      //       "error",
      //       err?.response?.data?.message || "Something went wrong"
      //     );
      //   }
      // });

      locationService.getLocationInfo({ id: locationId, expand: expand })
        .then((res) => {
          console.log(res)
          setLocationInfo(res)
          if (res.location.reviews) {
            const activeReviews = res.location.reviews.reduce(
              (acc, option, index) => {
                option.status === "active" ? acc.push(option) : ''
                return acc;
              },
              []
            );
            setReviews(temporarySwapHalf(activeReviews));
          }
        })
        .catch((error) => {
          notify(
            "error",
            error?.response?.data?.message || "Something went wrong"
          );
          return;
        });
    }
  }, [router.isReady, expand]);

  // useEffect(() => {
  //   if (location.location.reviews) {
  //     const activeReviews = location.location.reviews.reduce(
  //       (acc, option, index) => {
  //         option.status === "active" ? acc.push(option) : ''
  //         return acc;
  //       },
  //       []
  //     );
  //     setReviews(temporarySwapHalf(activeReviews));
  //   }
  // }, [location.location.reviews]);

  return (
    <Layout
      className="site-layout"
      style={{
        background: "#000000",
      }}
    >
      <Content>
        <div
          className="container"
          style={{
            paddingTop: 100,
          }}
        >
          <LocationBanner
            location={location}
            userRole={userRole}
            setLocationInfo={setLocationInfo}
          />
          <Row justify={"center"}>
            <div className="col-xl-8 col-lg-7 col-md-12">
              {location?.location?.isActive ? (
                <ArrivalBanner
                  location={location?.location}
                  onLikeArrival={onLikeArrival}
                  onCheckInArrival={onCheckInArrival}
                  checkIncount={checkIncount}
                />
              ) : (
                ""
              )}
              <PostForm
                location={location?.location}
                onPostReview={onPostReview}
                getLocationInfo={getLocationInfo}
                expand={expand}
              />
              {expiredArrivals.arrivalData?.length > 0 ? (
                <ExpiredArrivalBanner
                  location={location?.location}
                  arrivals={expiredArrivals}
                  onLikeArrival={onLikeArrival}
                  onCheckInArrival={onCheckInArrival}
                  checkIncount={checkIncount}
                  expand={expand}
                  setExpand={setExpand}
                />
              ) : (
                ""
              )}
              <div className="avatar-area green-color">
                <Divider className="review-divider" style={{
                  color: "#fff",
                }} orientation="left">Reviews</Divider>
                <div className="avatar-respond">
                  <div className="avatar-form">
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12">
                        <List
                          itemLayout="vertical"
                          size="large"
                          dataSource={reviews}
                          renderItem={(item, index) => (
                            <Post
                              key={index}
                              router={router}
                              review={item}
                              likeReview={likeReview}
                              location={location}
                              user_id={user_id}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

function ExpiredArrivalBanner({ location, arrivals, onLikeArrival, expand, setExpand }) {
  const isWebDevice = useMedia('(min-width:700px)');
  return (
    <div>
      <div className="avatar-area green-color">
        {arrivals?.arrivalData.map((arrival, index) => (
          <div className="avatar-respond">
            <div style={{ display: "flex" }} className="pin-post-header-section">
              <div className="pin-post-label">
                <p className="comment-notes">
                  <Avatar
                    style={{
                      cursor: "pointer",
                      background: "rgb(223 216 216)",
                    }}
                    size={64}
                    icon={
                      location.images?.length !== 0 &&
                        location.images[0]?.filepath ? (
                        <Image
                          src={avatarurl + location.images[0]?.filepath}
                          height={64}
                          width={64}
                          alt="avatar"
                        />
                      ) : ""
                    }>
                    {location.images?.length !== 0 &&
                      location.images[0]?.filepath ? "" : 'No Photo'}
                  </Avatar>
                  <p style={{ display: "inline-block", marginLeft: "10px" }}>
                    {location?.title}
                    <span style={{ marginLeft: "15px" }}>
                      <div
                        style={{
                          height: "15px",
                          width: "15px",
                          backgroundColor: "#ff0000",
                          borderRadius: "50%",
                          display: "inline-block",
                          marginRight: "5px",
                          verticalAlign: "middle",
                        }}
                      />
                      <p
                        style={{
                          fontSize: "10px",
                          verticalAlign: "middle",
                          display: "inline",
                        }}
                      >
                        at {arrival?.location?.mapLocation?.city}
                      </p>
                    </span>
                  </p>
                </p>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ marginTop: "20px" }}>{arrival.arrivalText}</div>
              <div style={{ marginLeft: "auto" }}>
                {
                  arrival?.images[0]?.filepath ? (
                    <Image
                      src={imgurl + arrival?.images[0]?.filepath}
                      height="100px"
                      width="100px"
                      alt="avatar"
                    />
                  ) : ""
                }

              </div>
            </div>
            <div style={{ display: isWebDevice ? "flex" : "block", marginTop: "30px" }}>
              <div>
                {new Date(arrival?.departureAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  hour12: true,
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </div>
              <div style={{ marginLeft: "auto", order: "2" }}>
                <Button disabled style={{ marginRight: "10px", cursor: "auto" }}>
                  {arrival.checkIn.length} checked in
                </Button>
                <LikeArrvial
                  likeArrival={onLikeArrival}
                  arrvialID={arrival.id}
                  text={arrival.like ? arrival.like.count : 0}
                  key="list-vertical-like-o"
                />
              </div>
            </div>
          </div>
        ))}
        {arrivals?.total > 3 ?
          <a
            style={{
              marginTop: 15,
              display: 'block',
              textAlign: 'center',
              fontSize: 15,
              color: "rgb(255 255 255)"
            }}
            onClick={() => {
              setExpand(!expand);
            }}
          ><DownOutlined rotate={expand ? 180 : 0} /> {expand ? "Hide" : `Show All(${arrivals?.total})`}
          </a> : ""}
      </div>
    </div>
  );
}

function ArrivalBanner({ location, onLikeArrival, onCheckInArrival, checkIncount }) {

  const { notify } = useNotify();
  const arrivalText = location?.isArrival?.arrivalText;
  const arrivalImage = location?.isArrival?.images[0]?.filepath;
  const arrivalID = location?.isArrival?.id;
  const date = location?.updatedAt;
  const isWebDevice = useMedia('(min-width:700px)');

  async function CheckInArrival() {
    setaction('liked');
    await locationService.CheckInArrival(arrivalID)
      .then((res) => {
        if (res.liked) {
          setlikes((likes) => likes + 1);
        } else {
          setlikes((likes) => (likes ? likes - 1 : likes));
        }
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }

  return (
    <div>
      <div className="avatar-area green-color">
        <div className="avatar-respond">
          <div style={{ display: "flex" }} className="pin-post-header-section">
            <div className="pin-post-label">
              {/* <Card
                style={{
                  marginTop: 16,
                  border: "0px",
                }}
            
              // loading={loading}
              >
                <Meta
                  avatar={
                    location.images.length !== 0 &&
                      location.images[0]?.filepath ? (
                      <Avatar
                        height={64}
                        width={64}
                        src={avatarurl + location.images[0]?.filepath}
                      />
                    ) : (
                      <Avatar size={64} icon={<UserOutlined />} />
                    )
                  }
                  title={<Title level={4}>{location?.title}</Title>}
                  description={
                    <Space direction="vertical" size="middle">
                      <Title level={5}> at {location?.mapLocation?.city}</Title>
                    </Space>
                  }
                />
              </Card> */}

              <p className="comment-notes">
                <Avatar
                  style={{
                    cursor: "pointer",
                    background: "rgb(223 216 216)",
                  }}
                  size={64}
                  icon={
                    location.images.length !== 0 &&
                      location.images[0]?.filepath ? (
                      <Image
                        src={avatarurl + location.images[0]?.filepath}
                        height={64}
                        width={64}
                        alt="avatar"
                      />
                    ) : ""
                  }>
                  {location.images?.length !== 0 &&
                    location.images[0]?.filepath ? "" : 'No Photo'}
                </Avatar>
                <p style={{ display: "inline-block", marginLeft: "10px" }}>
                  {location?.title}
                  <span style={{ marginLeft: "15px" }}>
                    <div
                      style={{
                        height: "15px",
                        width: "15px",
                        backgroundColor: location?.isActive
                          ? "#05ff00"
                          : "#ff0000",
                        borderRadius: "50%",
                        display: "inline-block",
                        marginRight: "5px",
                        verticalAlign: "middle",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "10px",
                        verticalAlign: "middle",
                        display: "inline",
                      }}
                    >
                      at {location?.mapLocation?.city}
                    </p>
                  </span>
                </p>
              </p>
            </div>
            <div style={{ marginLeft: "auto", order: "2" }}>
              <Button
                onClick={() => {
                  onCheckInArrival(arrivalID, (res, err) => {
                    if (err) {
                      notify("error", err?.response?.data?.message || "Error");
                    }
                    notify(res.type, res.message);
                  });
                }}
              >
                Check In
              </Button>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ marginTop: "20px" }}>{arrivalText}</div>
            <div style={{ marginLeft: "auto" }}>
              {
                arrivalImage ? (
                  <Image
                    src={imgurl + arrivalImage}
                    height="100px"
                    width="100px"
                    alt="img"
                  />
                ) : ""
              }
            </div>
          </div>
          <div style={{ display: isWebDevice ? "flex" : "block", marginTop: "30px" }}>
            <div>
              {new Date(date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                hour12: true,
                minute: "2-digit",
                second: "2-digit",
              })}
            </div>

            <div style={{ marginLeft: "auto", order: "2" }}>
              <Button disabled style={{ marginRight: "10px", cursor: "auto" }}>
                {checkIncount} checked in
              </Button>
              <LikeArrvial
                likeArrival={onLikeArrival}
                arrvialID={arrivalID}
                text={location.isArrival.like ? location.isArrival.like.count : 0}
                key="list-vertical-like-o"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostForm({ location, onPostReview, getLocationInfo, expand }) {
  const [rating, setRating] = useState(0);
  const [postForm] = Form.useForm();
  const isWebDevice = useMedia('(min-width:700px)');
  const [uploadFile, setUploadFile] = useState([]);
  const uploadProps = {
    name: "upload",
    onChange(info) {
      if (info.file.status !== "uploading") {
        const fileUploadInfo = info.fileList;
        setUploadFile(fileUploadInfo);
      }

      if (info.file.status == "removed") {
        if (info.fileList.length == 0) setUploadFile([]);
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

  const { notify } = useNotify();
  return (
    <div className="avatar-area green-color">
      <div className="avatar-respond">
        <div className="pin-post-header-section">
          <div className="pin-post-label">
            <p className="comment-notes">
              <span id="email-notes">Just a quick description about your arrival today!</span>
            </p>
          </div>
          <div className="pin-post-logo">
            <Image src={food} alt="blog-details" width={50} height={70} />
          </div>
        </div>
        <div className="avatar-form">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <Form
                form={postForm}
                initialValues={
                  {
                    rating: 0
                  }
                }
                onFinish={(values) => {
                  const formData = new FormData();
                  formData.append("rating", rating);
                  formData.append("text", values.text);
                  uploadFile.forEach((file) => {
                    formData.append("images", file.originFileObj);
                  });
                  onPostReview(location._id, formData, (_, error) => {
                    if (error) {
                      notify(
                        "error",
                        error?.response?.data?.message || "Something went wrong"
                      );
                    } else {
                      postForm.resetFields();
                      setRating(0);
                      setUploadFile([]);
                      notify("success", "Review posted successfully");
                      getLocationInfo({ id: location._id, expand: expand }, (_, error) => {
                        if (error) {
                          notify(
                            "error",
                            error?.response?.data?.message ||
                            "Something went wrong"
                          );
                        }
                      });
                    }
                  });
                }}
                layout="vertical"
                autoComplete="off"
              >
                <Form.Item
                  name="text"
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
                  // placeholder="input @ to mention user"
                  // prefix={["@"]}
                  />
                </Form.Item>
                <Row>
                  <Col xs={12} sm={12} md={8} lg={8} xl={8} >
                    <Form.Item name="images">
                      <Upload listType="picture" method="get" {...uploadProps}>
                        <Button
                          icon={<UploadOutlined />}
                          style={{ marginRight: 10 }}
                        >
                          Click to Upload
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col xs={11} sm={11} md={8} lg={8} xl={8} offset={isWebDevice ? 0 : 1} >
                    <Form.Item name="rating">
                      <Rate
                        allowHalf
                        tooltips={[
                          "terrible",
                          "bad",
                          "normal",
                          "good",
                          "wonderful",
                        ]}
                        onChange={setRating}
                        value={rating}
                        allowClear={false}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={12} sm={12} md={8} lg={8} xl={8} offset={isWebDevice ? 0 : 11} >
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
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Post({ review, likeReview, location, router, user_id }) {
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
              <Space direction="vertical">
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
        <CommentBody item={review} likePost={likeReview} user_id={user_id} />
      </Skeleton>
    </List.Item>
  );
}

function LocationBanner({
  location,
  userRole,
  setLocationInfo
}) {
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');

  async function favoriteLocation(flag) {
    await locationService.favoriteLocation(location.location._id, flag)
      .then(() => {
        setLocationInfo(prevState => ({
          ...prevState,
          isFavorite: flag ? true : false
        }));
        console.log(location)
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }

  if (!location?.location) return <Skeleton active />;
  return (
    <>
      <Row>
        <Col span={isWebDevice ? 18 : 24} offset={isWebDevice ? 3 : 0} style={{}}>
          <Badge.Ribbon
            text={location?.location.isActive ? "Active" : "Inactive"}
            placement="start"
            color={location?.location.isActive ? "green" : "red"}
          >
            <Card
              style={{
                color: "white",
                cursor: "pointer",
              }}
              headStyle={{
                color: "white",
                textAlign: "center",
              }}
              className="partner-locations-card"
            >
              <Row
                gutter={16}
                style={{
                  textAlign: "center",
                }}
              >
                <Col xs={0} sm={0} md={8} lg={8} xl={8}>
                  <Space>
                    <Rate
                      disabled
                      allowHalf
                      tooltips={[
                        "terrible",
                        "bad",
                        "normal",
                        "good",
                        "wonderful",
                      ]}
                      value={location?.location.rating}
                    />
                  </Space>
                </Col>
                <Col
                  xs={24} sm={24} md={8} lg={8} xl={8}
                  style={{
                    top: -100,
                  }}
                >
                  <Space size="small" direction="vertical">
                    <Avatar
                      style={{
                        cursor: "pointer",
                        background: "rgb(223 216 216)",
                      }}
                      size={150}
                      icon={
                        location.location.images?.length > 0 &&
                          location.location.images[0]?.filepath ? (
                          <Image
                            src={avatarurl + location.location.images[0]?.filepath}
                            height={200}
                            width={200}
                            alt="locationImage"
                          />
                        ) : (
                          <EnvironmentFilled />
                        )
                      }
                    />
                    <Text
                      style={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: 20,
                      }}
                    >
                      {location?.location.title}
                    </Text>
                    {isWebDevice ? '' :
                      <Rate
                        disabled
                        allowHalf
                        tooltips={[
                          "terrible",
                          "bad",
                          "normal",
                          "good",
                          "wonderful",
                        ]}
                        value={location?.location.rating}
                      />}

                  </Space>
                </Col>
                <Col
                  span="24"
                  style={{
                    top: -60,
                  }}
                >
                  <Space direction="vertical" className="gutter-row" span={24}>
                    <Space>
                      <Text
                        style={{
                          color: "white",
                        }}
                      >
                        {location?.location.description}
                      </Text>
                    </Space>
                    <Space>
                      <Text
                        style={{
                          color: "white",
                        }}
                      >
                        <ClockCircleFilled />&nbsp;&nbsp;
                        {location?.location.isActive ? "Departure Time" : "Last Departure"}
                        : {
                          new Date(location?.location.departureAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            hour12: true,
                            minute: "2-digit",
                            second: "2-digit",
                          })
                        }
                      </Text>
                    </Space>
                    <Space direction="vertical">
                      <Text
                        style={{
                          color: "white",
                        }}
                      >
                        <EnvironmentOutlined /> {location?.location.mapLocation?.address}
                      </Text>
                    </Space>
                  </Space>
                </Col>
                <Col span={isWebDevice ? 3 : 0} />
                <Col
                  span={isWebDevice ? 18 : 24}
                  style={{
                    top: -5,
                  }}
                >
                  <Space>
                    <Text
                      style={{
                        color: "white",
                      }}
                    >
                      {location?.location.subCategories
                        ?.map((item) => item.name)
                        .join(", ")}
                    </Text>
                  </Space>
                </Col>
                {userRole !== "partner" ?
                  <Col span={8}>
                    <Space direction="vertical">
                      {location.isFavorite ? (
                        <Button
                          style={{
                            marginRight: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() => favoriteLocation(false)}
                        >
                          Remove from Favorites
                        </Button>
                      ) : (
                        <Button
                          style={{
                            marginRight: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() => favoriteLocation(true)}

                        >
                          Add to Favorites
                        </Button>
                      )}
                    </Space>
                  </Col> : ''}
              </Row>
            </Card>
          </Badge.Ribbon>
        </Col>
      </Row>
    </>
  );
}

function temporarySwapHalf(array) {
  var left = null;
  var right = null;
  var length = array.length;
  for (left = 0; left < length / 2; left += 1) {
    right = length - 1 - left;
    var temporary = array[left];
    array[left] = array[right];
    array[right] = temporary;
  }
  return array;
}

const mapStateToProps = (state) => ({
  // location: state.location.location,
  checkIncount: state.location.checkIncount,
  expiredArrivals: state.location.expiredArrivals,
  userRole: state.user.role,
  user_id: state.user.user_id,
});

const mapDispatchToProp = (dispatch) => {
  return {
    getLocationInfo: (id, cb) => dispatch(getLocationById(id, cb)),
    onPostReview: (locationId, form, cb) =>
      dispatch(postReview(locationId, form, cb)),
    likeReview: (reviewId, cb) => dispatch(likeLocationReview(reviewId, cb)),
    onLikeArrival: (arrivalID, cb) => dispatch(likeArrival(arrivalID, cb)),
    onCheckInArrival: (locationId, cb) =>
      dispatch(checkInArrival(locationId, cb)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(PartnerLocation);
