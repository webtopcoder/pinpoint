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
  TagFilled,
  HeartFilled,
  HeartOutlined
} from "@ant-design/icons";
import {
  Image as Antimage,
  Button,
  Form,
  Row,
  Col,
  Avatar,
  Typography,
  Space,
  Mentions,
  Layout,
  Card,
  List,
  Skeleton,
  Rate,
  message,
  Upload,
  Badge,
  Divider,
  Tag,
} from "antd";
import { apiBaseUrl } from "@/utils/baseUrl";
import {
  favoriteLocation,
  likeLocationReview,
  postReview,
  unfavoriteLocation,
  getLocationById,
} from "@/src/redux/Location/actions";
import food from "@/public/images/landing/food.png";
import useNotify from "@/hooks/useNotify";
import { useRouter } from "next/router";
import useMedia from "@/hooks/useMedia";
import Comments from "@/components/Layout/comments/CommentsAll";
import ArrivalBanner from "@/components/Locations/PartnerLocation/ArrivalBanner";
// import PostForm from "@/components/Locations/PartnerLocation/PostForm";
import ArrivalBannerExpired from "@/components/Locations/PartnerLocation/ArrivalBannerExpired";
import { commentService } from "@/services/index";

const { Content } = Layout;
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
    }}>
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

const CommentBody = ({ item, likePost, user_id, path }) => {
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
            {expandComments ? <DownOutlined /> : <UpOutlined />}
            View Comments
          </Button>
        </Space>
      </div>
      <Comments currentUserId={user_id} path={path} ownerId={item.user._id} expand={expand} setExpandComments={setExpandComments} expandComments={expandComments} setCommentCount={setCommentCount} type="location" id={item._id} />
    </>
  );
};

const imgurl = `${apiBaseUrl}/avatar/`;
const avatarurl = `${apiBaseUrl}/avatar/`;

const index = ({
  location,
  onPostReview,
  getLocationInfo,
  likeReview,
  onFavoriteLocation,
  onUnFavoriteLocation,
  checkIncount,
  expiredArrivals,
  userRole,
  user_id
}) => {

  const router = useRouter();
  const { notify } = useNotify();
  const [reviews, setReviews] = useState([]);
  const [expand, setExpand] = useState(false);
  const [position, setPosition] = useState({
    lat: 30.3321838,
    lng: -81.65565099999999,
  });
  useEffect(() => {
    if (router.isReady) {
      const locationId = router.query.location;
      getLocationInfo({ id: locationId, expand: expand }, (_, err) => {
        if (err) {
          notify(
            "error",
            err?.response?.data?.message || "Something went wrong"
          );
        }
      });
    }
  }, [router.isReady, expand]);

  useEffect(() => {
    if (location.reviews) {
      const activeReviews = location.reviews.reduce(
        (acc, option, index) => {
          option.status === "active" ? acc.push(option) : ''
          return acc;
        },
        []
      );
      setReviews(temporarySwapHalf(activeReviews));
    }
  }, [location.reviews]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setPosition({
        lat: latitude,
        lng: longitude,
      });
    });
  }, []);

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
            onFavoriteLocation={onFavoriteLocation}
            onUnFavoriteLocation={onUnFavoriteLocation}
            userRole={userRole}
          />
          <Row justify={"center"}>
            <div className="col-xl-8 col-lg-7 col-md-12">
              {location.isActive ? (
                // <ArrivalBanner
                //   position={position}
                //   location={location}
                //   checkIncount={checkIncount}
                // />
                <div>wwwww</div>
              ) : (
                ""
              )}
              <PostForm
                location={location}
                onPostReview={onPostReview}
                getLocationInfo={getLocationInfo}
                expand={expand}
              />
              {expiredArrivals.arrivalData?.length > 0 ? (
                <ArrivalBannerExpired
                  location={location}
                  arrivals={expiredArrivals}
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
          <div className="pin-post-logo" style={{
            display: isWebDevice ? 'block' : 'none'
          }}>
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
              <Space direction="vertical" size='small'>
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
        <CommentBody item={review} path={router.asPath} likePost={likeReview} user_id={user_id} />
      </Skeleton>
    </List.Item>
  );
}

function LocationBanner({
  location,
  onFavoriteLocation,
  onUnFavoriteLocation,
  userRole
}) {
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');

  if (!location) return <Skeleton active />;
  return (
    <>
      <Row>
        <Col span={isWebDevice ? 18 : 24} offset={isWebDevice ? 3 : 0} style={{}}>
          <Badge.Ribbon
            text={location.isActive ? "Active" : "Inactive"}
            placement="start"
            color={location.isActive ? "green" : "red"}
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
              actions={[
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
                  value={location.rating}
                />,
                userRole !== "partner" ?
                  location.isFavorite ? (
                    <Button
                      type="primary"
                      icon={<HeartFilled />}
                      style={{
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        onUnFavoriteLocation(location._id, (_, error) => {
                          if (error) {
                            notify(
                              "error",
                              error?.response?.data?.message ||
                              "Something went wrong"
                            );
                            return;
                          }

                          notify(
                            "success",
                            "Location removed from Favorites"
                          );
                        });
                      }}
                    >
                      {isWebDevice ? 'Remove from Favorites' : ''}
                    </Button>
                  ) : (
                    <Button
                      icon={<HeartOutlined />}
                      style={{
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        onFavoriteLocation(location._id, (_, error) => {
                          if (error) {
                            notify(
                              "error",
                              error?.response?.data?.message ||
                              "Something went wrong"
                            );
                            return;
                          }

                          notify("success", "Location added to Favorites");
                        });
                      }}
                    >

                      {isWebDevice ? 'Add to Favorites' : ''}
                    </Button>
                  ) : ''
              ]}
            >
              <Row
                gutter={16}
                style={{
                  textAlign: "center",
                }}
              >
                <Col xs={0} sm={0} md={8} lg={8} xl={8}>
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
                        location.images?.length > 0 &&
                          location.images[0]?.filepath ? (
                          <Image
                            src={avatarurl + location.images[0]?.filepath}
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
                      {location?.title}
                    </Text>
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
                        {location?.description}
                      </Text>
                    </Space>
                    <Space>
                      <Text
                        style={{
                          color: "white",
                        }}
                      >
                        <ClockCircleFilled />&nbsp;&nbsp;
                        {location?.isActive ? "Departure Time" : "Last Departure"}
                        : {
                          new Date(location?.departureAt).toLocaleDateString(undefined, {
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
                        <EnvironmentOutlined /> {location?.mapLocation?.address}
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
                  <Space size={[0, 'small']} wrap>
                    {location?.subCategories
                      ?.map((item) => <Tag icon={<TagFilled />} color="processing" >{item.name}</Tag>)
                    }

                  </Space>

                </Col>
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
  location: state.location.location,
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
    onFavoriteLocation: (locationId, cb) =>
      dispatch(favoriteLocation(locationId, cb)),
    onUnFavoriteLocation: (locationId, cb) =>
      dispatch(unfavoriteLocation(locationId, cb)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(index);