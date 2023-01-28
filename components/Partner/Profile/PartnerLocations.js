import LocationCard from "@/components/LocationCard";
import useNotify from "@/hooks/useNotify";
import { getLocations } from "@/src/redux/Location/actions";
import { Col, Layout, Row } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { connect } from "react-redux";

const { Content } = Layout;

const PartnerLocations = ({ locations, ongetLocations }) => {
  const router = useRouter();
  const { profile } = router.query;

  const { notify } = useNotify();
  useEffect(() => {
    ongetLocations({ partner: profile }, (_, error) => {
      if (error) {
        notify(
          "error",
          error?.response?.data?.message ?? "Something went wrong"
        );
      }
    });
  }, []);

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

const mapStateToProps = ({ location }) => {
  return {
    locations: location.userLocations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ongetLocations: (data, cb) => dispatch(getLocations(data, cb)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PartnerLocations);
