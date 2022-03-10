/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { toast } from "react-toastify";
import {
  SquarePaymentsForm,
  CreditCardInput,
} from "react-square-web-payments-sdk";
import { NEXT_URL } from "../../config/index";
import { TokenResult } from "@square/web-sdk";

function Square({ paymentAmount, onSquarePayment }) {
  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <>
      <SquarePaymentsForm
        applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID}
        locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID}
        cardTokenizeResponseReceived={async (token: TokenResult, buyer) => {
          setSubmitting(true);
          const paymentResponse = await fetch(
            `${NEXT_URL}/api/process-payment/square`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                sourceId: token.token,
                paymentAmount,
              }),
            }
          );
          const data = await paymentResponse.json();
          if (paymentResponse.ok) {
            setSubmitting(false);
            console.log(data);
            onSquarePayment(data);
            toast("Payment Successful");
          }
        }}
      >
        <CreditCardInput />
      </SquarePaymentsForm>
    </>
  );
}

export default Square;
