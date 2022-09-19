import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

// components
import Layout from "Layout/MainLayout/Layout";
import BottomPageContainer from "@components/BottomPageContainer";
const ProductCarousel = dynamic(() => import("@components/ProductCarousel"), {
  ssr: false,
});
import HeroContainer from "@components/HeroContainer";
import useHasMounted from "@hooks/useHasMounted";

// utils
import { NEXT_URL } from "@config/index";
import { ProductProps } from "@lib/types";

export default function Home({ products }: { products: ProductProps[] }) {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  return (
    <Layout title="Home page" description="blooms hair home page">
      <main>
        <HeroContainer />
        <section className="bg-white dark:bg-gray-900 ">
          <div className="container md:mx-auto text-center py-4 border-b-2 border-yellow-400  sm:max-w-screen-sm">
            <h1 className="text-2xl sm:text-4xl font-thin font-serif uppercase">
              Our Best Sellers
            </h1>
          </div>

          <ProductCarousel products={products} />
        </section>

        <BottomPageContainer />
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetch(`${NEXT_URL}/api/products/topProducts`, {
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
      products: data,
    }, // will be passed to the page component as props
  };
};
