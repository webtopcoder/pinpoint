import React, { useEffect, useState } from "react";
import {
  Layout,
  Col,
  Badge,
  Typography,
} from "antd";
import {
  Row,
  Card,
  CardBody,
} from "reactstrap";
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";
import PartnerShipPayment from "./PartnerShipPayment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { profileService } from "@/services/index";
import useMedia from "@/hooks/useMedia";
import Link from "next/link";
import classnames from "classnames";


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
      <Card>
        <CardBody
          className={classnames({ 'p-2': !isWebDevice, 'p-5': isWebDevice })}
        >
            <div className="container">
              <div className="page-title-content">
                <span className="sub-title red-light-color">Pinpoint PartnerShip</span>
                <p>   Being a Pinpoint Partner will give you
                  access to our interactive map feature.<br />This will allow you to
                  post your active locations for Pinpoint Users to see. <br />Your
                  Partnership will be billed monthly (30 days following your
                  payment) and is able to be cancelled at any point. <br />If
                  cancelled, the cancellation will go into affect at the end of
                  your current Partnership period.</p>
              </div>
            </div>
          <div className="auth-space"></div>
          <div className="auth-space"></div>
          <div className="pricing-area pb-75">
            <div className="container">
              <div className="row justify-content-center">
                <div
                  className="col-lg-6 col-md-6"
                  data-aos="fade-up"
                  data-aos-duration="1200"
                >
                  <div className="single-pricing-box">
                    <h3>Basic</h3>
                    {/* <p>Powerful & awesome elements</p> */}
                    <div className="price">
                      Free<span>/month</span>
                    </div>
                    <ul className="features-list">
                      <li>
                        <i className="flaticon-draw-check-mark"></i>
                        Create Unlimited Locations
                      </li>
                      <li>
                        <i className="flaticon-draw-check-mark"></i>
                        Lifetime Free Support
                      </li>
                      <li>
                        <i className="flaticon-draw-check-mark"></i>
                        24/7 Support
                      </li>
                      <li className="close">
                        <i className="flaticon-cancel"></i>
                        Arrive or Departure Location
                      </li>
                      <li className="close">
                        <i className="flaticon-cancel"></i>
                        Live Support
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className="col-lg-4 col-md-6"
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  data-aos-delay="200"
                >
                  <div className="single-pricing-box">
                    <h3>Business Plan</h3>
                    {/* <p>Powerful & awesome elements</p> */}
                    <div className="price">
                      $15<span>/month</span>
                    </div>
                    <Link href="/contact">
                      <a className="btn-style-one light-green-color">
                        Purchage Plan <i className="bx bx-chevron-right"></i>
                      </a>
                    </Link>
                    <ul className="features-list">
                      <li>
                        <i className="flaticon-draw-check-mark"></i>
                        Create Unlimited Locations
                      </li>
                      <li>
                        <i className="flaticon-draw-check-mark"></i>
                        Lifetime Free Support
                      </li>
                      <li>
                        <i className="flaticon-draw-check-mark"></i>
                        24/7 Support
                      </li>
                      <li>
                        <i className="flaticon-draw-check-mark"></i>
                        Arrive Or Departure Location
                      </li>
                      <li>
                        <i className="flaticon-draw-check-mark"></i>
                        Live Support
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Elements>
  );
};

export default Index;
