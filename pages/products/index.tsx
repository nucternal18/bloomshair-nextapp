import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

// Components
import Paginate from "../../components/Paginate";
import Layout from "../../components/Layout/Layout/Layout";
import Product from "../../components/Product";
import Button from "../../components/Button";
import SearchBox from "../../components/SearchBox";

import { NEXT_URL } from "../../config";

function Products({ products, keyword, pages, page }): JSX.Element {
  const router = useRouter();

  return (
    <Layout title="Products" description="list of hair care products">
      <main className="relative w-full mx-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="flex mt-1 justify-center py-4 ">
          <SearchBox />
        </div>
        <section className="container max-w-screen-lg px-2 pt-2 pb-8 mx-auto mb-4">
          <div className="flex items-center justify-between mb-6 border-b-2 border-current border-gray-200">
            <div>
              <h1 className="p-3 text-2xl font-thin md:p-5 md:text-5xl">
                Products
              </h1>
            </div>
            {keyword && (
              <div>
                <Button
                  type="button"
                  color="dark"
                  onClick={() => router.back()}
                >
                  {" "}
                  Go Back
                </Button>
              </div>
            )}
          </div>

          <div className="container flex flex-col justify-center">
            <div className="grid grid-cols-1 gap-2 my-8 md:mx-auto md:grid-cols-3 sm:mx-0">
              {products.map((product) => {
                return (
                  <div key={product._id}>
                    <Product product={product} />
                  </div>
                );
              })}
            </div>

            <Paginate
              pages={+pages}
              page={+page}
              keyword={keyword ? keyword : ""}
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { pageNumber = 1, keyword = "" },
}) => {
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
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: data.products,
      page: data.page,
      pages: data.pages,
      keyword: keyword,
    }, // will be passed to the page component as props
  };
};
export default Products;
