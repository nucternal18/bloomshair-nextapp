import Image from "next/image";
import Layout from "../components/Layout/Layout";
import { motion } from "framer-motion";

import BottomPageContainer from "../components/BottomPageContainer";

const url: string =
  "https://res.cloudinary.com/dtkjg8f0n/image/upload/v1621805383/blooms_hair_products/AdobeStock_208497707_gpctl8.webp";

function about(): JSX.Element {
  return (
    <Layout title="Blooms Hair - About" description="About us page">
      <main>
        <section className="relative flex items-center content-center justify-center">
          <div
            className="relative top-0 w-full h-full bg-center bg-cover "
            style={{ height: "500px" }}
          >
            <Image
              src={url}
              alt="home background image"
              layout="fill"
              objectFit="cover"
              quality={50}
            />

            <span
              id="blackOverlay"
              className="absolute w-full h-full bg-black opacity-75"
            ></span>
          </div>
          <div className="absolute mx-auto">
            <div className="flex flex-wrap items-center justify-center">
              <motion.div
                className="opacity-75 "
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={{ duration: 2.0 }}
              >
                <p className="text-4xl font-thin text-gray-400 md:text-7xl">
                  About Blooms Hair
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="relative w-full bg-white ">
          <div className="container mx-auto ">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="flex items-center justify-center col-span-1 px-4 py-6 my-6">
                <div className="flex flex-col">
                  <h2 className="mb-4 text-4xl font-bold text-gray-700">
                    Here At Blooms Hair, We Are Passionate About Making You Feel
                    Special, Every Day.
                  </h2>
                  <p className="text-2xl font-light leading-relaxed text-gray-700">
                    That’s why we offer a wide selection of quality services in
                    our salon in Islington London. We have Wella Colour Master
                    experts on hand that can deliver full hair colours to
                    balayage’s and highlights, achieving your perfect shade is
                    simple. Get healthier, fuller looking hair with our
                    Brazillian smoothing treatments. We love to provide you with
                    the latest haircut trends and insider info too so that you
                    can leave looking, and feeling fantastic!
                  </p>
                </div>
              </div>
              <div className="hidden col-span-1 sm:block"></div>
            </div>
          </div>
        </section>
        <BottomPageContainer />
      </main>
    </Layout>
  );
}

export default about;
