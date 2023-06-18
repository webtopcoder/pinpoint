import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  getUserInfo,
  subscribe,
  removePartnership,
} from "@/src/redux/Profile/actions";
import { connect, useDispatch } from "react-redux";
import useNotify from "@/hooks/useNotify";
import { Modal, Row, Col, Typography, Button } from "antd";
import Image from "next/image";
import food from "@/public/images/landing/food.png";
import { profileService } from "@/services/index";

const { Title } = Typography;

const CheckoutForm = ({
  customerId,
  priceId,
  // getUserInfo,
  showModal,
  onCancel,
  setShowModal,
}) => {
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  function handleCardInputChange(event) {
    setDisabled(event?.empty);
    setError(event?.error?.message ?? "");
  }
  const { notify } = useNotify();

  async function handleCheckoutFormSubmit(event) {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    // Call the subscribe endpoint and create a Stripe subscription
    // object. Returns the subscription ID and client secret
    const data = {
      customerId: customerId,
      priceId: priceId,
    };

    await profileService.Checkout(data)
      .then(async (res) => {
        const subscription = res;
        if (!subscription) {
          setLoading(false);
          notify("error", "Subscription purchase failed");
          return;
        }
        let stripePayload, data;
        if (subscription.status === "setupCard") {
          stripePayload = await stripe.confirmCardSetup(
            subscription.clientSecret,
            {
              payment_method: {
                card: elements.getElement(CardElement),
              },
            }
          );
        } else {
          stripePayload = await stripe.confirmCardPayment(
            subscription.clientSecret, // returned by subscribe endpoint
            {
              payment_method: {
                card: elements.getElement(CardElement),
              },
            }
          );
        }
        if (stripePayload.error) {
          dispatch(removePartnership());
          setError(stripePayload.error.message);
          notify("error", stripePayload.error.message);
          setLoading(false);
          return;
        } else {
          notify("success", "Subscription Purchase Successful");
          setLoading(false);
          setShowModal(false);
          getUserInfo();
        }
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });

    // await onCheckout(data, async (res, error) => {
    //   const subscription = res;
    //   if (!subscription) {
    //     setLoading(false);
    //     notify("error", "Subscription purchase failed");
    //     return;
    //   }
    //   let stripePayload, data;
    //   if (subscription.status === "setupCard") {
    //     stripePayload = await stripe.confirmCardSetup(
    //       subscription.clientSecret,
    //       {
    //         payment_method: {
    //           card: elements.getElement(CardElement),
    //         },
    //       }
    //     );
    //   } else {
    //     stripePayload = await stripe.confirmCardPayment(
    //       subscription.clientSecret, // returned by subscribe endpoint
    //       {
    //         payment_method: {
    //           card: elements.getElement(CardElement),
    //         },
    //       }
    //     );
    //   }
    //   if (stripePayload.error) {
    //     dispatch(removePartnership());
    //     setError(stripePayload.error.message);
    //     notify("error", stripePayload.error.message);
    //     setLoading(false);
    //     return;
    //   } else {
    //     notify("success", "Subscription purchase successful");
    //     setLoading(false);
    //     setShowModal(false);
    //   }
    // });
  }

  return (
    <Modal
      open={showModal}
      onOk={handleCheckoutFormSubmit}
      onCancel={onCancel}
      closable={false}
      footer={[
        <Button key="back" onClick={onCancel}>
          cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleCheckoutFormSubmit}
        >
          Pay Now
        </Button>,
      ]}
    >
      <>
        <Row>
          <Col
            xs={20}
            sm={20}
            md={20}
            lg={20}
            xl={20}
            style={{
              margin: "auto",
            }}
          >
            <Title
              style={{
                textAlign: "center",
                fontWeight: 900,
              }}
              level={3}
            >
              Add Payment Details
            </Title>
          </Col>
          <Col
            xs={4}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            style={{
              textAlign: "right",
            }}
          >
            <Image src={food} alt="Snow" width={50} height={70} />
          </Col>

          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
            style={{
              marginTop: 20,
            }}
          >
            <CardElement onChange={handleCardInputChange} />
          </Col>
        </Row>
      </>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onCheckout: (data, cb) => dispatch(subscribe(data, cb)),
  ongetUser: (cb) => dispatch(getUserInfo(cb)),
});
export default connect(undefined, mapDispatchToProps)(CheckoutForm);
