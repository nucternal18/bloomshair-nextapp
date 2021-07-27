import { FaFacebook, FaInstagram, FaGoogle } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import Maps from "../components/GoogleMaps";

const url: string =
  "https://res.cloudinary.com/dtkjg8f0n/image/upload/v1626477149/blooms_hair_products/clark-tibbs-oqStl2L5oxI-unsplash_o7ck4l.webp";

function ContactUs(): JSX.Element {
  return (
    <Layout>
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
              quality={75}
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
                <h1 className="text-gray-500 text-7xl">Contact Blooms Hair</h1>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="flex-grow w-full bg-white">
          <div className="container grid max-w-6xl grid-cols-1 mx-auto my-8 lg:grid-cols-2">
            <div className="flex justify-center col-span-1 px-4 py-6 my-6 item-center">
              <div className="flex-col text-justify">
                <h1 className="mb-4 text-3xl sm:text-5xl">Get In Touch</h1>
                <p>
                  We pride ourselves being passionate on making you feel amazing
                  about yourselves – Not just in the salon but in between
                  visits. Blooms Hair will create a bespoke look; every person
                  is individual, different and we would like to tailor make
                  every look with a personal touch.
                </p>
              </div>
            </div>
            <div className="col-span-1 px-4 py-6 my-6">
              <div className="grid grid-cols-2">
                <div className="col-span-1 px-4 py-2 font-bold">PHONE</div>
                <div className="col-span-1 px-4 py-2">07838849597</div>
                <div className="col-span-1 px-4 py-2 font-bold">EMAIL</div>
                <div className="col-span-1 px-4 py-2 break-words">
                  <a href="mailto:appointments@bloomshair.co.uk">
                    appointments@bloomshair.co.uk
                  </a>
                </div>
                <div className="col-span-1 px-4 py-2 font-bold">ADDRESS</div>
                <div className="col-span-1 px-4 py-2">
                  9 Lever St, London EC1V 3QU
                </div>
                <div className="col-span-1 px-4 py-2 font-bold">FOLLOW</div>
                <div className="col-span-1 px-4 py-2">
                  <ul className="flex flex-row text-gray-600 ">
                    <li className="px-2 text-2xl hover:text-blue-500">
                      <a href="https://www.facebook.com/pages/category/Pizza-Place/Viaromanonsolopizza-108686514250214/">
                        <FaFacebook />
                      </a>
                    </li>
                    <li className="px-2 text-2xl hover:text-blue-500">
                      <a href="https://www.instagram.com/viaromanonsolopizza/">
                        <FaInstagram />
                      </a>
                    </li>
                    <li className="px-2 text-2xl hover:text-blue-500">
                      <a href="https://www.google.com/maps/place/viaROMAnonsolopizza/@45.7240617,8.6311318,15z/data=!4m5!3m4!1s0x0:0x6dc73345553ebfda!8m2!3d45.7240617!4d8.6311318">
                        <FaGoogle />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Maps
              containerStyle={{
                height: "400px",
              }}
              zoom={18}
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default ContactUs;
