import { useContext, useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";

// Components
import Spinner from "../../../components/Spinner";
import ErrorMessage from "../../../components/ErrorMessage";
import Paginate from "../../../components/Paginate";
import AdminLayout from "../../../components/Layout/AdminLayout";
import Button from "../../../components/Button";
import Table from "../../../components/Tables/ProductTable";
import Notification from "../../../components/notification/notification";

// Context
import { ProductContext } from "../../../context/product/productContext";

import { getUser } from "../../../lib/getUser";
import { NEXT_URL } from "../../../config";

const Products = (props) => {
  const { products } = props;
  const router = useRouter();
  const { error, deleteProduct, createProduct, message, requestStatus } =
    useContext(ProductContext);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const data = products.map((row) => {
    return {
      id: row["_id"],
      image: row["image"],
      name: row["name"],
      price: row["price"],
      category: row["category"],
      brand: row["brand"],
      countInStock: row["countInStock"],
      action: row["action"],
    };
  });

  useEffect(() => {
    setIsRefreshing(false);
  }, [data]);

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      // DELETE Products
      deleteProduct(id);
      refreshData();
    }
  };

  const createProductHandler = () => {
    createProduct();
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
    <AdminLayout>
      <main className="w-full h-screen p-2 mx-auto overflow-auto bg-gray-200">
        <section className="container px-2 pt-6 pb-8 mt-6 mb-4 bg-white shadow-2xl md:mx-auto ">
          <div className="flex items-center justify-between mb-6 border-b-4 border-current border-gray-200">
            <div>
              <h1 className="p-3 text-4xl font-bold md:p-5 md:text-5xl">
                Products
              </h1>
            </div>
            <div className="text-sm ">
              <Button color="dark" type="button" onClick={createProductHandler}>
                <FaPlus className="mr-1" /> Create Product
              </Button>
            </div>
          </div>
          <div>
            {isRefreshing ? (
              <Spinner className="w-12 h-12" />
            ) : error ? (
              <ErrorMessage variant="danger">{error}</ErrorMessage>
            ) : (
              <div className="w-full mx-auto overscroll-auto">
                <Table
                  tableData={data}
                  headingColumns={[
                    "ID",
                    "IMAGE",
                    "NAME",
                    "PRICE",
                    "CATEGORY",
                    "BRAND",
                    "COUNT IN STOCK",
                    "ACTION",
                  ]}
                  deleteHandler={deleteHandler}
                />

                <Paginate
                  pages={props.pages}
                  page={props.page}
                  isAdmin={true}
                />
              </div>
            )}
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
    </AdminLayout>
  );
};

export async function getServerSideProps({
  req,
  query: { pageNumber = 1, keyword = "" },
}) {
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
  const res = await fetch(
    `${NEXT_URL}/api/products?keyword=${keyword}&pageNumber=${pageNumber}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();

  return {
    props: { products: data.products, page: data.page, pages: data.pages }, // will be passed to the page component as props
  };
}
export default Products;
