import React, { useEffect, useState } from "react";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import { useNavigate } from "react-router-dom";
import axios from "./axios";
import FlipMove from "react-flip-move";
import { db, postOrderInfo } from "./firebase";

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in currcencies' subunits
        url: `/payments/create?total=${Math.trunc(
          getBasketTotal(basket) * 100
        )}`,
      });

      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  // console.log("The secret is >>> ", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        postOrderInfo(db, user, basket, paymentIntent);

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        console.log("Payment Success with ID >>> ", paymentIntent.id);

        navigate("/orders", { replace: true });
        dispatch({
          type: "EMPTY_BASKET",
        });
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.mesage : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (
          <Link to="/checkout">
            {basket?.length} {basket?.length > 1 ? "items" : "item"}
          </Link>
          )
        </h1>
        {/* Delivery Address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket?.length === 0 && (
              <p className="payment__emptyBasketText" style={{ color: "grey" }}>
                You basket is empty, please add an item.
              </p>
            )}
            <FlipMove>
              {basket?.map((item) => {
                return <CheckoutProduct key={item.id} {...item} />;
              })}
            </FlipMove>
          </div>
        </div>

        {/* Payment Method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <h2> Card Details</h2>
            <form onSubmit={handleSubmit}>
              <CardElement
                className="payment__cardInfo"
                onChange={handleChange}
              />

              <CurrencyFormat
                renderText={(value) => (
                  <>
                    <h3>Order Total: {value}</h3>
                  </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType="text"
                thousandSeparator={true}
                prefix="$"
              />
              <button
                disabled={
                  processing || disabled || succeeded || basket?.length === 0
                }
              >
                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
              </button>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
