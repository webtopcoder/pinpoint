import { EnvironmentFilled, StarOutlined } from "@ant-design/icons";
import { Col, Layout, Row, Space, Typography } from "antd";
import { Avatar, Card } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

const { Text } = Typography;
const { Content } = Layout;

const PartnerLocations = ({ locations }) => {
  const router = useRouter();

  const view_user_id = router.query.profile;
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
              <Link href={`/profile/${view_user_id}/locations/${location._id}`}>
                <Card
                  className="location-card-style"
                  title={location.name}
                  bordered={true}
                  style={{
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <Space direction="vertical">
                    <Space
                      style={{
                        position: "relative",
                      }}
                    >
                      <Avatar
                        style={{ border: "3px solid black" }}
                        size={100}
                        icon={
                          location.profilePhoto ? (
                            location.profilePhoto
                          ) : (
                            <EnvironmentFilled />
                          )
                        }
                      />
                      <div
                        style={{
                          height: "15px",
                          width: "15px",
                          backgroundColor: location.isActive
                            ? "#05ff00"
                            : "#ff0000",
                          borderRadius: "50%",
                          border: "2px solid white",
                          bottom: 0,
                          right: 0,
                          position: "absolute",
                        }}
                      />
                    </Space>

                    <Space direction="vertical">
                      <Text strong>{location.location}</Text>
                      <Space>
                        <StarOutlined />
                        <Text
                          style={{
                            fontSize: "10px",
                            color: "gray",
                          }}
                        >
                          last seen {location.lastSeen}
                        </Text>
                      </Space>
                    </Space>
                  </Space>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default PartnerLocations;
