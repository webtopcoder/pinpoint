import React from "react";
import Image from "next/image";
import { connect } from "react-redux";
import {
  UploadOutlined,
  StarFilled,
  EnvironmentFilled,
  LikeOutlined,
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
} from "antd";
import config from "@/utils/config";
import food from "@/public/images/landing/food.png";
import { Content } from "antd/es/layout/layout";
import baseUrl from "@/utils/baseUrl";
const { Text } = Typography;

const IconText = ({ text }) => (
  <Space>
    <Button type="primary" shape="circle" icon={<LikeOutlined />} />
    <Text> {text}</Text>
  </Space>
);

const PartnerLocation = ({ location }) => {
  const myLoader = ({ src }) => {
    return src;
  };
  const imgurl = `http://${config.server}:${config.port}/post/`;
  const avatarurl = `http://${config.server}:${config.port}/avatar/`;
  return (
    <Layout
      className="site-layout"
      style={{
        background: "#211f1f",
      }}
    >
      <Content>
        <div className="container">
          <Card
            className="banner"
            style={{
              backgroundColor: "#2F2F2F",
              margin: "60px 16px",
            }}
            bordered={false}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Row
                justify={"space-between"}
                style={{
                  position: "relative",
                  height: "100px",
                }}
              >
                <Rate
                  allowHalf
                  disabled
                  defaultValue={2}
                  tooltips={["terrible", "bad", "normal", "good", "wonderful"]}
                  value={location.rating}
                />
                <Space direction="vertical">
                  <Avatar
                    style={{
                      top: -83,
                      left: "47%",
                      position: "absolute",
                      border: "3px solid black",
                    }}
                    size={100}
                    icon={
                      location.profilePhoto ? (
                        location.profilePhoto
                      ) : (
                        <EnvironmentFilled />
                      )
                    }
                  />

                  <Text
                    style={{
                      marginTop: "30px",
                      fontSize: "20px",
                      color: "#fff",
                    }}
                    strong
                  >
                    {location.name}
                  </Text>
                </Space>

                <Space>
                  <div
                    style={{
                      height: "15px",
                      width: "15px",
                      backgroundColor: location.isActive
                        ? "#05ff00"
                        : "#ff0000",
                      borderRadius: "50%",
                    }}
                  />
                  <Text style={{ color: "#fff", alignItems: "top" }}>
                    {location.location}
                  </Text>
                </Space>
              </Row>
              <Text style={{ color: "#fff", textAlign: "center" }}>
                {location.description ?? "Description of the location"}
              </Text>
            </div>
          </Card>
          <Row justify={"center"}>
            <div className="col-xl-8 col-lg-7 col-md-12">
              <PostForm />
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
                            <List.Item
                              key={index}
                              actions={[
                                <IconText
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
                                      src={avatarurl + item?.from_user?.avatar}
                                      size={64}
                                    />
                                  }
                                  title={
                                    <>
                                      <span className="custom-userName">
                                        {item?.from_user?.realname.first +
                                          " " +
                                          item?.from_user?.realname.last}{" "}
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                      </span>
                                      <span className="custom-shoutout-text">
                                        <a
                                          className="custom-touser-text"
                                          onClick={() =>
                                            window.open(
                                              baseUrl +
                                                "/profile/" +
                                                item.to_user._id +
                                                "/activity",
                                              "_blank"
                                            )
                                          }
                                        >
                                          @{item?.to_user?.username}
                                        </a>
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
                                      {item.image.map((item1, index) => (
                                        <Antimage
                                          loader={myLoader}
                                          width={"25%"}
                                          src={imgurl + "/" + item1}
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
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

function PostForm() {
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
              <Form layout="vertical" autoComplete="off">
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
                  />
                </Form.Item>
                <Form.Item name="fileupload">
                  <Row>
                    <Col span={8}>
                      <Button
                        icon={<UploadOutlined />}
                        style={{ marginRight: 10 }}
                      >
                        Click to Upload
                      </Button>
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
  );
}

export default connect(undefined, undefined)(PartnerLocation);
