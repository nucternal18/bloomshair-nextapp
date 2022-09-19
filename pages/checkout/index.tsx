import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

// Components
import Layout from "../../Layout/MainLayout/Layout";
import CheckoutSteps from "../../components/navigation/CheckoutStepsNav/CheckoutStepsNav";
const CheckoutContainer = dynamic(
  import("../../components/CheckoutStepContainters/CheckoutContainer"),
  { ssr: false }
);
const ShippingContainer = dynamic(
  import("../../components/CheckoutStepContainters/ShippingContainer"),
  { ssr: false }
);
import OrderComplete from "../../components/CheckoutStepContainters/OrderComplete";

// utils
import { getUser } from "../../lib/getUser";
import { NEXT_URL } from "../../config";

function Checkout({ userData, PAYPAL_CLIENT_ID }) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const steps = ["Shipping", "Review & Place Order", "Order Complete"];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStepChange = (direction: string) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };
  return (
    mounted && (
      <Layout title="Checkout">
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
                paypalClientID={PAYPAL_CLIENT_ID}
                userInfo={userData}
                handleStepChange={handleStepChange}
              />
            )}
            {currentStep === 3 && <OrderComplete />}
          </section>
        </main>
      </Layout>
    )
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
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
