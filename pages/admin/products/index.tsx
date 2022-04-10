import { useContext, useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";

// Components
import Spinner from "../../../components/Spinner";
import ErrorMessage from "../../../components/ErrorMessage";
import Paginate from "../../../components/Paginate";
import AdminLayout from "../../../components/Layout/AdminLayout/AdminLayout";
import Button from "../../../components/Button";
import Table from "../../../components/Tables/ProductTable";

// Context
import { useProduct } from "../../../context/product/productContext";

import { getUser } from "../../../lib/getUser";
import { NEXT_URL } from "../../../config";
import { toast } from "react-toastify";
import { GetServerSidePropsContext } from "next";

const Products = (props) => {
  const { products } = props;
  const router = useRouter();
  const { state, deleteProduct, createProduct } = useProduct();
  const { success, error, message } = state;
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const page = state?.page;

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  useEffect(() => {
    setIsRefreshing(false);
  }, [products]);

  useEffect(() => {
    const subscribe = () => {
      const url = `${NEXT_URL}/admin/products?page=${page}`;
      router.replace(url);
    };
    subscribe();
  }, [page]);

  useEffect(() => {
    if (success) {
      toast.success(message);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [success]);

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

  return (
    <AdminLayout>
      <main className="w-full h-screen p-2 mx-auto overflow-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
        <section className="container px-2 pt-6 pb-8 mt-6 mb-4 shadow-2xl md:mx-auto ">
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
              <div className="w-full h-full flex items-center justify-center">
                <Spinner />
              </div>
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
              </div>
            )}
            <Paginate numberOfPages={props.pages} />
          </div>
        </section>
      </main>
    </AdminLayout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const req = ctx.req;
  const session = await getSession({ req });
  const { page, keyword } = ctx.query;
  let url = `products?page=${page || 1}`;
  if (keyword) {
    url += `&keyword=${keyword || ""}`;
  }
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
  const res = await fetch(`${NEXT_URL}/api/${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return {
    props: {
      products: data.products,
      page: data.page,
      pages: data.pages,
      loading: !!data,
    }, // will be passed to the page component as props
  };
}
export default Products;
