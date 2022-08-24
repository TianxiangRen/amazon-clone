import React, { forwardRef } from 'react';
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import FlipMove from "react-flip-move";

const Checkout = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB42349668_.jpg"
          alt=""
          className="checkout__ad"
        />

        <div>
          <h3> Hello, {user? user.email : "Guest"}</h3>
          <h2 className="checkout__title">Your Shopping Basket</h2>
          <div className="checkout__shoppingBasket">
            <FlipMove>
            {basket?.map((item) => {
              return <CheckoutProduct key={item.id}{...item} />
            })}
            </FlipMove>
          </div>
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
