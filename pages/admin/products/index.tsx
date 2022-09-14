import { useState, useEffect, useCallback } from "react";
import { getSession } from "next-auth/react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { GetServerSidePropsContext } from "next";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";

// Components
import Spinner from "../../../components/Spinner";
import Paginate from "../../../components/Paginate";
import AdminLayout from "../../../components/Layout/AdminLayout/AdminLayout";
import Button from "../../../components/Button";
import Table from "../../../components/Tables/ProductTable";

// Context
import {
  ActionType,
  useProduct,
} from "../../../context/product/productContext";

// utils
import { getUser } from "../../../lib/getUser";
import { NEXT_URL } from "../../../config";
import { ProductProps } from "../../../lib/types";

interface IProductPageProps {
  products: ProductProps[];
  pages: number;
}

const fetchProducts = async (page: number): Promise<ProductProps[]> => {
  const res = await fetch(`${NEXT_URL}/admin/products?page=${page}`);
  return await res.json();
};

const Products = (props: IProductPageProps) => {
  const router = useRouter();
  const {
    state,
    dispatch,
    deleteProduct,
    createProduct,
    state: { loading, page },
  } = useProduct();
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["productData"], () => fetchProducts(page), {
    initialData: props.products,
  });

  const refreshData = () => {
    router.push(router.asPath);
  };

  /**
   * @description - map through the products and return the required data
   * @param {array} products - array of products
   */
  const data = products.map((row: Partial<ProductProps>) => {
    return {
      id: row["id"],
      image: row["image"],
      name: row["name"],
      price: row["price"],
      category: row["category"],
      brand: row["brand"],
      countInStock: row["countInStock"],
      slug: row["slug"],
    };
  });

  /**
   * @description - function to delete a product
   * @param id
   */
  const deleteHandler = useCallback(async (slug: string, id: string) => {
    // if (window.confirm("Are you sure?")) {
    //   // DELETE Products
    //   deleteProduct(slug, id);
    //   refreshData();
    // }
    try {
      await deleteProduct(slug, id);
      refreshData();
    } catch (error) {
      toast.error((error as string) ?? "Something went wrong");
    }
  }, []);

  const createProductHandler = useCallback(async () => {
    try {
      await createProduct();
      refreshData();
    } catch (error) {
      toast.error((error as string) ?? "Something went wrong");
    }
  }, []);

  return (
    <AdminLayout>
      <main className="w-full h-screen p-2 mx-auto overflow-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
        <section className="px-2 sm:px-4 pt-6 pb-8 mt-6 mb-4  md:mx-auto ">
          <div className="flex items-center justify-between mb-6 border-b-2 border-current border-gray-200">
            <div>
              <h1 className="p-3 text-4xl font-thin md:p-5 md:text-5xl">
                Products
              </h1>
            </div>
            <div className="text-sm ">
              <Button color="dark" type="button" onClick={createProductHandler}>
                <FaPlus className="mr-1" /> Create Product
              </Button>
            </div>
          </div>
          <div className="mb-4">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <div className="w-full overscroll-auto sm:shadow-sm sm:rounded-2xl">
                <Table tableData={data} deleteHandler={deleteHandler} />
              </div>
            )}
          </div>
          <Paginate numberOfPages={props.pages} />
        </section>
      </main>
    </AdminLayout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const req = ctx.req;
  const session: Session = await getSession({ req });
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

  if (!session.user?.isAdmin) {
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
