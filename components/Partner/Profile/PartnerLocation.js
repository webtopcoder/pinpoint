import { Col, Row, Layout } from "antd";
import { EnvironmentFilled, StarOutlined } from "@ant-design/icons";
import { Card, Avatar } from "antd";
const { Content } = Layout;

const PartnerLocation = ({ locations }) => {
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
        <Row gutter={[32, 32]}>
          {locations.map((location, index) => (
            <Col key={index}>
              <div className="locationCard">
                <Card
                  className="location-card-style"
                  title={location.name}
                  bordered={true}
                >
                  <div className="location-Avatar">
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
                  </div>

                  <div className="location-activeStatus">
                    {location.isActive ? (
                      <Avatar
                        style={{ backgroundColor: "#05ff00" }}
                        size={50}
                      />
                    ) : (
                      <Avatar
                        style={{ backgroundColor: "#ec2226" }}
                        size={50}
                      />
                    )}
                  </div>

                  <div className="location-location"></div>

                  <div className="location-lastSeen">
                    last seen {location.lastSeen}
                  </div>

                  <div className="location-rating">
                    <StarOutlined />
                  </div>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default PartnerLocation;
