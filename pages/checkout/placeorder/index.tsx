import { useEffect, useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// Components
import ErrorMessage from "../../../components/ErrorMessage";
import Layout from "../../../components/Layout";
import CheckoutSteps from "../../../components/navigation/CheckoutStepsNav";
import { Card } from "../../../components/Card";
import Button from "../../../components/Button";

// context
import {
  OrderContext,
  ShippingAddressProps,
} from "../../../context/OrderContext";

const PlaceOrderScreen = () => {
  const router = useRouter();
  const [delAddress, setDelAddress] = useState<ShippingAddressProps | null>(
    null
  );
  const [cart, setCart] = useState([]);
  const {
    shippingAddress,
    paymentMethod,
    cartItems,
    order,
    success,
    error,
    createOrder,
  } = useContext(OrderContext);

  // Calculate prices
  const itemsPrice = addDecimals(
    cart.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = addDecimals(+itemsPrice > 100 ? 0 : 5.99);
  const taxPrice = addDecimals(Number((0.2 * +itemsPrice).toFixed(2)));
  const totalPrice = addDecimals(Number(itemsPrice) + Number(shippingPrice));

  function addDecimals(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
  }
  useEffect(() => {
    if (shippingAddress) {
      setDelAddress(shippingAddress);
    }
  }, [shippingAddress]);

  useEffect(() => {
    if (cartItems) {
      setCart(cartItems);
    }
  }, [cartItems]);

  useEffect(() => {
    if (success) {
      router.push(`/orders/${order.data._id}`);
    }
    // eslint-disable-next-line
  }, [router, success]);

  const placeOrderHandler = () => {
    createOrder({
      orderItems: cartItems,
      shippingAddress: shippingAddress,
      paymentMethod,
      itemsPrice: +itemsPrice,
      shippingPrice: +shippingPrice,
      taxPrice: +taxPrice,
      totalPrice: +totalPrice,
    });
  };
  return (
    <Layout>
      <main className="w-full p-2 mx-auto bg-gray-200 md:p-4">
        <CheckoutSteps step1 step2 step3 step4 />
        <section className="container grid grid-cols-1 gap-2 mx-auto mb-4 bg-white rounded shadow-xl md:grid-cols-2 lg:grid-cols-4 md:py-8 md:px-6">
          <div className="md:px-4 lg:col-span-3">
            <div className="p-4">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-6 border-b-4 border-current border-gray-200">
                  <h2 className="p-2 text-2xl font-semibold md:p-3 md:text-3xl">
                    Shipping
                  </h2>
                </div>
                <p className="text-xl">
                  <strong>Address: </strong>
                  {delAddress?.address} {delAddress?.city}{" "}
                  {delAddress?.postalCode} {delAddress?.country}
                </p>
              </div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-6 border-b-4 border-current border-gray-200">
                  <h2 className="p-2 text-2xl font-semibold md:p-3 md:text-3xl">
                    Payment Method
                  </h2>
                </div>
                <div className="flex items-center px-3">
                  <strong className="mr-3 text-xl">Method: </strong>
                  {paymentMethod === "PayPal" && (
                    <Image
                      src={"/paypal.png"}
                      alt="Round Icons"
                      width={100}
                      height={100}
                    />
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-6 border-b-4 border-current border-gray-200">
                  <h2 className="p-2 text-2xl font-semibold md:p-3 md:text-3xl">
                    Order Items
                  </h2>
                </div>

                {cartItems.length === 0 ? (
                  <ErrorMessage variant="default">
                    {" "}
                    Your cart is empty
                  </ErrorMessage>
                ) : (
                  <table className="w-full text-left rounded-lg ">
                    <thead>
                      <tr className="text-gray-800 border border-b-0">
                        <th className="hidden px-4 py-3 md:block">Product</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Qty</th>
                        <th className="hidden px-4 py-3 md:block">Price</th>
                        <th className="px-4 py-3">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr
                          key={index}
                          className="w-full font-light text-gray-600 whitespace-no-wrap bg-gray-100 border border-b-0"
                        >
                          <td className="hidden px-4 py-4 md:block">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                              className="rounded"
                            />
                          </td>
                          <td className="px-4 py-4 truncate">
                            <Link href={`/product/${item.product}`}>
                              <a className="font-semibold md:text-xl">
                                {item.name}
                              </a>
                            </Link>
                          </td>
                          <td className="px-4 py-4 font-semibold md:text-xl">
                            {item.qty}
                          </td>
                          <td className="hidden px-4 py-2 font-semibold md:flex md:text-xl">
                            £{item.price}
                          </td>
                          <td className="px-4 py-4 font-semibold md:text-xl">
                            £{item.qty * item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
          <div className="">
            <Card className="p-1 md:w-64">
              <div>
                <div className="p-3 border-b">
                  <h2 className="text-2xl font-semibold ">Order Summary</h2>
                </div>
                <div className="w-full p-6">
                  <div>
                    <div className="flex items-center justify-between mb-4 text-xl ">
                      <div className="mr-1 font-semibold">Items:</div>
                      <div>£{itemsPrice}</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-4 text-xl ">
                      <div className="mr-1 font-semibold">Shipping:</div>
                      <div>£{shippingPrice}</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-4 text-xl ">
                      <div className="mr-1 font-semibold">Tax:</div>
                      <div>{"(inc. VAT)"}</div>
                    </div>
                  </div>
                  <div className="w-full mt-4 border-t">
                    <div className="flex items-center justify-between my-4 text-xl ">
                      <div className="mr-1 font-semibold">Total:</div>
                      <div>£{totalPrice}</div>
                    </div>
                  </div>
                  <div className="w-full mt-2 border-t">
                    {error && (
                      <ErrorMessage variant="danger">{error}</ErrorMessage>
                    )}
                  </div>
                  <div className="mt-2 ">
                    <Button
                      type="button"
                      color="yellow"
                      className="w-full"
                      disabled={cart.length === 0}
                      onClick={placeOrderHandler}
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default PlaceOrderScreen;
