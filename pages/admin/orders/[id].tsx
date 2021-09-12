import { useContext, useEffect } from "react";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import Link from "next/link";

// context
import { useOrder } from "../../../context/order/OrderContext";

// components
import Spinner from "../../../components/Spinner";
import ErrorMessage from "../../../components/ErrorMessage";
import Button from "../../../components/Button";
import Notification from "../../../components/notification/notification";
import AdminLayout from "../../../components/Layout/AdminLayout";

import { NEXT_URL } from "../../../config";
import { getUser } from "../../../lib/getUser";

function OrderScreen(props): JSX.Element {
  const { order, userInfo } = props;
  const router = useRouter();
  const { state, orderDelivery } = useOrder();

  const refreshData = () => {
    router.reload();
  };

  function addDecimals(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
  }

  const deliveryHandler = () => {
    orderDelivery(props.order);
    refreshData();
  };

  return (
    <AdminLayout>
      <main className="w-full h-screen p-4 mx-auto  bg-gray-200">
        <section className="container px-2 pt-6 pb-8 mx-2 my-4 bg-white rounded max-w-screen-lg shadow md:mx-auto ">
          <div className="flex flex-col sm:flex-row items-center justify-between px-4 mb-4 border-b-2 border-current border-gray-200">
            <div className="mt-6">
              <Button color="dark" type="button">
                <Link href="/admin/orders">
                  <a>Go Back</a>
                </Link>
              </Button>
            </div>
            <div>
              <h1 className="p-3 mt-6 text-sm md:text-3xl font-thin">
                Order: {order._id}
              </h1>
            </div>
          </div>

          <div className="px-2 sm:px-8">
            <div className="mb-4">
              <div className="mb-4">
                <div>
                  <div>
                    <div className="flex flex-col sm:flex-row items-center justify-between px-2 my-4 border-b-2 border-current border-gray-200">
                      <div className="text-2xl sm:text-4xl font-thin mb-2">
                        <h2>Shipping</h2>
                      </div>
                    </div>

                    <p className="font-semibold mb-1">
                      Name:
                      <span className="font-medium ml-2">
                        {order.user?.name}
                      </span>
                    </p>
                    <p className="font-semibold mb-1">
                      Email:
                      <a href={`mailto:${order.user?.email}`}>
                        {order.user?.email}
                      </a>
                    </p>
                    <p className="font-semibold mb-1 ">
                      Address:
                      <span className="font-medium ml-2">
                        {order.shippingAddress?.address},{" "}
                        {order.shippingAddress?.city},{" "}
                        {order.shippingAddress?.postalCode}{" "}
                        {order.shippingAddress?.country}
                      </span>
                    </p>
                    {order.isDelivered ? (
                      <ErrorMessage variant="success">
                        Delivered on {order?.deliveredAt}
                      </ErrorMessage>
                    ) : (
                      <ErrorMessage variant="danger">
                        Not Delivered
                      </ErrorMessage>
                    )}
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row items-center justify-between px-2 my-4 border-b-2 border-current border-gray-200">
                      <div className="text-2xl sm:text-4xl font-thin mb-2">
                        <h2>Payment Method</h2>
                      </div>
                    </div>

                    <p className="font-semibold mb-1 ">
                      Method:
                      <span className="font-medium ml-2">
                        {order?.paymentMethod}
                      </span>
                    </p>
                    {order.isPaid ? (
                      <ErrorMessage variant="success">
                        Paid on {order?.paidAt}
                      </ErrorMessage>
                    ) : (
                      <ErrorMessage variant="danger">Not Paid</ErrorMessage>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="relative flex flex-col mb-2 bg-white rounded-b">
                  <div>
                    <div className="flex flex-col sm:flex-row items-center justify-between px-2 my-4 border-b-2 border-current border-gray-200">
                      <div className="text-2xl sm:text-4xl font-thin mb-2">
                        <h2>Order Summary</h2>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center font-semibold mb-1">
                        <h3>Items: </h3>
                        <p className="font-medium ml-2">
                          £{addDecimals(order?.itemsPrice)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center font-semibold mb-1">
                        <h3>Shipping:</h3>
                        <p className="font-medium ml-2">
                          £{addDecimals(order?.shippingPrice)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center font-semibold mb-1">
                        <h3>Tax:</h3>
                        <p className="font-medium ml-2">
                          £{addDecimals(order?.taxPrice)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center font-semibold mb-1">
                        <h3>Total:</h3>
                        <p className="font-medium ml-2">
                          £{addDecimals(order?.totalPrice)}
                        </p>
                      </div>
                    </div>
                    {state.loading && <Spinner className="w-12 h-12" />}
                    {state.error && (
                      <ErrorMessage variant="danger">
                        {state.error}
                      </ErrorMessage>
                    )}
                    {userInfo &&
                      userInfo.isAdmin &&
                      order?.isPaid &&
                      !order?.isDelivered && (
                        <div>
                          <Button
                            type="button"
                            color="dark"
                            className="btn btn-block"
                            onClick={deliveryHandler}
                          >
                            Mark As Delivered
                          </Button>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const req = context.req;
  const session = await getSession({ req });

  if (!session) {
    // If no token is present redirect user to the login page
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }
  const userData = await getUser(req);

  if (!userData?.isAdmin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const res = await fetch(`${NEXT_URL}/api/orders/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: context.req.headers.cookie,
    },
  });
  const data = await res.json();

  return {
    props: { order: data, orderId: id, userInfo: userData }, // will be passed to the page component as props
  };
}

export default OrderScreen;
