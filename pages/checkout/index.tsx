import { useState, useEffect } from "react";
import Script from "next/script";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

// Components
import Layout from "../../components/Layout/Layout/Layout";
import CheckoutSteps from "../../components/navigation/CheckoutStepsNav/CheckoutStepsNav";
import CheckoutContainer from "../../components/CheckoutStepContainters/CheckoutContainer";
import OrderComplete from "../../components/CheckoutStepContainters/OrderComplete";

// utils
import { getUser } from "../../lib/getUser";
import ShippingContainer from "../../components/CheckoutStepContainters/ShippingContainer";
import { NEXT_URL } from "../../config";

// context
import { useCart } from "../../context/cart/cartContext";

function Checkout({ userData, PAYPAL_CLIENT_ID }) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  const { state: cartState } = useCart();
  const {
    cart: { paymentMethod },
  } = cartState;
  const steps = ["Shipping", "Review & Place Order", "Order Complete"];
  // const addPayPalScript = () => {
  //   const script = document.createElement("script");
  //   script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}`;
  //   script.async = true;
  //   script.type = "text/javascript";
  //   script.onload = () => {
  //     setScriptLoaded(true);
  //   };
  //   document.body.appendChild(script);
  // };
  // useEffect(() => {
  //   addPayPalScript();
  // }, []);
  const handleStepChange = (direction: string) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };
  return (
    <Layout title="Checkout">
      {/* Add paypal script to page */}

      <Script
        id="PayPal"
        src={`https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=GBP`}
        strategy="afterInteractive"
        onLoad={() => {
          setScriptLoaded(true);
        }}
      />

      <main className="w-full p-2 mx-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 overflow-hidden md:p-4">
        <CheckoutSteps steps={steps} currentStep={currentStep} />
        <section className="container p-2 mb-4 max-w-screen-xl rounded shadow-xl md:p-8 md:mx-auto ">
          {currentStep === 1 && (
            <ShippingContainer
              userData={userData}
              handleStepChange={handleStepChange}
            />
          )}
          {currentStep === 2 && (
            <CheckoutContainer
              scriptLoaded={scriptLoaded}
              userInfo={userData}
              handleStepChange={handleStepChange}
            />
          )}
          {currentStep === 3 && <OrderComplete />}
        </section>
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  const userData = await getUser(req);

  const payPalRes = await fetch(`${NEXT_URL}/api/process-payment/paypal`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: context.req.headers.cookie,
    },
  });

  const paypalData = await payPalRes.json();

  return {
    props: {
      userData,
      PAYPAL_CLIENT_ID: paypalData.data,
    }, // will be passed to the page component as props
  };
};

export default Checkout;
