import { useState, useRef, useEffect } from "react";
import { paymentFormUrl } from "../../config/index";
import { locationsApi, idempotencyKey } from "../../lib/square-client";
import styles from "./square.module.css";

function Square() {
  const [errorMessages, setErrorMessages] = useState([]);
  const [initCard, setInitCard] = useState();
  const squareRef = useRef();
  const squareApplicationId = process.env.SQUARE_APPLICATION_ID;
  const squareLocationId = process.env.SQUARE_LOCATION_ID;
  const location = async () => {
    const locationResponse = await locationsApi.retrieveLocation(
      process.env.SQUARE_LOCATION_ID
    );
    const currency = locationResponse.result.location.currency;
    const country = locationResponse.result.location.country;

    return { currency, country };
  };

  // This function tokenizes a payment method.
  // The ‘error’ thrown from this async function denotes a failed tokenization,
  // which is due to buyer error (such as an expired card). It is up to the
  // developer to handle the error and provide the buyer the chance to fix
  // their mistakes.
  async function tokenize(paymentMethod) {
    const tokenResult = await paymentMethod.tokenize();
    if (tokenResult.status === "OK") {
      return tokenResult.token;
    } else {
      let errorMessage = `Tokenization failed-status: ${tokenResult.status}`;
      if (tokenResult.errors) {
        errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
      }
      throw new Error(errorMessage);
    }
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = paymentFormUrl;
  }, []);

  return (
    <div ref={squareRef}>
      <form className={styles.payment_form}>
        <div id="card-container"></div>
        <button id="card-button" type="button">
          Pay with Card
        </button>
      </form>
      <div id="payment_flow_message"></div>
    </div>
  );
}

export default Square;
