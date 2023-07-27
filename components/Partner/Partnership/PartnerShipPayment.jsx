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
                {/* <Text
                  style={{
                    color: "green",
                  }}
                ></Text> */}
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
                  getUserDetail={getUserDetail}
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

export default PartnerShipPayment;
