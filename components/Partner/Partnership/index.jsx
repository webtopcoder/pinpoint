import React, { useEffect, useState } from "react";
import {
  Layout,
  Col,
  Row,
  Badge,
  Typography,
} from "antd";
import {
  Card,
  CardBody,
  Alert
} from "reactstrap";
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";
import PartnerShipPayment from "./PartnerShipPayment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { profileService } from "@/services/index";
import useMedia from "@/hooks/useMedia";
import classnames from "classnames";

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
    await profileService.getUserInfo()
      .then((res) => {
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
      <Card>
        <CardBody
          className={classnames({ 'p-2': !isWebDevice, 'p-5': isWebDevice })}
        >
          <div className="auth-space"></div>
          <div className="auth-space"></div>
          <div className="pricing-area pb-75">
            {partnerShipPlans?.map((plan, index) => (
              <div className="container">
                <div className="row justify-content-center">

                  <div
                    className="col-lg-5 col-md-6"
                    data-aos="fade-up"
                    data-aos-duration="1200"
                  >
                    {userInfo?.activePartnership == plan._id && new Date(userInfo?.partnershipPriceRenewalDate) > new Date() ? (
                      <PartnerShipPayment
                        {...plan}
                        isActive={true}
                        renewalDate={userInfo?.partnershipPriceRenewalDate}
                        subscriptionId={userInfo?.activeSubscription?.id}
                        setUserInfo={setUserInfo}
                        getUserInfo={initializeGetUser}
                        renewdate={userInfo?.partnershipPriceRenewalDate}
                      />
                    ) : (
                      <PartnerShipPayment
                        {...plan}
                      />
                    )}
                  </div>
                  <div
                    className="col-lg-7 col-md-6"
                    data-aos="fade-up"
                    data-aos-duration="1200"
                  >
                    <Alert color="red" role="alert">
                      <h4 className="alert-heading tcl-darkblue">Pinpoint PartnerShip</h4>
                      <p>Being a Pinpoint Partner will give you
                        access to our interactive map feature.<br />This will allow you to
                        post your active locations for Pinpoint Users to see. </p>
                      <hr />
                      <p className="mb-0">Your
                        Partnership will be billed monthly (30 days following your
                        payment) and is able to be cancelled at any point. If
                        cancelled, the cancellation will go into affect at the end of
                        your current Partnership period.</p>
                    </Alert>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </Elements>
  );
};

export default Index;
