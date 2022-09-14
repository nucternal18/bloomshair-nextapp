import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

// context
import { useOrder } from "@context/order/OrderContext";

// Component
import Spinner from "@components/Spinner";
// import Paginate from '@components/Paginate';
import AdminLayout from "@components/Layout/AdminLayout/AdminLayout";
import Button from "@components/Button";
import Table from "@components/Tables/OrdersTable";

// utils
import { getUser } from "@lib/getUser";

import { NEXT_URL } from "@config/index";
import { CreateOrder } from "@components/DrawerContainers";

const OrderListScreen = ({ orders, token }) => {
  const router = useRouter();
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  useEffect(() => {
    setIsRefreshing(false);
  }, [orders]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <AdminLayout>
      <main className="w-full h-screen p-2 mx-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
        <section className=" px-2 sm:px-4 pt-6 pb-8">
          <div className="flex items-center justify-between mb-6 border-b-2 border-current border-gray-200">
            <div>
              <h1 className="p-3 text-4xl font-thin md:p-5 md:text-5xl">
                Orders
              </h1>
            </div>
            <div className="flex items-center">
              <Button
                color="dark"
                type="button"
                className="rounded"
                onClick={() => setIsOpenDrawer(!isOpenDrawer)}
              >
                <FaPlus fontSize={18} className="mr-1" />
                <span className="flex items-center text-lg capitalize">
                  Create Order
                </span>
              </Button>
            </div>
          </div>

          {isRefreshing ? (
            <div className="w-full flex items-center justify-center h-[500px]">
              <Spinner message="loading..." />
            </div>
          ) : (
            <div className="w-full sm:shadow-2xl sm:rounded-2xl">
              <Table
                tableData={orders.length > 0 ? orders : []}
                show={show}
                handleClose={handleClose}
                handleShow={handleShow}
              />
            </div>
          )}
        </section>
        <CreateOrder
          isOpenDrawer={isOpenDrawer}
          setIsOpenDrawer={setIsOpenDrawer}
          token={token}
          refreshData={refreshData}
        />
      </main>
    </AdminLayout>
  );
};

export async function getServerSideProps(context) {
  const req = context.req;
  const session: Session = await getSession({ req });

  if (!session) {
    // If no token is present redirect user to the login page
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  if (!session.user?.isAdmin) {
    return {
      redirect: {
        destination: "/not-authorized",
        permanent: false,
      },
    };
  }

  const res = await fetch(`${NEXT_URL}/api/orders/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: context.req.headers.cookie,
    },
  });
  const data = await res.json();
  console.log(
    "🚀 ~ file: index.tsx ~ line 123 ~ getServerSideProps ~ data",
    data
  );

  return {
    props: { orders: data, token: context.req.headers.cookie }, // will be passed to the page component as props
  };
}

export default OrderListScreen;
