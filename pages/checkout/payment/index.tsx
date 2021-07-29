import { useContext, useEffect, useState } from "react";
import cookie from "cookie";
import { useRouter } from "next/router";
import Image from "next/image";

// Components
import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import CheckoutSteps from "../../../components/navigation/CheckoutStepsNav";

// context
import { OrderContext } from "../../../context/OrderContext";
function Shipping() {
  const router = useRouter();
  const { shippingAddress, savePaymentMethod } = useContext(OrderContext);
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  useEffect(() => {
    if (!shippingAddress) {
      router.push("/checkout/shipping");
    }
  }, [router, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(paymentMethod);
    router.push("/checkout/placeorder");
  };
  return (
    <Layout>
      <main className="w-full p-2 mx-auto bg-gray-200 md:p-4">
        <CheckoutSteps step1 step2 step3 />
        <section className="container p-2 mb-4 bg-white rounded shadow-xl md:p-12 md:mx-auto ">
          <div className="flex items-center justify-between mb-6 border-b-4 border-current border-gray-200">
            <h1 className="p-3 text-2xl font-bold md:p-5 md:text-5xl">
              Payment Method
            </h1>
          </div>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block mb-2 font-light text-gray-600">
                Select Payment Method
              </label>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  checked
                  className="w-4 h-4 px-3 py-3 mr-4 text-gray-700 border rounded"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="PayPal" className="text-gray-600">
                  <Image
                    src={"/paypal.png"}
                    alt="Round Icons"
                    width={100}
                    height={100}
                  />
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="Square"
                  name="paymentMethod"
                  value="Square"
                  className="w-4 h-4 px-3 py-3 mr-2 text-gray-700 border rounded"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="Square" className="text-gray-600">
                  Credit or Debit Card
                </label>
              </div>
            </div>
            <Button type="submit" color="yellow">
              Continue
            </Button>
          </form>
        </section>
      </main>
    </Layout>
  );
}

export default Shipping;
