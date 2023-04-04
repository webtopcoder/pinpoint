import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  getUserInfo,
  postTransaction,
  subscribe,
} from "@/src/redux/Profile/actions";
import { connect } from "react-redux";
import useNotify from "@/hooks/useNotify";
import { Modal, Row, Col, Typography } from "antd";
import Image from "next/image";
import food from "@/public/images/landing/food.png";

const { Title } = Typography;

const CheckoutForm = ({
  customerId,
  priceId,
  onCheckout,
  onPayment,
  showModal,
  onCancel,
  setShowModal,
}) => {
  const [error, setError] = useState(undefined);
  const [disabled, setDisabled] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  function handleCardInputChange(event) {
    // Listen for changes in card input
    // and display errors, if any, to the user
    // Also control the disabled state of the submit button
    // if the input field is empty
    setDisabled(event?.empty);
    setError(event?.error?.message ?? "");
  }
  const { notify } = useNotify();

  async function handleCheckoutFormSubmit(event) {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Call the subscribe endpoint and create a Stripe subscription
    // object. Returns the subscription ID and client secret
    const data = {
      customerId: customerId,
      priceId: priceId,
    };

    await onCheckout(data, async (res, error) => {
      const subscription = res;
      if (!subscription) {
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

        data = {
          order: `${stripePayload.id} - trial`,
          amount: 0,
          currency: "usd",
          priceId,
          trial: true,
        };
      } else {
        stripePayload = await stripe.confirmCardPayment(
          subscription.clientSecret, // returned by subscribe endpoint
          {
            payment_method: {
              card: elements.getElement(CardElement),
            },
          }
        );

        data = {
          order: stripePayload.paymentIntent,
          amount: stripePayload.paymentIntent.amount,
          currency: stripePayload.paymentIntent.currency,
          priceId,
        };
      }

      await onPayment(data, (res, error) => {
        if (error) {
          console.log(error);
          notify("error", "Transaction send failed");
        }
      });

      if (stripePayload.error) {
        setError(stripePayload.error.message);
        notify("error", "Stripe error");
        return;
      }

      notify("success", "Subscription purchase successful");

      setShowModal(false);
    });
  }

  return (
    <Modal
      open={showModal}
      okText="Pay Now"
      onOk={handleCheckoutFormSubmit}
      onCancel={onCancel}
      closable={false}
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
  onPayment: (data, cb) => dispatch(postTransaction(data, cb)),
  ongetUser: (cb) => dispatch(getUserInfo(cb)),
});
export default connect(undefined, mapDispatchToProps)(CheckoutForm);
