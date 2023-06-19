import React, { useEffect, useState } from "react";
import {
  Layout,
  Col,
  Row,
  Badge,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";
import PartnerShipPayment from "./PartnerShipPayment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { profileService } from "@/services/index";
import useMedia from "@/hooks/useMedia";

const { Paragraph } = Typography;
const { Content } = Layout;

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Index = () => {
  // const partnerShipPlans = usePartnerShipPlans();
  const router = useRouter();
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');
  const [userInfo, setUserInfo] = useState();
  const [partnerShipPlans, setPartnerShipPlans] = useState();

  async function initializeGetUser() {
    console.log(234234)
    await profileService.getUserInfo()
      .then((res) => {
        console.log(res)
        setUserInfo(res?.user);
      })
      .catch((error) => {
        console.log(error)
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });

  }
  async function initializeGetPartnershipplans() {
    await profileService.getPartnershipplans()
      .then((res) => {
        setPartnerShipPlans(res?.results);
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      })
  }

  useEffect(() => {
    if (router.isReady) {
      initializeGetUser();
      initializeGetPartnershipplans();
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
              {partnerShipPlans?.map((plan, index) => (
                <Col xs={24} sm={24} md={12} lg={12} xl={8} key={index}>
                  {userInfo?.activePartnership == plan._id && new Date(userInfo?.partnershipPriceRenewalDate) > new Date() ? (
                    <Badge.Ribbon text="Active" color="green">
                      <PartnerShipPayment
                        {...plan}
                        isActive={true}
                        renewalDate={userInfo?.partnershipPriceRenewalDate}
                        subscriptionId={userInfo?.activeSubscription?.id}
                        setUserInfo={setUserInfo}
                        getUserInfo={initializeGetUser}
                        renewdate={userInfo?.partnershipPriceRenewalDate}
                      />
                    </Badge.Ribbon>
                  ) : (
                    <PartnerShipPayment
                      {...plan}
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

export default Index;
