import Image from "next/image";
import Layout from "../components/Layout/Layout/Layout";
import { motion } from "framer-motion";
import BottomPageContainer from "../components/BottomPageContainer";
import { GetServerSidePropsContext } from "next";
import { NEXT_URL } from "../config";

const url =
  "https://res.cloudinary.com/dtkjg8f0n/image/upload/v1621805398/blooms_hair_products/AdobeStock_290145313_mbpudc.webp";

function ServiceMenu({ services }): JSX.Element {
  return (
    <Layout
      title="Service Menu"
      description="Blooms Hair Salon services prices"
    >
      <main className="flex-grow text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 overflow-hidden">
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
                <h1 className="text-4xl font-thin text-gray-400 md:text-7xl">
                  Service & Price Menu
                </h1>
              </motion.div>
            </div>
          </div>
        </section>
        <div className="w-full max-w-screen-lg mx-auto ">
          <div className="container px-4 py-6 mx-auto">
            <h1 className="mb-4 text-3xl text-center sm:text-5xl">
              Our Hair Services
            </h1>
            <div className="text-justify sm:text-center">
              <p className="mb-2 font-thin">
                We’re a talented and passionate bunch here at Blooms hair, even
                if we do say so ourselves, creating styles that work with you
                and your lifestyle. We know hair, we know your hair, and we want
                to help you make the most of it.
              </p>
              <p className="mb-2 font-thin">
                Our team of experienced stylists ask questions, listen carefully
                to the answers, and provide recommendations tailored to your own
                individual needs. We work hard to keep ahead of the latest hair
                cuts and styles. After consultation with one of our team we then
                create that cut and style that will compliment and enhance your
                looks, so you leave our salon looking and feeling gorgeous every
                time.
              </p>
              <p className="mb-2 font-thin">
                Call today to book your appointment or for a free consultation.
              </p>
            </div>
            <div className="flex justify-center w-full my-4">
              <div className="flex flex-col w-full  text-center border border-gray-300 dark:border-gray-700">
                <div className="px-4 py-2 font-bold text-center bg-gray-300 dark:bg-gray-700">
                  Gents Hair
                </div>
                {services
                  .filter((service) => service.category === "Gents Hair")
                  .map((service, index) => (
                    <div
                      key={`${service.name}` + `${index}`}
                      className="grid grid-cols-2 text-sm sm:text-base pl-3 w-full"
                    >
                      <div className="sm:px-4 py-2">{service.name}</div>
                      <div className=" sm:px-4 py-2">
                        £{service.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                <div className="col-span-3 px-4 py-2 font-bold text-center bg-gray-300 dark:bg-gray-700">
                  Ladies Hair
                </div>
                {services
                  .filter((service) => service.category === "Ladies Hair")
                  .map((service, index) => (
                    <div
                      key={`${service.name}` + `${index}`}
                      className="grid grid-cols-2 text-sm sm:text-base pl-3 w-full"
                    >
                      <div className=" sm:px-4 py-2">{service.name}</div>
                      <div className=" sm:px-4 py-2">
                        £{service.price.toFixed(2)}
                      </div>
                    </div>
                  ))}

                <div className="col-span-3 px-4 py-2 font-bold text-center bg-gray-300 dark:bg-gray-700">
                  Technical
                </div>
                {services
                  .filter((service) => service.category === "Technical")
                  .map((service, index) => (
                    <div
                      key={`${service.name}` + `${index}`}
                      className="grid grid-cols-2 text-sm sm:text-base pl-3 w-full"
                    >
                      <div className="sm:px-4 py-2">{service.name}</div>
                      <div className=" sm:px-4 py-2">
                        £
                        {service.name === "Bleaching"
                          ? "P.O.T"
                          : service.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                <div className="col-span-3 px-4 py-2 font-bold text-center bg-gray-300 dark:bg-gray-700">
                  Hair Treatments
                </div>
                {services
                  .filter((service) => service.category === "Hair Treatments")
                  .map((service, index) => (
                    <div
                      key={`${service.name}` + `${index}`}
                      className="grid grid-cols-2 text-sm sm:text-base pl-3 w-full"
                    >
                      <div className="sm:px-4 py-2">{service.name}</div>
                      <div className=" sm:px-4 py-2">
                        £{service.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <h3 className="my-4 text-xl text-center">Terms and Conditions</h3>
            <div className="text-justify sm:text-center">
              <p className="mb-2 font-thin">
                Should a cancellation or date change be necessary, we politely
                request 24 hour’s notice.
              </p>
              <p className="mb-2 font-thin">
                Please note all colour prices are ‘from’. Exact quotes can only
                be given after a consultation with a stylist. After colour
                services, a blow-dry with a stylist starts at £25 and needs to
                be specified when you book your appointment. All colour services
                will otherwise include a quick dry from an experienced
                assistant.
              </p>
              <p className="mb-2 font-thin">
                To avoid disappointment, punctuality for appointments is greatly
                appreciated.
              </p>
            </div>
          </div>
        </div>
        <BottomPageContainer />
      </main>
    </Layout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const url = `hair-services?sortBy=${"all"}&category=${""}`;

  const response = await fetch(`${NEXT_URL}/api/${url}`, {
    method: "GET",
  });
  const data = await response.json();
  return {
    props: {
      services: data,
    }, // will be passed to the page component as props
  };
};
export default ServiceMenu;
