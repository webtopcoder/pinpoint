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
  Popconfirm,
} from "antd";
import {
  cancelSubscription,
  createCustomer,
  getPartnerships,
  getUserInfo,
} from "@/redux/Profile/actions";
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";
import CheckoutForm from "./checkoutform";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { DeleteOutlined } from "@ant-design/icons";
import { formartUnixtime, formatDate } from "@/utils/date";
import useMedia from "@/hooks/useMedia";
import { date } from "yup";

const { Text, Paragraph } = Typography;
const { Content } = Layout;

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const PartnerShipPayment = ({
  title,
  price,
  currency,
  features,
  applyIn,
  stripePriceId,
  isActive,
  createCustomer,
  subscriptionId,
  cancelSubscription,
  getUserInfo,
  renewdate,
}) => {
  const [priceId, setPriceId] = useState("");
  const [customer, setCustomer] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const handleCancel = () => setShowModal(false);
  const { notify } = useNotify();

  async function handleSubscribeClick(priceID) {
    setPriceId(priceID);
    await createCustomer((res, error) => {
      const customer = res.customer;

      setCustomer(customer);

      if (error) {
        console.log("error");
      }
    });

    setShowModal(true);
  }
  async function handleCancelSubscription(e, subscriptionId) {
    e.preventDefault();
    const data = {
      subscriptionId: subscriptionId,
    };
    await cancelSubscription(data, (res, error) => {
      if (error) {
        console.log("error");
        notify("error", "Fail");
        return;
      }
      notify("success", "Subscription Cancelled");
    });

    await getUserInfo((res, error) => {
      if (error) {
        console.log(error);
        notify("error", "Fail");
      }
    });
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
              fontSize: 50,
              fontWeight: 700,
            }}
          >
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency,
            }).format(price)}
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
                <Text style={{ color: "green" }}>
                  {formatDate(renewdate, "MM/DD/YYYY")}
                </Text>
              </Space>
              <Space>
                {subscriptionId ? (
                  <Popconfirm
                    title="Cancel PartnerShip?"
                    description="Are you sure you want to unsubscribe from this plan?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={(e) =>
                      handleCancelSubscription(e, subscriptionId)
                    }
                  >
                    <Button
                      size="large"
                      shape="round"
                      icon={<DeleteOutlined />}
                      danger
                    >
                      Cancel Partnership
                    </Button>
                  </Popconfirm>
                ) : (
                  <Button size="large" shape="round" disabled danger>
                    Will be cancelled on {formatDate(renewdate, "MM/DD/YYYY")}
                  </Button>
                )}
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
                onClick={() =>
                  handleSubscribeClick(stripePriceId).catch(console.error)
                }
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
  user_subscriptionId,
  onCancelSubscription,
}) => {
  // const partnerShipPlans = usePartnerShipPlans();
  const router = useRouter();
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');

  useEffect(() => {
    if (router.isReady) {
      ongetUser((res, error) => {
        if (error) {
          console.log(error);
          notify("error", "Fail");
        }
      });
      ongetPartnershipplans((_, error) => {
        if (error) {
          notify(
            "error",
            error?.response?.data?.message ?? "Something went wrong"
          );
        }
      });
    }
  }, [router.isReady]);

  return (
    <Elements stripe={stripePromise}>
      <Layout className="site-layout" style={{ background: "#211f1f" }}>
        <Content className="partner-layout">
          <div className="site-card-wrapper">
            <Row gutter={[32, 32]}>
              <Col xs={24} sm={24} md={20} lg={20} xl={20} offset={isWebDevice ? 2 : 0}>
                <Paragraph
                  style={{
                    color: "white",
                    fontSize: 20,
                    textAlign: "",
                    padding: 20,
                    background: "#1677ff",
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
              {partnershipPlans.map((plan, index) => (
                <Col xs={24} sm={24} md={12} lg={12} xl={8} key={index}>
                  {user_partnership == plan._id && new Date(partnershipPriceRenewalDate) > new Date() ? (
                    <Badge.Ribbon text="Active" color="green">
                      <PartnerShipPayment
                        {...plan}
                        isActive={true}
                        renewalDate={partnershipPriceRenewalDate}
                        subscriptionId={user_subscriptionId}
                        cancelSubscription={onCancelSubscription}
                        getUserInfo={ongetUser}
                        renewdate={partnershipPriceRenewalDate}
                      />
                    </Badge.Ribbon>
                  ) : (
                    <PartnerShipPayment
                      {...plan}
                      createCustomer={onCreateCustomer}
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
    user_subscriptionId: profile.userinfo?.activeSubscription?.id,
    partnershipPriceRenewalDate:
      profile.userinfo?.partnershipPriceRenewalDate ?? "",
  };
};

const mapDispatchToProps = (dispatch) => ({
  ongetUser: (cb) => dispatch(getUserInfo(cb)),
  onCancelSubscription: (data, cb) => dispatch(cancelSubscription(data, cb)),
  onCreateCustomer: (cb) => dispatch(createCustomer(cb)),
  ongetPartnershipplans: (cb) => dispatch(getPartnerships(cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Partnership);
