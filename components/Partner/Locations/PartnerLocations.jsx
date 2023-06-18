import LocationCard from "@/components/Partner/Locations/LocationCard";
import useNotify from "@/hooks/useNotify";
import { Col, Layout, Row, Result, Spin } from "antd";
import { FrownOutlined, LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { locationService } from "@/services/index";

const { Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;

const PartnerLocations = () => {

  const router = useRouter();
  const { profile } = router.query;
  const { notify } = useNotify();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  async function initialize() {
    await locationService.getLocations({ partner: profile, isActive: null })
      .then(async (res) => {
        setLoading(false);
        await setLocations(res.results);
      })
      .catch((error) => {
        setLoading(false);
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }
  useEffect(() => {
    if (router.isReady)
      initialize();
  }, [router.isReady]);

  return (
    <Layout
      className="site-layout"
      style={{
        background: "#000",
      }}
    >
      <Content
        className="location-dashboard"
      >
        <Spin
          indicator={antIcon}
          spinning={loading}
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Row
            gutter={[32, { xs: 8, sm: 16, md: 24, lg: 32 }]}
            justify="space-around"
          >
            {locations.length !== 0 ? (locations.map((item, index) => (
              <Col xs={24} sm={12} md={12} lg={12} xl={8} key={index}>
                <LocationCard locations={locations} setLocations={setLocations} location={item} />
              </Col>
            ))) :
              <Result
                icon={<FrownOutlined style={{
                  color: '#ffffff'
                }} />}
                title={<span style={{
                  color: '#ffffff'
                }}>Sorry, No exist any location</span>}
              />}
          </Row>
        </Spin>

      </Content>
    </Layout>
  );
};

export default PartnerLocations;
