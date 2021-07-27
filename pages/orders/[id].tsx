import { useContext, useEffect, useState } from "react";
import cookie from "cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { PayPalButton } from "react-paypal-button-v2";
import { GetServerSideProps } from "next";

// context
import { OrderContext } from "../../context/OrderContext";

// components
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";
import Button from "../../components/Button";
import Notification from "../../components/notification/notification";
import Layout from "../../components/Layout";

import { SERVER_URL } from "../../config";

const OrderDetails = (props) => {
  const { userInfo, order, orderId } = props;
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const { loading, error, payOrder, message, requestStatus, success } =
    useContext(OrderContext);

  useEffect(() => {
    setIsRefreshing(false);
  }, [order]);

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    const addPaypalScript = async () => {
      const res = await fetch("/api/config/paypal");
      const data = res.json();
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [order, orderId, history, userInfo]);

  const refreshData = () => {
    router.replace(router.asPath);
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
    <Layout>
      <main className="w-full h-screen p-4 mx-auto mt-6 bg-gray-200">
        <section className="container px-2 pt-6 pb-8 mx-2 mb-4 bg-white rounded shadow-2xl md:mx-auto ">
          <div className="flex items-center justify-between px-4 mb-4 border-b-4 border-current border-gray-200">
            <div className="mt-6">
              <Button type="button" color="dark">
                <Link href="/orders">
                  <a>Go Back</a>
                </Link>
              </Button>
            </div>
            <div>
              <h1 className="p-5 mt-6 text-5xl font-bold">Order {order._id}</h1>
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
                  {loading && <Spinner />}
                  {error && (
                    <ErrorMessage variant="danger">{error}</ErrorMessage>
                  )}
                  {!order.isPaid && !userInfo.isAdmin && (
                    <div>
                      {loading && <Spinner />}
                      {!sdkReady ? (
                        <Spinner />
                      ) : (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </div>
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

  return {
    props: { userInfo: userData, order: orderData, orderId: id }, // will be passed to the page component as props
  };
};

export default OrderDetails;
