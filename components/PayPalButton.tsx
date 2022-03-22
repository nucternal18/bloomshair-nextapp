import React, { useRef } from "react";
import PropTypes from "prop-types";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Spinner from "./Spinner";
const PaypalButton = ({ createOrder, onApprove }): JSX.Element => {
  const [{ isPending }] = usePayPalScriptReducer();
  return (
    <div>
      {isPending ? (
        <Spinner message="loading..." />
      ) : (
        <PayPalButtons
          style={{
            layout: "horizontal",
          }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      )}
    </div>
  );
};

PaypalButton.propTypes = {
  createOrder: PropTypes.func,
  onApprove: PropTypes.func.isRequired,
};

export default PaypalButton;
