import { useContext, useState } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { getSession } from "next-auth/react";

// context
import { useOrder } from "../../../context/order/OrderContext";

// Component
import Spinner from "../../../components/Spinner";
import ErrorMessage from "../../../components/ErrorMessage";
// import Paginate from '../../components/Paginate';
import AdminLayout from "../../../components/Layout/AdminLayout";
import Button from "../../../components/Button";
import Table from "../../../components/Tables/OrdersTable";

// utils
import { getUser } from "../../../lib/getUser";

import { NEXT_URL } from "../../../config";

const OrderListScreen = (props) => {
  // const router = useRouter();
  console.log(props.orders);
  const { state } = useOrder();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <AdminLayout>
      <main className="w-full h-screen p-2 mx-auto bg-gray-100">
        <section className="container px-2 pt-6 pb-8 mx-2 mt-6 mb-4 bg-white shadow-2xl md:mx-auto ">
          <div className="flex items-center justify-between mb-6 border-b-4 border-current border-gray-200">
            <div>
              <h1 className="p-3 text-4xl font-bold md:p-5 md:text-5xl">
                Orders
              </h1>
            </div>
            <div className="flex items-center">
              <Button color="dark" type="button">
                <Link href="/orders/create">
                  <a className="flex items-center text-xl uppercase">
                    <FaPlus className="mr-1" /> Create Order
                  </a>
                </Link>
              </Button>
            </div>
          </div>
          <div className="w-100">
            {props.loading ? (
              <Spinner className="w-12 h-12" />
            ) : (
              <Table
                tableData={props.orders}
                headingColumns={[
                  "ID",
                  "CUSTOMER NAME",
                  "DATE",
                  "ORDER ITEMS",
                  "TOTAL PRICE",
                  "PAID",
                  "DELIVERED",
                  "ACTION",
                ]}
                show={show}
                handleClose={handleClose}
                handleShow={handleShow}
              />
            )}
          </div>
        </section>
      </main>
    </AdminLayout>
  );
};

export async function getServerSideProps(context) {
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
  const loading = !data ? true : false;
  return {
    props: { orders: data, loading }, // will be passed to the page component as props
  };
}

export default OrderListScreen;
