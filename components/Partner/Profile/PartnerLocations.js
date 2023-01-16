import {
  EnvironmentFilled,
  MessageOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Layout,
  Rate,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import { Avatar, Card } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const { Text } = Typography;
const { Content } = Layout;

const IconText = ({ icon, text }) => (
  <Space>
    {icon}
    {text}
  </Space>
);

const PartnerCard = ({ location }) => {
  const router = useRouter();
  const { profile } = router.query;

  const [rating, setRating] = useState(location.rating ?? 0);

  return (
    <Link href={`/profile/${profile}/locations/${location._id}`}>
      <Card
        style={{
          color: "white",
          cursor: "pointer",
        }}
        headStyle={{
          color: "white",
          textAlign: "center",
        }}
        title={location.name}
        className="partner-locations-card"
      >
        <Row
          gutter={16}
          style={{
            textAlign: "center",
          }}
        >
          <Col span={24}>
            <Link href={`/profile/${profile}/locations/${location._id}`}>
              <Avatar
                style={{ border: "3px solid black", cursor: "pointer" }}
                size={100}
                icon={
                  location.profilePhoto ? (
                    location.profilePhoto
                  ) : (
                    <EnvironmentFilled />
                  )
                }
              />
            </Link>
          </Col>
        </Row>
        <Row
          gutter={16}
          style={{
            textAlign: "center",
          }}
        >
          <Col className="gutter-row" span={12}>
            <IconText
              icon={
                <LikeOutlined
                  style={{
                    fontSize: 30,
                  }}
                />
              }
              text={
                <Text
                  style={{
                    fontSize: 40,
                    color: "white",
                  }}
                >
                  {location.likeCount ?? 0}
                </Text>
              }
              key="list-vertical-like-o"
            />
          </Col>
          <Col className="gutter-row" span={12}>
            <IconText
              icon={
                <MessageOutlined
                  style={{
                    fontSize: 30,
                  }}
                />
              }
              text={
                <Text
                  style={{
                    fontSize: 40,
                    color: "white",
                  }}
                >
                  {location.reviewCount ?? 0}
                </Text>
              }
              key="list-vertical-message"
            />
          </Col>
        </Row>
        <Divider
          style={{
            borderColor: "white",
          }}
          dashed
        >
          <Tag style={{}} color={location.isActive ? "#87d068" : "#ff4d4f"}>
            {location.isActive ? "Active" : "Inactive"}
          </Tag>
        </Divider>
        <Col
          style={{
            marginTop: 20,
            textAlign: "center",
          }}
        >
          <Space direction="vertical" className="gutter-row" span={24}>
            <Space>
              <Text
                style={{
                  color: "white",
                }}
              >
                {location.location}
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
            <Space>
              <Rate
                allowHalf
                defaultValue={2}
                tooltips={["terrible", "bad", "normal", "good", "wonderful"]}
                onChange={(value) => setRating(value)}
                value={rating}
              />
            </Space>
          </Space>
        </Col>
      </Card>
    </Link>
  );
};

const PartnerLocations = ({ locations }) => {
  return (
    <Layout
      className="site-layout"
      style={{
        background: "#211f1f",
      }}
    >
      <Content
        style={{
          margin: "60px 16px",
        }}
      >
        <Row
          gutter={[32, { xs: 8, sm: 16, md: 24, lg: 32 }]}
          justify="space-around"
        >
          {locations.map((location, index) => (
            <Col span={6} key={index}>
              <PartnerCard location={location} />
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default PartnerLocations;
