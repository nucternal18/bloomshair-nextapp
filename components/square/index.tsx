import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { NEXT_URL } from "../../config/index";
import { locationsApi, idempotencyKey } from "../../lib/square-client";

function Square({ paymentAmount }) {
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

  async function initializeCard(payments: { card: () => any }) {
    const card = await payments.card();
    await card.attach("#card-container");

    return card;
  }

  /**
   * @desc Call this function to send a payment token, buyer name, and other details
   * to the project server code so that a payment can be created with
   * Payments API
   *
   * @param token
   * @returns
   */
  async function createPayment(token: any) {
    const bodyParameters = {
      squareLocationId,
      paymentToken: token,
      paymentAmount,
    };

    const body = JSON.stringify(bodyParameters);

    const paymentResponse = await fetch(
      `${NEXT_URL}/api/process-payment/square`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }
    );

    if (paymentResponse.ok) {
      return paymentResponse.json();
    }

    const errorBody = await paymentResponse.text();
    toast.error(errorBody);
  }

  /**
   * @desc This function tokenizes a payment method.
   * The ‘error’ thrown from this async function denotes a failed tokenization,
   * which is due to buyer error (such as an expired card). It is up to the
   * developer to handle the error and provide the buyer the chance to fix
   * their mistakes.
   *
   * @param paymentMethod
   * @returns
   */
  async function tokenize(paymentMethod: { tokenize: () => any }) {
    const tokenResult = await paymentMethod.tokenize();
    if (tokenResult.status === "OK") {
      return tokenResult.token;
    } else {
      let errorMessage = `Tokenization failed-status: ${tokenResult.status}`;
      if (tokenResult.errors) {
        errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
      }
      toast.error(errorMessage);
    }
  }

  useEffect(() => {
    const createCard = async () => {
      if (typeof window !== undefined) {
        if (!window.Square) {
          toast.error("Square.js failed to load properly");
        }
        const payments = window.Square.payments(
          squareApplicationId,
          squareLocationId
        );
        let card: any;
        try {
          card = await initializeCard(payments);
        } catch (e) {
          toast.error("Initializing Card failed " + e, {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        }
      }
    };
    createCard();
  }, []);

  return (
    <div ref={squareRef}>
      <form id="payment-form">
        <div id="card-container"></div>
        <button id="card-button" type="button">
          Pay with Card
        </button>
      </form>
      <div id="payment-status-container"></div>
    </div>
  );
}

export default Square;
