import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Divider,
  Typography,
  Space,
  Popconfirm,
} from "antd";
import useNotify from "@/hooks/useNotify";
import CheckoutForm from "./checkoutform";
import { DeleteOutlined } from "@ant-design/icons";
import { formatDate } from "@/utils/date";
import { profileService } from "@/services/index";
import Link from "next/link";

const { Text } = Typography;

const PartnerShipPayment = ({
  title,
  price,
  currency,
  features,
  applyIn,
  stripePriceId,
  isActive,
  subscriptionId,
  getUserInfo,
  renewdate,
  setUserInfo
}) => {
  const [priceId, setPriceId] = useState("");
  const [customer, setCustomer] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const handleCancel = () => setShowModal(false);
  const { notify } = useNotify();

  async function handleSubscribeClick(priceID) {
    setPriceId(priceID);
    await setShowModal(true);

    await profileService.createCustomer()
      .then(async (res) => {
        const customer = res.customer;
        await setCustomer(customer);
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });

  }
  async function handleCancelSubscription(e, subscriptionId) {
    e.preventDefault();
    const data = {
      subscriptionId: subscriptionId,
    };

    await profileService.cancelSubscription(data)
      .then(async (res) => {
        await setUserInfo(res?.user);
        await getUserInfo();
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }

  async function getUserDetail() {
    await getUserInfo();
  };

  return (
    // <Card
    //   className="membership-card-style"
    //   title={title}
    //   headStyle={{ fontSize: 25, fontWeight: 700 }}
    //   bordered={false}
    // >
    <div className="single-pricing-box">
      <h3>{title}</h3>
      <div className="price">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency,
        }).format(price)}<span>/{applyIn}</span>
      </div>
      {isActive ?
        subscriptionId ?
          <><p>This plan will be renewed on  {formatDate(renewdate, "MM/DD/YYYY")}</p>
            <Popconfirm
              title="Cancel PartnerShip?"
              description="Are you sure you want to unsubscribe from this plan?"
              okText="Yes"
              cancelText="No"
              onConfirm={(e) =>
                handleCancelSubscription(e, subscriptionId)
              }
            >
              <a className="btn-style-one red-light-color">
                Cancel Partnership
              </a>
            </Popconfirm>
          </> : <p>This plan will be canceled on  {formatDate(renewdate, "MM/DD/YYYY")}</p>
        :
        <a
          onClick={() =>
            handleSubscribeClick(stripePriceId).catch(console.error)
          }
          className="btn-style-one light-green-color">
          {price == 0 ? "Get Free" : "Buy Now"}
        </a>
      }
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
      {customer ? (
        <CheckoutForm
          showModal={showModal}
          onCancel={handleCancel}
          customerId={customer.id}
          priceId={priceId}
          setShowModal={setShowModal}
          getUserDetail={getUserDetail}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default PartnerShipPayment;
