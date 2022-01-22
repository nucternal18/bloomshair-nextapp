import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { NEXT_URL } from "../../config/index";
import { locationsApi, idempotencyKey, client } from "../../lib/square-client";

function Square({ paymentAmount, squarePayments, squareLocationId }) {
  const [squareCard, setSquareCard] = useState(undefined);
  const [isSubmitting, setSubmitting] = useState(false);

  /**
   * @desc Call this function to send a payment token, buyer name, and other details
   * to the project server code so that a payment can be created with
   * Payments API
   *
   * @param token
   * @returns
   */
  async function createPayment(token: any) {
    try {
      setSubmitting(true);
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
        setSubmitting(false);
        return paymentResponse.json();
      } else {
        setSubmitting(false);
        const errorBody = await paymentResponse.text();
        toast.error(errorBody);
      }
    } catch (error) {
      toast.error(error.message);
    }
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

  async function initializeCard() {
    const card = await squarePayments.card();
    card.attach("#card-container");
    setSquareCard(card);
  }

  // Handle Square payment methods initialization and re-attachment
  useEffect(() => {
    if (squarePayments) {
      if (!squareCard) initializeCard();
    }
    // Otherwise, we destroy the objects and reset state
    else {
      if (squareCard) {
        squareCard.destroy();
        setSquareCard(undefined);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squarePayments]);

  return (
    <div>
      <form id="payment-form">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div id="card-container"></div>
          <button id="card-button" type="button" disabled={isSubmitting}>
            Pay with Card
          </button>
        </div>
      </form>
      <div id="payment-status-container"></div>
    </div>
  );
}

export default Square;
