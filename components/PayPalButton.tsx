import React, { useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const { paypal } = typeof window !== "undefined" && window;

const PayPalButtons = paypal.Buttons.driver("react", {
  React,
  ReactDOM,
});
const PaypalButton = ({ createOrder, onApprove }): JSX.Element => {
  const nodeRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={nodeRef}>
      <PayPalButtons
        style={{
          layout: "horizontal",
        }}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </div>
  );
};

PaypalButton.propTypes = {
  createOrder: PropTypes.func,
  onApprove: PropTypes.func.isRequired,
};

export default PaypalButton;
