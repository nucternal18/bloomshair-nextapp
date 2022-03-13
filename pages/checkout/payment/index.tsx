import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";

// Components
import Layout from "../../../components/Layout/Layout";
import Button from "../../../components/Button";
import CheckoutSteps from "../../../components/navigation/CheckoutStepsNav";

// context
import { useCart } from "../../../context/cart/cartContext";
import { savePaymentMethod } from "../../../context/cart/cartActions";
function Payment() {
  const router = useRouter();
  const { state, dispatch } = useCart();
  const {
    cart: { shippingAddress },
  } = state;
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/checkout/shipping");
    } else {
      setPaymentMethod(localStorage.getItem("paymentMethod") || "");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      toast.error("Payment method is required");
    } else {
      dispatch(savePaymentMethod(paymentMethod));
      router.push("/checkout/placeorder");
    }
  };
  return (
    <Layout title="Checkout">
      <main className="w-full p-2 mx-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 md:p-4">
        <CheckoutSteps step1 step2 step3 />
        <section className="container p-2 mb-4 max-w-screen-md  rounded shadow-xl md:p-12 md:mx-auto ">
          <div className="flex items-center justify-between mb-6 border-b-2 border-current border-gray-200">
            <h1 className="p-3 text-xl font-thin md:p-5 md:text-4xl">
              Payment Method
            </h1>
            <Button
              type="button"
              color="dark"
              onClick={() => {
                router.replace("/checkout/shipping");
              }}
            >
              return to shipping
            </Button>
          </div>
          <form onSubmit={submitHandler}>
            <div className="mb-8 px-2">
              <label className="block mb-2 font-light text-gray-600">
                Select Payment Method
              </label>
              <div className="flex items-center mb-1">
                <input
                  type="radio"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  className="form-radio p-2 mr-4 text-gray-700 border rounded-full focus:ring-transparent focus:outline-none"
                  onChange={() => setPaymentMethod("PayPal")}
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
              <div className="flex items-center mb-1">
                <input
                  type="radio"
                  id="Square"
                  name="paymentMethod"
                  value="Square"
                  className="form-radio p-2 mr-2 text-gray-700 border rounded-full focus:ring-transparent focus:outline-none"
                  onChange={() => setPaymentMethod("Square")}
                />
                <label htmlFor="Square" className="text-gray-600">
                  Credit or Debit Card
                </label>
              </div>
            </div>
            <Button type="submit" color="dark">
              Continue
            </Button>
          </form>
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

  return {
    props: {}, // will be passed to the page component as props
  };
};

export default Payment;
