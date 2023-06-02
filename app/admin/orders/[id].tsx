import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
import { Loader } from "@mantine/core";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";

// context
import { useAppSelector } from "app/global-state/hooks";
import { orderSelector } from "@app/features/orders/orderSlice";
import { useOrderDeliveryMutation } from "@app/features/orders/ordersApiSlice";

// components
import Button from "../../components/Button";
import AdminLayout from "../../../Layout/AdminLayout/AdminLayout";

import { NEXT_URL } from "../../../config";
import { getUser } from "../../../lib/getUser";
import { OrderProps, UserInfoProps } from "@lib/types";
import useHasMounted from "@hooks/useHasMounted";

interface IOrderScreenProps {
  order: OrderProps;
  userInfo: UserInfoProps;
}

function OrderScreen(props: IOrderScreenProps): JSX.Element {
  const { order, userInfo } = props;
  const router = useRouter();
  const [orderDelivery, { isLoading, isSuccess, isError, error }] =
    useOrderDeliveryMutation();
  const hasMounted = useHasMounted();

  const deliveryHandler = async () => {
    const id: string = order.id as string;
    orderDelivery(id as string);
    router.reload();
  };

  if (!hasMounted) {
    <AdminLayout>
      <main className="md:ml-56 h-screen p-4 mx-auto overflow-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-center">
          <Loader size="xl" variant="bars" />
        </div>
      </main>
    </AdminLayout>;
  }

  return (
    <AdminLayout>
      <main className="md:ml-56  p-4 mx-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
        <section className="container px-2 pt-6 pb-8 mx-2 my-4  rounded max-w-screen-lg shadow-2xl md:mx-auto ">
          <div className="flex flex-col sm:flex-row items-center justify-between px-4 mb-4 border-b-2 border-current border-gray-200">
            <div className="mt-6">
              <Button color="dark" type="button">
                <Link href="/admin/orders">
                  <a>Go Back</a>
                </Link>
              </Button>
            </div>
            <div className="mt-6"></div>
            <div>
              <h1 className="p-3 mt-6 text-sm md:text-2xl font-light">
                Order Id: {order?.id}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2  mb-4  max-w-screen-lg md:grid-cols-2 lg:grid-cols-4 ">
            <div className="md:col-span-2">
              <div className="mb-4  ">
                <div className="flex items-center justify-between mb-6   border-gray-200">
                  <h2 className="p-2 text-2xl font-thin md:p-3 md:text-3xl">
                    Shipping
                  </h2>
                </div>
                <div className="px-2">
                  <p className="mb-1">{order.user?.name}</p>
                  <p className="mb-1">
                    <a href={`mailto:${order.user?.email}`}>
                      {order.user?.email}
                    </a>
                  </p>
                  <p className="text-xl font-thin mb-1">
                    {order.shippingAddress?.address}{" "}
                    {order.shippingAddress?.city}{" "}
                    {order.shippingAddress?.postalCode}{" "}
                    {order.shippingAddress?.country}
                  </p>
                </div>
                <div className="flex px-2 items-center">
                  <p className="mr-2 font-thin">status:</p>
                  {order.isDelivered ? (
                    <p className="text-green-600">
                      Delivered on{" "}
                      {new Date(order.deliveredAt as Date).toLocaleString()}
                    </p>
                  ) : (
                    <p className="text-red-500">Not Delivered</p>
                  )}
                </div>
              </div>

              <div className="mb-4   ">
                <div className="flex items-center justify-between mb-6 border-t-2 border-current border-gray-200">
                  <h2 className="p-2 text-2xl font-thin md:text-3xl">
                    Payment Method
                  </h2>
                </div>
                <div className="px-2">
                  <div className="mb-2 text-xl">
                    <p className="font-thin">{order.paymentMethod}</p>
                  </div>

                  <div className="flex items-center">
                    <p className="mr-2 font-thin">status:</p>
                    {order.isPaid ? (
                      <p className="text-green-600">
                        Paid on{" "}
                        {new Date(order.paidAt as Date).toLocaleString()}
                      </p>
                    ) : (
                      <p className="text-red-500">Not Paid</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 border">
              <div>
                <div>
                  <div className="p-3 ">
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
                  <div className="mb-4 p-3">
                    <div className="flex items-center justify-between mb-1 border-t-2 border-current border-gray-200">
                      <h2 className="p-2 text-2xl font-thin md:p-3 ">Items</h2>
                    </div>

                    <div className="py-4 overflow-y-auto">
                      <table className="w-full whitespace-nowrap">
                        <thead>
                          <tr className="h-16 w-full text-base leading-none ">
                            <th className="font-medium text-left pl-4">
                              Product
                            </th>
                            <th className="font-medium text-left pl-12">
                              Name
                            </th>
                            <th className="font-medium text-left pl-12">Qty</th>
                            <th className="font-medium text-left pl-12">
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody className="w-full">
                          {order?.orderItems?.map(
                            (item: OrderProps, index: number) => (
                              <tr
                                key={index}
                                className="h-20 text-base leading-none text-gray-800  hover:bg-gray-100 border-b border-t border-gray-100"
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
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="p-3 w-full">
                    {userInfo &&
                      userInfo.isAdmin &&
                      order?.isPaid &&
                      !order?.isDelivered && (
                        <div>
                          <Button
                            type="button"
                            color="dark"
                            className="btn btn-block w-full"
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const req = context.req;
  const session: Session = (await getSession({ req })) as Session;

  if (!session) {
    // If no token is present redirect user to the login page
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  const userData = await getUser(req);

  if (!session.user?.isAdmin) {
    return {
      redirect: {
        destination: "/not-authorized",
        permanent: false,
      },
    };
  }

  const res = await fetch(`${NEXT_URL}/api/orders/${context.params?.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: context.req.headers.cookie,
    } as HeadersInit,
  });
  const data = await res.json();

  return {
    props: { order: data, orderId: context.params?.id, userInfo: userData }, // will be passed to the page component as props
  };
};

export default OrderScreen;
