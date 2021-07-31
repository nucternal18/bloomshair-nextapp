import React from "react";
import ErrorMessage from "./ErrorMessage";

declare global {
  interface Window {
    paypal: any;
  }
}

function PayPalButton({ successPaymentHandler, totalPrice }): JSX.Element {
  const [paid, setPaid] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [error, setError] = React.useState(null);
  const paypalRef = React.useRef();

  React.useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AVWa8N4iHxN5XSlZoJerbtPPdJbVkCHLaJgmmYfqKdY6ncElIYgSz-0GUwc0SRiIlIyDzSIM6mcEWcyv";
    script.addEventListener("load", () => setLoaded(true));
    document.head.appendChild(script);
    if (loaded) {
      setTimeout(() => {
        if (typeof window !== "undefined") {
          console.log(window);
          window.paypal
            .Buttons({
              createOrder: (data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      description: "Your description",
                      amount: {
                        currency_code: "GBP",
                        value: totalPrice,
                      },
                    },
                  ],
                });
              },
              onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                setPaid(true);
                successPaymentHandler(order);
                console.log(order);
              },
              onError: (err) => {
                setError(err), console.error(err);
              },
            })
            .render(paypalRef.current);
        }
      });
    }
  }, []);

  // If the payment has been made
  if (paid) {
    return <div>Payment successful.!</div>;
  }

  // If any error occurs
  if (error) {
    return (
      <ErrorMessage variant="danger">
        Error Occurred in processing payment.! Please try again.
      </ErrorMessage>
    );
  }

  return <div ref={paypalRef}></div>;
}

export default PayPalButton;
