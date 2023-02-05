import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { subscribe } from "@/src/redux/Profile/actions";
import { connect } from "react-redux";
import useNotify from "@/hooks/useNotify";

const CheckoutForm = ({ customerId, priceId, onCheckout, onPayment }) => {
  const [error, setError] = useState(undefined);
  const [disabled, setDisabled] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  console.log(priceId);
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
    console.log(data);
    await onCheckout(data, async (res, error) => {
      console.log(res);
      const subscription = res;
      console.log(subscription);
      if (!subscription) {
        notify("error", "Subscription purchase failed");
        return;
      }
      const stripePayload = await stripe.confirmCardPayment(
        subscription.clientSecret, // returned by subscribe endpoint
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );
      console.log(stripePayload);
      const data = {
        order: stripePayload.paymentIntent,
        amount: stripePayload.paymentIntent.amount,
        currency: stripePayload.paymentIntent.currency,
        priceId: "price_1MXlprDRRpegNszZVriDy4L0",
      };
      await onPayment(data, async (res, error) => {
        if (error) {
          console.log(error);
        }
      });
      if (stripePayload.error) {
        setError(stripePayload.error.message);
        notify("error", error);
      }
    });
  }

  return (
    <form onSubmit={handleCheckoutFormSubmit}>
      <CardElement onChange={handleCardInputChange} />
      <button disabled={!stripe && disabled} type="submit">
        Pay Now
      </button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onCheckout: (data, cb) => dispatch(subscribe(data, cb)),
  onPayment: (data, cb) => dispatch(postTransaction(data, cb)),
});
export default connect(undefined, mapDispatchToProps)(CheckoutForm);
