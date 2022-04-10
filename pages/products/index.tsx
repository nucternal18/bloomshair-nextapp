import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";

// Components
import Paginate from "../../components/Paginate";
import Layout from "../../components/Layout/Layout/Layout";
import ProductCard from "../../components/ProductCard";
import SearchBox from "../../components/SearchBox";
import Spinner from "../../components/Spinner";

// config: default URL import
import { NEXT_URL } from "../../config";

// Hooks
import useOutsideClick from "../../hooks/useOutsideClick";

// context: productContext
import { useProduct, ActionType } from "../../context/product/productContext";

interface IFormData {
  search: string;
}

function Products({ products, pages, isLoading }): JSX.Element {
  const router = useRouter();
  const { ref, isVisible, setIsVisible } = useOutsideClick();
  const { state, dispatch } = useProduct();
  const page = state?.page;

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      search: "",
    },
  });

  useEffect(() => {
    const subscribe = () => {
      const url = `${NEXT_URL}/products?page=${page}`;
      router.replace(url);
    };
    subscribe();
  }, [page]);

  useEffect(() => {
    const subscribe = watch((data) => {
      const { search } = data;
      let url = `${NEXT_URL}/products?page=${page}`;
      if (search) {
        url += `&keyword=${search}`;
        setIsVisible(true);
      }
      router.replace(url);
    });
    return () => subscribe.unsubscribe();
  }, [watch, page]);

  if (isLoading) {
    return (
      <Layout title="Products" description="list of hair care products">
        <main className="relative w-full mx-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="flex mt-1 justify-center py-4 ">
            <SearchBox
              register={register}
              suggestions={products}
              setIsVisible={setIsVisible}
              isVisible={isVisible}
              documentRef={ref}
            />
          </div>
          <div className="flex justify-center items-center h-screen">
            <Spinner message="Loading products..." />
          </div>
        </main>
      </Layout>
    );
  }
  if (products.length < 1) {
    return (
      <Layout title="Products" description="list of hair care products">
        <main className="relative w-full mx-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="flex mt-1 justify-center py-4 ">
            <SearchBox
              register={register}
              suggestions={products}
              setIsVisible={setIsVisible}
              isVisible={isVisible}
              documentRef={ref}
            />
          </div>
          <div className="flex justify-center items-center h-[50vh]">
            <h1 className="text-3xl font-thin text-center">
              No products found
            </h1>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout title="Products" description="list of hair care products">
      <main className="relative w-full mx-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="flex mt-1 justify-center py-4 ">
          <SearchBox
            register={register}
            suggestions={products}
            setIsVisible={setIsVisible}
            isVisible={isVisible}
            documentRef={ref}
          />
        </div>
        <section className="container max-w-screen-lg px-2 pt-2 pb-8 mx-auto mb-4">
          <div className="flex items-center justify-between mb-6 border-b-2 border-current border-gray-200">
            <div>
              <h1 className="p-3 text-2xl font-thin md:p-5 md:text-5xl">
                Products
              </h1>
            </div>
          </div>

          <div className="container flex flex-col justify-center">
            <div className="grid grid-cols-1 gap-2 my-8 md:mx-auto md:grid-cols-3 sm:mx-0">
              {products.map((product) => {
                return (
                  <div key={product._id}>
                    <ProductCard
                      product={product}
                      isAvailable={product.countInStock > 0}
                    />
                  </div>
                );
              })}
            </div>

            <Paginate numberOfPages={+pages} />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { page, keyword } = ctx.query;
  let url = `products?page=${page || 1}`;
  if (keyword) {
    url += `&keyword=${keyword || ""}`;
  }
  const res = await fetch(`${NEXT_URL}/api/${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: data.products,
      pages: data.pages,
      isLoading: data.products ? false : true,
    }, // will be passed to the page component as props
  };
};
export default Products;
