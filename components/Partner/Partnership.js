import React, { useEffect, useState } from "react";
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
  Modal,
} from "antd";
import {
  createCustomer,
  getPartnerships,
  getUserInfo,
} from "@/redux/Profile/actions";
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";
import CheckoutForm from "./checkoutform";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const { Text, Paragraph } = Typography;

const { Content } = Layout;

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const PartnerShipPayment = ({
  title,
  price,
  plan,
  currency,
  features,
  applyIn,
  isActive,
  renewalDate,
  createCustomer,
  getUserInfo,
}) => {
  const [priceId, setPriceId] = useState("");
  const [customer, setCustomer] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const handleCancel = () => setShowModal(false);

  async function handleSubscribeClick(priceID) {
    console.log(priceID);
    setPriceId(priceID);
    await createCustomer((res, error) => {
      const customer = res.customer;
      setCustomer(customer);

      if (error) {
        console.log("error");
      }
    });
    console.log(customer);
    setShowModal(true);
  }

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
            {currency}
          </Text>
          <Text
            style={{
              fontSize: 50,
              fontWeight: 700,
            }}
          >
            {price}
          </Text>
          {applyIn && (
            <Text
              style={{
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              / {applyIn}
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
              <Button
                type="primary"
                size="large"
                disabled={isActive}
                onClick={() => handleSubscribeClick(plan.id)}
              >
                {price == 0 ? "Get Free" : "Buy Now"}
              </Button>

              {customer ? (
                <CheckoutForm
                  showModal={showModal}
                  onCancel={handleCancel}
                  customerId={customer.id}
                  priceId={priceId}
                  setShowModal={setShowModal}
                  getUserInfo={getUserInfo}
                />
              ) : (
                ""
              )}
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

const Partnership = ({
  partnershipPlans,
  user_partnership,
  ongetPartnershipplans,
  partnershipPriceRenewalDate,
  onCreateCustomer,
  ongetUser,
}) => {
  // const partnerShipPlans = usePartnerShipPlans();
  const { notify } = useNotify();
  const [plans, setPlans] = useState([]);
  console.log(user_partnership);
  console.log(partnershipPlans);

  useEffect(() => {
    setPlans(partnershipPlans);
  }, [partnershipPlans, ongetUser]);
  useEffect(() => {
    ongetPartnershipplans((_, error) => {
      if (error) {
        console.log(error);
        notify(
          "error",
          error?.response?.data?.message ?? "Something went wrong"
        );
      }
    });
  }, [ongetPartnershipplans]);

  return (
    <Elements stripe={stripePromise}>
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
                  payment) and is able to be cancelled at any point. If
                  cancelled, the cancellation will go into affect at the end of
                  your current Partnership period.
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
              {plans.map((plan, index) => (
                <Col xs={12} sm={8} md={6} lg={8} xl={8} key={index}>
                  {user_partnership == plan._id ? (
                    <Badge.Ribbon text="Active" color="green">
                      <PartnerShipPayment
                        {...plan}
                        isActive={true}
                        renewalDate={partnershipPriceRenewalDate}
                      />
                    </Badge.Ribbon>
                  ) : (
                    <PartnerShipPayment
                      {...plan}
                      createCustomer={onCreateCustomer}
                      getUserInfo={ongetUser}
                    />
                  )}
                </Col>
              ))}
            </Row>
          </div>
        </Content>
      </Layout>
    </Elements>
  );
};
const mapStateToProps = ({ profile }) => {
  return {
    partnershipPlans: profile.partnershipsInfo,
    user_partnership: profile.userinfo.activePartnership,
    partnershipPriceRenewalDate: profile.userinfo.partnershipPriceRenewalDate,
  };
};

let user_id = "";

if (typeof window !== "undefined") {
  user_id = sessionStorage.getItem("user_id");
}
const mapDispatchToProps = (dispatch) => ({
  ongetUser: (cb) => dispatch(getUserInfo(user_id, cb)),

  onCreateCustomer: (cb) => dispatch(createCustomer(cb)),
  ongetPartnershipplans: (cb) => dispatch(getPartnerships(cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Partnership);
