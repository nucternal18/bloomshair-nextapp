import React, { useContext, useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import cookie from "cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";

// context
import { OrderContext } from "../../context/OrderContext";

// components
import ErrorMessage from "../../components/ErrorMessage";
import Button from "../../components/Button";
import Notification from "../../components/notification/notification";
import Layout from "../../components/Layout";

import { SERVER_URL } from "../../config";
const PayPalButton = dynamic(() => import("../../components/PayPalButton"));

const OrderDetails = (props) => {
  const { userInfo, order, orderId } = props;
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { error, payOrder, message, requestStatus } = useContext(OrderContext);

  useEffect(() => {
    setIsRefreshing(false);
  }, [order]);

  const refreshData = () => {
    router.reload();
    setIsRefreshing(true);
  };

  function addDecimals(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
  }

  const successPaymentHandler = (paymentResult) => {
    payOrder(orderId, paymentResult);
    refreshData();
  };

  let notification;
  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: message,
    };
  }
  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: error,
    };
  }

  return (
    <Layout title={`Order ${order._id}`}>
      <main className="w-full p-2 mx-auto bg-gray-200 md:p-4">
        <section className="container px-2 pt-6 pb-8 mb-4 bg-white rounded shadow-2xl md:mx-auto ">
          <div className="flex flex-col items-center justify-between mb-4 border-b-4 border-current border-gray-200 sm:px-4 sm:flex-row">
            <div className="mt-6">
              <Button type="button" color="dark" onClick={() => router.back()}>
                Go Back
              </Button>
            </div>
            <div>
              <h1 className="p-5 mt-6 font-bold md:text-5xl">
                Order {order._id}
              </h1>
            </div>
          </div>

          <div>
            <div>
              <div>
                <div>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong>
                    {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode}{" "}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <ErrorMessage variant="success">
                      Delivered on {order.deliveredAt}
                    </ErrorMessage>
                  ) : (
                    <ErrorMessage variant="danger">Not Delivered</ErrorMessage>
                  )}
                </div>
                <div>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <ErrorMessage variant="success">
                      Paid on {order.paidAt}
                    </ErrorMessage>
                  ) : (
                    <ErrorMessage variant="danger">Not Paid</ErrorMessage>
                  )}
                </div>
                <div>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <ErrorMessage variant="default">
                      {" "}
                      Your cart is empty
                    </ErrorMessage>
                  ) : (
                    <div>
                      {order.orderItems.map((item, index) => (
                        <div key={index}>
                          <div className="flex flex-row">
                            <div>
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                                className="rounded"
                              />
                            </div>
                            <div>
                              <Link href={`/product/${item.product}`}>
                                <a>{item.name}</a>
                              </Link>
                            </div>
                            <div>
                              {item.qty} x £{item.price} = £
                              {item.qty * item.price}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="relative flex flex-col mb-2 bg-white rounded-b">
                <div>
                  <div>
                    <h2>Order Summary</h2>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3>Items</h3>
                      <p>£{addDecimals(order.itemsPrice)}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3>Shipping</h3>
                      <p>£{addDecimals(order.shippingPrice)}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3>Tax</h3>
                      <p>£{addDecimals(order.taxPrice)}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3>Total</h3>
                      <p>£{addDecimals(order.totalPrice)}</p>
                    </div>
                  </div>

                  {error && (
                    <ErrorMessage variant="danger">{error}</ErrorMessage>
                  )}
                  {!order.isPaid && !userInfo.isAdmin && (
                    <>
                      <PayPalButton
                        successPaymentHandler={successPaymentHandler}
                        totalPrice={order.totalPrice}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = cookie.parse(context.req.headers.cookie);
  const { id } = context.params;

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const [userRes, orderRes] = await Promise.all([
    fetch(`${SERVER_URL}/api/users/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    fetch(`${SERVER_URL}/api/orders/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  ]);

  const [userData, orderData] = await Promise.all([
    userRes.json(),
    orderRes.json(),
  ]);

  if (!userData) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  return {
    props: { userInfo: userData, order: orderData, orderId: id }, // will be passed to the page component as props
  };
};

export default OrderDetails;
