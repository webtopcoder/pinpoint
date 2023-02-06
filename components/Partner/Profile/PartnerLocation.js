import React, { useEffect, useState } from "react";
import Image from "next/image";
import { connect } from "react-redux";
import {
  UploadOutlined,
  EnvironmentFilled,
  MessageOutlined,
  LikeOutlined,
  EnvironmentOutlined
} from "@ant-design/icons";
import Link from "next/link";
import {
  Image as Antimage,
  Button,
  Form,
  Row,
  Divider,
  Tag,
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
  Badge
} from "antd";
import config from "@/utils/config";
import food from "@/public/images/landing/food.png";
import baseUrl from "@/utils/baseUrl";
import { postReview } from "@/src/redux/Location/actions";
import useNotify from "@/hooks/useNotify";
import { getLocationById } from "@/src/redux/Location/actions";
// import { ButtonGroup } from "antd/es/button/button-group";
import { useRouter } from "next/router";
import { setRequestMeta } from "next/dist/server/request-meta";
const { Content } = Layout;
const { Text } = Typography;

const IconText = ({ text }) => (
  <Space>
    <Button type="primary" shape="circle" icon={<LikeOutlined />} />
    <Text> {text}</Text>
  </Space>
);

const imgurl = `http://${config.server}:${config.port}/avatar/`;
const avatarurl = `http://${config.server}:${config.port}/avatar/`;

