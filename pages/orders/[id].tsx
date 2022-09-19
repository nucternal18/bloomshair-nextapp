import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { GetServerSideProps } from "next";

// context
import { useOrder } from "../../context/order/OrderContext";

// components
import ErrorMessage from "../../components/ErrorMessage";
import Button from "../../components/Button";
import Layout from "../../Layout/MainLayout";

import { NEXT_URL } from "../../config";
import { Card } from "../../components/Card";

const OrderDetails = ({ order }) => {
  const router = useRouter();

  return (
    <Layout title={`Order Details: ${order?._id}`}>
      <main className="w-full p-2 text-gray-900 dark:text-gray-200  bg-white dark:bg-gray-900 md:p-4">
        <section className="container max-w-screen-lg  md:mx-auto ">
          <Card className="flex flex-col items-center justify-between mb-4 bg-white dark:bg-gray-900  sm:p-4 sm:flex-row">
            <div className="">
              <Button
                type="button"
                color="dark"
                onClick={() => {
                  router.push("/products");
                }}
              >
                continue shopping
              </Button>
            </div>
            <div>
              <h1 className="font-thin md:text-3xl">Order: {order?._id}</h1>
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-2  mb-4  max-w-screen-lg md:grid-cols-2 lg:grid-cols-4 ">
            <div className="md:col-span-3">
              <Card className="mb-4 bg-white dark:bg-gray-900  p-4">
                <div className="flex items-center justify-between mb-6 border-b-2 border-current border-gray-200">
                  <h2 className="p-2 text-2xl font-thin md:p-3 md:text-3xl">
                    Shipping
                  </h2>
                </div>
                <div>
                  <p className="mb-1">{order?.user?.name}</p>
                  <p className="mb-1">
                    <a href={`mailto:${order?.user?.email}`}>
                      {order?.user?.email}
                    </a>
                  </p>
                  <p className="text-xl font-thin mb-1">
                    {order?.shippingAddress?.address}{" "}
                    {order?.shippingAddress?.city}{" "}
                    {order?.hippingAddress?.postalCode}{" "}
                    {order?.shippingAddress?.country}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="mr-2 font-thin">status:</p>
                  {order?.isDelivered ? (
                    <p className="text-green-600">
                      Delivered on {order?.deliveredAt?.slice(0, 10)}
                    </p>
                  ) : (
                    <p className="text-red-500">Not Delivered</p>
                  )}
                </div>
              </Card>

              <Card className="mb-4 bg-white dark:bg-gray-900   p-4">
                <div className="flex items-center justify-between mb-6 border-b-2 border-current border-gray-200">
                  <h2 className="p-2 text-2xl font-thin md:text-3xl">
                    Payment Method
                  </h2>
                </div>
                <div className="mb-2 text-xl">
                  <p className="font-thin">{order?.paymentMethod}</p>
                </div>

                <div className="flex items-center">
                  <p className="mr-2 font-thin">status:</p>
                  {order.isPaid ? (
                    <p className="text-green-600">
                      Paid on {order?.paidAt?.slice(0, 10)}
                    </p>
                  ) : (
                    <p className="text-red-500">Not Paid</p>
                  )}
                </div>
              </Card>
              <Card className="mb-4 bg-white dark:bg-gray-900  p-4">
                <div className="flex items-center justify-between mb-6 border-b-2 border-current border-gray-200">
                  <h2 className="p-2 text-2xl font-thin md:p-3 md:text-3xl">
                    Order Items
                  </h2>
                </div>

                {order?.orderItems?.length === 0 ? (
                  <ErrorMessage variant="default">
                    {" "}
                    You currently have no orders
                  </ErrorMessage>
                ) : (
                  <div className="px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <table className="w-full whitespace-nowrap">
                      <thead>
                        <tr className="h-16 w-full text-base leading-none ">
                          <th className="font-medium text-left pl-4">
                            Product
                          </th>
                          <th className="font-medium text-left pl-12">Name</th>
                          <th className="font-medium text-left pl-12">Qty</th>
                          <th className="font-medium text-left pl-12">Price</th>
                        </tr>
                      </thead>
                      <tbody className="w-full">
                        {order?.orderItems?.map((item, index) => (
                          <tr
                            key={index}
                            className="h-20 text-base leading-none  hover:bg-gray-100 border-b border-t border-gray-100"
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
              </Card>
            </div>
            <div className="md:col-span-1">
              <Card className="p-1 bg-white dark:bg-gray-900  md:w-64">
                <div>
                  <div className="p-3 border-b">
                    <h2 className="text-2xl font-thin ">Order Summary</h2>
                  </div>
                  <div className="w-full p-3">
                    <div>
                      <div className="flex items-center justify-between mb-4 text-lg ">
                        <div className="mr-1 font-thin">Items:</div>
                        <div className="font-light text-lg">
                          £{order.itemsPrice}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-4 text-lg ">
                        <div className="mr-1 font-thin">Shipping:</div>
                        <div className="font-light text-lg">
                          £{order.shippingPrice}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-4 text-lg ">
                        <div className="mr-1 font-thin">Tax:</div>
                        <div className="font-light text-lg">{"(inc. VAT)"}</div>
                      </div>
                    </div>
                    <div className="w-full mt-4 border-t">
                      <div className="flex items-center justify-between my-4 text-lg ">
                        <div className="mr-1 font-thin">Total:</div>
                        <div className="font-light text-lg">
                          £{order.totalPrice}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;
  const req = context.req;
  const session = await getSession({ req });

  if (!session) {
    // If no token is present redirect user to the login page
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const [userRes, orderRes] = await Promise.all([
    fetch(`${NEXT_URL}/api/users/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: context.req.headers.cookie,
      },
    }),
    fetch(`${NEXT_URL}/api/orders/myOrders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: context.req.headers.cookie,
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
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      userInfo: userData,
      order: orderData,
      orderId: id,
    }, // will be passed to the page component as props
  };
};

export default OrderDetails;
