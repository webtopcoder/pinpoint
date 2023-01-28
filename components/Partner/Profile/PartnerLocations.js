import LocationCard from "@/components/LocationCard";
import { Col, Layout, Row } from "antd";
import { connect } from "react-redux";

const { Content } = Layout;

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
              <LocationCard location={location} />
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    locations: [],
  };
};

export default connect(mapStateToProps)(PartnerLocations);
