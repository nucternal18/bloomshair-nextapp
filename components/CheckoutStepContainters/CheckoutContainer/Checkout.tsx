import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Components
import ErrorMessage from "../../ErrorMessage";
import Spinner from "../../Spinner";
import Square from "../../square/Square";
import PaypalButton from "../../PayPalButton";

// context
import { useCart } from "../../../context/cart/cartContext";
import {
  clearCart,
  savePaymentMethod,
} from "../../../context/cart/cartActions";
import { useOrder } from "../../../context/order/OrderContext";

const CheckOutContainer = ({ userInfo, paypalClientID, handleStepChange }) => {
  const router = useRouter();
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
    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cartItems]);

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
        toast.success("Payment Successful");
        handleStepChange("next");
        dispatch(clearCart());
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
    toast.success("Payment Successful");
    handleStepChange("next");
    dispatch(clearCart());
  };

  const handlePayment = (method: string) => {
    dispatch(savePaymentMethod(method));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <div className=" md:col-span-1">
        <div className="mb-4  p-4 ">
          <div className="flex items-center justify-between mb-6 ">
            <h2 className="p-2 text-2xl font-thin md:p-3 md:text-3xl">
              Checkout
            </h2>
          </div>
          <div className="flex items-center justify-between mb-4 border-t-2 border-current border-gray-200">
            <h2 className="p-2 text-2xl font-thin ">Shipping Address</h2>
          </div>
          <div className="px-2 mb-4">
            <p className="text-lg font-thin">{userInfo.name}</p>
            <p className="text-md font-thin">
              {userInfo.shippingAddress?.address}
            </p>
            <p className="text-md font-thin">
              {userInfo.shippingAddress?.city}{" "}
            </p>
            <p className="text-md font-thin">
              {userInfo.shippingAddress?.postalCode}
            </p>
            <p className="text-md font-thin">
              {userInfo.shippingAddress?.country}
            </p>
          </div>

          <div className="flex items-center justify-between  border-t-2 border-current border-gray-200">
            <h2 className="p-2 text-2xl font-thin ">Payment Method</h2>
          </div>
          <div className="flex items-center px-3">
            <div className="mb-8 px-2 w-full">
              <label className="block mb-2 font-light text-gray-600">
                Select Payment Method
              </label>
              <div className="flex items-center mb-1">
                <input
                  type="radio"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  className="form-radio p-2 mr-4 text-gray-400 border rounded-full focus:ring-transparent focus:outline-none"
                  onChange={() => handlePayment("PayPal")}
                />
                <label htmlFor="PayPal">
                  <Image
                    src={"/paypal.png"}
                    alt="Round Icons"
                    width={100}
                    height={100}
                  />
                </label>
              </div>
              {paymentMethod === "PayPal" && (
                <PayPalScriptProvider
                  options={{
                    "client-id": paypalClientID,
                    components: "buttons",
                    currency: "GBP",
                  }}
                >
                  <div ref={wrapper}>
                    <PaypalButton
                      createOrder={(data, actions) =>
                        createPaypalOrder(data, actions)
                      }
                      onApprove={(data, actions) => onApprove(data, actions)}
                    />
                  </div>
                </PayPalScriptProvider>
              )}
              <div className="flex items-center mb-1">
                <input
                  type="radio"
                  id="Square"
                  name="paymentMethod"
                  value="Square"
                  className="form-radio p-2 mr-2 text-gray-700 border rounded-full focus:ring-transparent focus:outline-none"
                  onChange={() => handlePayment("Square")}
                />
                <label htmlFor="Square">Credit or Debit Card</label>
              </div>
              {paymentMethod === "Square" && (
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
      </div>
      <div className="p-2 col-span-1 ">
        <div className="p-1 border">
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
                        <tr className="h-16 w-full text-base leading-none">
                          <th className="font-medium text-left pl-4">
                            Product
                          </th>
                          <th className="font-medium text-left pl-12">Name</th>
                          <th className="font-medium text-left pl-12">Qty</th>
                          <th className="font-medium text-left pl-12">Price</th>
                        </tr>
                      </thead>
                      <tbody className="w-full">
                        {cartItems.map((item, index) => (
                          <tr
                            key={index}
                            className="h-20 text-base leading-none border-b border-t border-gray-100"
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
    </div>
  );
};

export default CheckOutContainer;
