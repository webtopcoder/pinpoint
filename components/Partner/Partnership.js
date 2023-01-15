import React from "react";
import { connect } from "react-redux";
import {
  Layout,
  Card,
  Col,
  Row,
  Button,
  Divider,
  Badge,
  Typography,
  Space,
} from "antd";

const { Text, Paragraph } = Typography;

const { Content } = Layout;

const PartnerShipPayment = ({
  title,
  price,
  isActive,
  features,
  priceReoccurIn,
  renewalDate,
}) => {
  return (
    <Card
      className="membership-card-style"
      title={title}
      headStyle={{ fontSize: 25, fontWeight: 700 }}
      bordered={false}
    >
      <Space direction="vertical">
        <Space wrap>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            $
          </Text>
          <Text
            style={{
              fontSize: 50,
              fontWeight: 700,
            }}
          >
            {price}
          </Text>
          {priceReoccurIn && (
            <Text
              style={{
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              / {priceReoccurIn}
            </Text>
          )}
        </Space>
        <Space direction="vertical">
          {isActive ? (
            <>
              <Space>
                <Text style={{ color: "green" }}>Renews on {renewalDate}</Text>
              </Space>
              <Space>
                <Button size="large" danger>
                  Cancel Partnership
                </Button>
              </Space>
            </>
          ) : (
            <>
              <Space>
                <Text
                  style={{
                    color: "green",
                  }}
                ></Text>
              </Space>
              <Button type="primary" size="large" disabled={isActive}>
                {price == 0 ? "Get Free" : "Buy Now"}
              </Button>
            </>
          )}

          <Divider />
        </Space>
        {features.map((feature, index) => (
          <Space key={index}>
            <Text
              style={{
                fontSize: 15,
              }}
            >
              {feature}
            </Text>
          </Space>
        ))}
      </Space>
    </Card>
  );
};

const Partnership = () => {
  // const partnerShipPlans = usePartnerShipPlans();
  const partnershipPlans = [
    {
      title: "Free",
      price: "0",
      isActive: false,
      features: ["Free"],
    },
    {
      title: "Premium",
      price: "25",
      priceReoccurIn: "month",
      isActive: true,
      renewalDate: "12/12/2021",
      features: ["Can add locations in interactive map"],
    },
    {
      title: "Max Premium",
      price: "250",
      priceReoccurIn: "year",
      isActive: false,
      features: ["Can add locations in interactive map"],
    },
  ];

  return (
    <Layout className="site-layout" style={{ background: "#211f1f" }}>
      <Content style={{ margin: "100px 40px" }}>
        <div className="site-card-wrapper">
          <Row gutter={[32, 32]}>
            <Col xs={24} sm={24} md={20} lg={20} xl={20} offset={2}>
              <Paragraph
                style={{
                  color: "white",
                  fontSize: 20,
                  textAlign: "center",
                  padding: 10,
                  background: "teal",
                  borderRadius: 10,
                }}
              >
                Pinpoint Partnership - Being a Pinpoint Partner will give you
                access to our interactive map feature.This will allow you to
                post your active locations for Pinpoint Users to see. Your
                Partnership will be billed monthly (30 days following your
                payment) and is able to be cancelled at any point. If cancelled,
                the cancellation will go into affect at the end of your current
                Partnership period.
              </Paragraph>
            </Col>
          </Row>
          <Row
            align={"middle"}
            gutter={[32, { xs: 8, sm: 16, md: 24, lg: 32 }]}
            style={{
              marginTop: 20,
            }}
            justify="space-around"
          >
            {partnershipPlans.map((plan, index) => (
              <Col xs={12} sm={8} md={6} lg={8} xl={8} key={index}>
                {plan.isActive ? (
                  <Badge.Ribbon text="Active" color="green">
                    <PartnerShipPayment {...plan} />
                  </Badge.Ribbon>
                ) : (
                  <PartnerShipPayment {...plan} />
                )}
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default connect(undefined, undefined)(Partnership);
