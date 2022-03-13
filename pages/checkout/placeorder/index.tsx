import { useEffect, useState, useRef } from "react";
import Script from "next/script";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";

// Components
import ErrorMessage from "../../../components/ErrorMessage";
import Layout from "../../../components/Layout/Layout";
import CheckoutSteps from "../../../components/navigation/CheckoutStepsNav";
import Spinner from "../../../components/Spinner";
const Square = dynamic(() => import("../../../components/square"), {
  ssr: false,
});
const PaypalButton = dynamic(() => import("../../../components/PayPalButton"), {
  ssr: false,
});

// context
import { useCart } from "../../../context/cart/cartContext";
import { clearCart } from "../../../context/cart/cartActions";
import { useOrder } from "../../../context/order/OrderContext";
import { NEXT_URL } from "../../../config";

const PlaceOrderScreen = ({ userInfo, PAYPAL_CLIENT_ID }) => {
  const router = useRouter();
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);

  const { state: cartState, dispatch } = useCart();
  const {
    cart: { shippingAddress, cartItems, paymentMethod },
  } = cartState;

  const { state: orderState, createOrder } = useOrder();
  const { success, error, order } = orderState;
  const wrapper = useRef<HTMLDivElement>();

  /**
   * @desc Calculate total item price
   */
  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
  );
  /**
   * @desc Calculate shipping price
   */
  const shippingPrice = addDecimals(
    +itemsPrice > 100
      ? 0
      : shippingAddress.deliveryMethod === "nextDay"
      ? 6.95
      : 4.95
  );
  /**
   * @desc Calculate tax payable
   */
  const taxPrice = addDecimals(Number((0.2 * +itemsPrice).toFixed(2)));
  /**
   * @desc Calculate total price of all items inc. shipping
   */
  const totalPrice = addDecimals(Number(itemsPrice) + Number(shippingPrice));

  /**
   * @desc helper function to create number to 2 decimal points
   * @param num
   * @returns number to 2 decimal points
   */
  function addDecimals(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
  }

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/checkout/payment");
    }
    if (cartItems.length === 0) {
      router.push("/checkout/cart");
    }
  }, [paymentMethod, cartItems]);

  useEffect(() => {
    if (success) {
      toast.success("Order successful");
      dispatch(clearCart());
      router.push(`/orders/${order._id}`);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  /**
   * @description Creates a paypal order and returns the paypal orderID
   * @param data
   * @param actions
   * @returns
   */
  const createPaypalOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency_code: "GBP",
              value: totalPrice,
            },
          },
        ],
        // remove the application_context object if you need your users to add a shipping address
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

  /**
   * @desc handles when a payment is confirmed for paypal
   * @param data
   * @param actions
   * @returns
   */
  const onApprove = (data, actions) => {
    return actions.order
      .capture()
      .then(function async(details) {
        createOrder(
          {
            orderItems: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod,
            itemsPrice: +itemsPrice,
            shippingPrice: +shippingPrice,
            taxPrice: +taxPrice,
            totalPrice: +totalPrice,
          },
          details
        );
        toast.success("Order is paid");
      })
      .catch((err) => toast.error("Something went wrong." + err));
  };

  const onSquarePayment = (data) => {
    const paymentResult = {
      id: data.id,
      status: data.status,
      update_time: data.updatedAt,
      orderId: data.orderId,
      email_address: userInfo.email,
    };

    createOrder(
      {
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod,
        itemsPrice: +itemsPrice,
        shippingPrice: +shippingPrice,
        taxPrice: +taxPrice,
        totalPrice: +totalPrice,
      },
      paymentResult
    );
  };

  return (
    <Layout title="Checkout">
      {/* Add paypal script to page */}
      {paymentMethod === "Paypal" && (
        <Script
          id="PayPal"
          src={`https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=GBP`}
          strategy="afterInteractive"
          onLoad={() => {
            setScriptLoaded(true);
          }}
        />
      )}

      <main className="w-full p-2 mx-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 md:p-4">
        <CheckoutSteps step1 step2 step3 step4 />
        <section className="container grid grid-cols-1 gap-2 mx-auto mb-4  rounded shadow-2xl max-w-screen-lg md:grid-cols-2 lg:grid-cols-4 md:py-8 md:px-6">
          <div className=" md:col-span-2">
            <div className="mb-4  p-4 ">
              <div className="flex items-center justify-between mb-6 ">
                <h2 className="p-2 text-2xl font-thin md:p-3 md:text-3xl">
                  Checkout
                </h2>
              </div>
              <div className="flex items-center justify-between mb-6 border-t-2 border-current border-gray-200">
                <h2 className="p-2 text-2xl font-thin md:p-3 ">
                  Shipping Address
                </h2>
              </div>
              <div className="px-2 mb-4">
                <p className="text-xl font-thin">{userInfo.name}</p>
                <p className="text-xl font-thin">
                  {userInfo.shippingAddress?.address}
                </p>
                <p className="text-xl font-thin">
                  {userInfo.shippingAddress?.city}{" "}
                </p>
                <p className="text-xl font-thin">
                  {userInfo.shippingAddress?.postalCode}
                </p>
                <p className="text-xl font-thin">
                  {userInfo.shippingAddress?.country}
                </p>
              </div>

              <div className="flex items-center justify-between  border-t-2 border-current border-gray-200">
                <h2 className="p-2 text-2xl font-thin ">Payment Method</h2>
              </div>
              <div className="flex items-center px-3">
                {paymentMethod.includes("PayPal") ? (
                  <div>
                    {!scriptLoaded ? (
                      <Spinner />
                    ) : (
                      <div ref={wrapper}>
                        <PaypalButton
                          createOrder={(data, actions) =>
                            createPaypalOrder(data, actions)
                          }
                          onApprove={(data, actions) =>
                            onApprove(data, actions)
                          }
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full">
                    <Square
                      paymentAmount={Number(totalPrice).toFixed(2)}
                      onSquarePayment={onSquarePayment}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=" h-auto p-2 col-span-2 border">
            <div className="p-1">
              <div>
                <div className="p-3">
                  <h2 className="text-2xl font-thin ">Order Summary</h2>
                </div>
                <div className="w-full p-3">
                  <div>
                    <div className="flex items-center justify-between mb-4 text-xl ">
                      <div className="mr-1 font-medium">Items:</div>
                      <div className="font-thin text-lg">£{itemsPrice}</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-4 text-xl ">
                      <div className="mr-1 font-medium">Shipping:</div>
                      <div className="font-thin text-lg">£{shippingPrice}</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-4 text-xl ">
                      <div className="mr-1 font-medium">Tax:</div>
                      <div className="font-thin text-lg">{"(inc. VAT)"}</div>
                    </div>
                  </div>
                  <div className="w-full mt-4 border-t">
                    <div className="flex items-center justify-between my-4 text-xl ">
                      <div className="mr-1 font-medium">Total:</div>
                      <div className="font-thin text-lg">£{totalPrice}</div>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex items-center justify-between mb-6 border-b-2 border-current border-gray-200">
                      <h2 className="p-2 text-2xl font-thin md:p-3 ">Items</h2>
                    </div>

                    {cartItems.length === 0 ? (
                      <ErrorMessage variant="default">
                        {" "}
                        You currently have no orders
                      </ErrorMessage>
                    ) : (
                      <div className="  pt-2   overflow-y-auto">
                        <table className="w-full whitespace-nowrap">
                          <thead>
                            <tr className="h-16 w-full text-base leading-none text-gray-800">
                              <th className="font-medium text-left pl-4">
                                Product
                              </th>
                              <th className="font-medium text-left pl-12">
                                Name
                              </th>
                              <th className="font-medium text-left pl-12">
                                Qty
                              </th>
                              <th className="font-medium text-left pl-12">
                                Price
                              </th>
                            </tr>
                          </thead>
                          <tbody className="w-full">
                            {cartItems.map((item, index) => (
                              <tr
                                key={index}
                                className="h-20 text-base leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                              >
                                <td className="pl-4 text-left ">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                    className="rounded"
                                  />
                                </td>
                                <td className="pl-12 text-left font-thin">
                                  <Link href={`/product/${item.product}`}>
                                    <a>{item.name}</a>
                                  </Link>
                                </td>
                                <td className="pl-12 text-left font-thin">
                                  {item.qty}
                                </td>
                                <td className="pl-12 text-left font-thin">
                                  £{item.price}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

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

  const [userRes, payPalRes] = await Promise.all([
    fetch(`${NEXT_URL}/api/users/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: context.req.headers.cookie,
      },
    }),
    fetch(`${NEXT_URL}/api/process-payment/paypal`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: context.req.headers.cookie,
      },
    }),
  ]);

  const [userData, paypalData] = await Promise.all([
    userRes.json(),
    payPalRes.json(),
  ]);

  return {
    props: {
      userInfo: userData,
      PAYPAL_CLIENT_ID: paypalData.data,
    }, // will be passed to the page component as props
  };
};

export default PlaceOrderScreen;
