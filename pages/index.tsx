import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { GetServerSideProps } from "next";

// components
import Layout from "../components/Layout/Layout/Layout";
import Button from "../components/Button";
import BottomPageContainer from "../components/BottomPageContainer";
import ProductCarousel from "../components/ProductCarousel";
import { NEXT_URL } from "../config";

const url =
  "https://res.cloudinary.com/dtkjg8f0n/image/upload/e_sharpen:100,q_auto:good/v1621805800/blooms_hair_products/AdobeStock_53052353_xwep1d.webp";
// "https://res.cloudinary.com/dtkjg8f0n/image/upload/e_sharpen:100/v1640267272/3162_twuojq.webp";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export default function Home({ products }): JSX.Element {
  return (
    <Layout title="Home page" description="blooms hair home page">
      <main>
        <section className="relative flex items-center content-center justify-center h-[700px] pt-16 pb-32 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
          <div className="absolute top-0 w-full h-full bg-center bg-cover">
            <div className="relative w-full h-full">
              <Image
                src={url}
                alt="BiZkettE1 / Freepik"
                layout="fill"
                objectFit="cover"
                quality={75}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
                loading="lazy"
              />
              <span
                id="blackOverlay"
                className="absolute w-full h-full bg-black opacity-50"
              ></span>
            </div>
          </div>
          <div className="container relative mx-auto">
            <div className="flex flex-col flex-wrap items-center justify-center ">
              <motion.div
                className="flex flex-col items-center opacity-75"
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ delay: 3.0, duration: 5.0 }}
              >
                <p className="mb-4 text-3xl font-thin text-gray-300 md:text-5xl lg:text-7xl">
                  Welcome to Blooms Hair
                </p>
                <Button type="button" color="yellow">
                  <Link href="/book-online">
                    <a>Book Now!</a>
                  </Link>
                </Button>
              </motion.div>
              {/* <motion.div
                className="flex flex-col items-center opacity-75"
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ delay: 5.0, duration: 5.0 }}
              >
                <p className="mb-4 text-3xl text-center font-thin font-mono text-yellow-400 md:text-3xl mt-28 lg:text-5xl uppercase">
                  Wishing our customers a
                </p>
              </motion.div> */}
            </div>
          </div>
        </section>
        <section className="bg-white dark:bg-gray-900">
          <div className="container mx-auto text-center py-4 border-b-2 border-yellow-400 max-w-screen-sm">
            <h1 className="text-4xl font-thin font-serif uppercase">
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

export const getServerSideProps: GetServerSideProps = async ({
  query: { pageNumber = 1, keyword = "" },
}) => {
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