const PartnerLocation = ({ location, onPostReview, getLocationInfo }) => {
  if (!location) return <Skeleton active />;
  return (
    <Layout
      className="site-layout"
      style={{
        background: "#211f1f",
      }}
    >
      <Content>
        <div className="container" style={{
          paddingTop: 100
        }}>
          <LocationBanner location={location} />
          <Row justify={"center"}>
            <div className="col-xl-8 col-lg-7 col-md-12">
              {location.isActive ? (
                <Posts location={location} getLocationInfo={getLocationInfo} />
              ) : (
                ""
              )}
              <PostForm location={location} onPostReview={onPostReview} />
              <div className="avatar-area green-color">
                <div className="avatar-respond">
                  <div className="avatar-form">
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12">
                        <List
                          itemLayout="vertical"
                          size="large"
                          dataSource={location.reviews}
                          renderItem={(item, index) => (
                            <Post key={index} review={item} />
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

function Posts({ review, location, getLocationInfo }) {
  const router = useRouter();
  // const [checkInNumber, setCheckInNumber] = useState(location.checkIn);
  const [arrivalText, setArrivalText] = useState(location.arrivalText);
  const [arrivalImage, setArrivalImage] = useState(
    location.arrivalImages[0]?.filepath
  );
  const [date, setDate] = useState(location.createdAt);
  useEffect(() => {
    if (router.isReady) {
      const locationId = router.query.location;
      getLocationInfo({ id: locationId }, (res, err) => {
        if (err) {
          notify(
            "error",
            err?.response?.data?.message || "Something went wrong"
          );
        } else {
          setArrivalText(res.arrivalText);
          setDate(res.createdAt);
          setArrivalImage(res.arrivalImages);
          // setCheckInNumber(res.checkIn)
        }
      });
    }
  }, [router.isReady]);
  return (
    <div>
      <div className="avatar-area green-color">
        <div className="avatar-respond">
          <div style={{ display: "flex" }} className="pin-post-header-section">
            <div className="pin-post-label">
              <p className="comment-notes">
                <Avatar
                  src={avatarurl + review?.user?.profile?.avatar?.filepath}
                  size={64}
                />
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
                  // setCheckInNumber((prev) => prev + 1);
                }}
              >
                Check In
              </Button>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ marginTop: "20px" }}>{arrivalText}</div>
            <div style={{ marginLeft: "auto" }}>
              <Image
                src={imgurl + arrivalImage && arrivalImage[0]?.filepath}
                alt="img"
                width="100px"
                height="100px"
              />
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "30px" }}>
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
              <Button style={{ marginRight: "10px" }}>
                {/* {checkInNumber} checked in */}
              </Button>
              <IconText
                text={location?.like ? location.like.count : 0}
                key="list-vertical-like-o"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostForm({ location, onPostReview }) {
  const [rating, setRating] = useState(0);
  const [postForm] = Form.useForm();
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
              <span id="email-notes">Let us know what you think!</span>
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
                onFinish={(values) => {
                  const formData = new FormData();
                  formData.append("rating", rating);
                  formData.append("text", values.text);
                  uploadFile.forEach((file) => {
                    formData.append("images", file.originFileObj);
                  });
                  onPostReview(location._id, formData, (res, error) => {
                    if (error) {
                      notify(
                        "error",
                        error?.response?.data?.message || "Something went wrong"
                      );
                    } else {
                      postForm.resetFields();
                      setUploadFile([]);
                      notify("success", "Review posted successfully");
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
                    placeholder="input @ to mention user"
                    prefix={["@"]}
                  />
                </Form.Item>
                <Row>
                  <Col span={8}>
                    <Form.Item name="images">
                      <Upload listType="picture" {...uploadProps}>
                        <Button
                          icon={<UploadOutlined />}
                          style={{ marginRight: 10 }}
                        >
                          Click to Upload
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col span={5} offset={2}>
                    <Form.Item name="rating">
                      <Rate
                        allowHalf
                        defaultValue={2}
                        tooltips={[
                          "terrible",
                          "bad",
                          "normal",
                          "good",
                          "wonderful",
                        ]}
                        onChange={setRating}
                        value={rating}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8} offset={1}>
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

function Post({ review }) {
  return (
    <List.Item
      actions={[
        <IconText
          text={review?.like ? review.like.count : 0}
          key="list-vertical-like-o"
        />,
      ]}
    >
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
              <span className="custom-userName">
                {review?.user?.firstName + " " + review?.user?.lastName}{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
              </span>
              <span className="custom-shoutout-text">
                <a
                  className="custom-touser-text"
                  onClick={() =>
                    window.open(
                      baseUrl +
                      "/profile/" +
                      location.partner._id +
                      "/activity",
                      "_blank"
                    )
                  }
                >
                  @{location?.partner?.username}
                </a>
              </span>
              <br />
              <a
                onClick={() =>
                  window.open(
                    baseUrl + "/profile/" + review.user._id + "/activity",
                    "_blank"
                  )
                }
              >
                @{review?.user?.username}
              </a>
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
              {review.images.map((item1, index) => (
                <Antimage
                  width={"25%"}
                  src={imgurl + "/" + item1?.filepath}
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
  );
}

function LocationBanner({ location }) {

  console.log(location);
  if (!location) return <Skeleton active />;
  return (
    <>
      <Row>
        <Col span={18} offset={3} style={{

        }}>
          <Badge.Ribbon text={location.isActive ? "Active" : "Inactive"} placement="start" color={location.isActive ? "green" : "red"}>
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
                <Col span={8}>
                  <Space>
                    <Rate
                      disabled
                      allowHalf
                      defaultValue={2}
                      tooltips={["terrible", "bad", "normal", "good", "wonderful"]}
                      onChange={(value) => setRating(value)}
                      value={location.rating}
                    />
                  </Space>
                </Col>

                <Col span={8} style={{
                  top: -100
                }}>
                  <Space direction="vertical" >
                    <Link
                      href={`/profile/${location.partner._id}/locations/${location._id}`}
                    >
                      <Avatar
                        style={{ border: "3px solid black", cursor: "pointer", background: 'rgb(223 216 216)' }}
                        size={150}
                        icon={
                          location.images.length !== 0 &&
                            location.images[0]?.filepath ? (
                            <Image
                              src={avatarurl + location.images[0]?.filepath}
                              height={200}
                              width={200}
                            />
                          ) : (
                            <EnvironmentFilled />
                          )
                        }
                      />
                    </Link>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: 20
                      }}
                    >
                      {location?.title}
                    </Text>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space direction="vertical">
                    <Text
                      style={{
                        color: "white",
                      }}
                    >
                      <EnvironmentOutlined /> {location?.mapLocation?.address}
                    </Text>

                  </Space>
                </Col>
                <Col span='24' style={{
                  top: -60
                }}>
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
                        last seen {location.lastSeen}
                      </Text>
                    </Space>
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

const mapDispatchToProp = (dispatch) => {
  return {
    getLocationInfo: (id, cb) => dispatch(getLocationById(id, cb)),
    onPostReview: (locationId, form, cb) =>
      dispatch(postReview(locationId, form, cb)),
  };
};

export default connect(null, mapDispatchToProp)(PartnerLocation);
