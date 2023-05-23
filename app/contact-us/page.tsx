"use client";
import { FaInstagram } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";

// title = "Contact page";
// description = "Contact page with the salon contact information";

const url: string =
  "https://res.cloudinary.com/dtkjg8f0n/image/upload/v1626477149/blooms_hair_products/clark-tibbs-oqStl2L5oxI-unsplash_o7ck4l.webp";

function ContactUs(): JSX.Element {
  return (
    <>
      <section className="relative flex items-center content-center justify-center text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 overflow-hidden">
        <div
          className="relative top-0 w-full h-full bg-center bg-cover "
          style={{ height: "500px" }}
        >
          <Image src={url} alt="home background image" quality={75} fill />

          <span
            id="blackOverlay"
            className="absolute w-full h-full bg-black opacity-75"
          ></span>
        </div>
        <div className="absolute mx-auto">
          <div className="flex flex-wrap items-center justify-center">
            <motion.div
              className="opacity-75 text-center"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 2.0 }}
            >
              <h1 className="text-4xl font-thin text-gray-300 sm:text-7xl">
                Contact Blooms Hair
              </h1>
              <p className="mb-4 text-2xl font-thin text-gray-300 border-t-2 border-yellow-500">
                Mobile Hairdressing
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="flex-grow w-full bg-white dark:bg-gray-900">
        <div className="container grid max-w-screen-lg grid-cols-1 mx-auto py-8">
          <div className="flex justify-center col-span-1 px-4 py-2 my-2 item-center">
            <div className="flex-col text-justify">
              <h1 className="text-3xl sm:text-5xl">Get In Touch</h1>
            </div>
          </div>
          <div className="col-span-1 px-2 py-2 my-2 sm:px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="sm:mb-4">
                <div>
                  <p>
                    We pride ourselves being passionate on making you feel
                    amazing about yourselves – Not just in the salon but in
                    between visits. Blooms Hair will create a bespoke look;
                    every person is individual, different and we would like to
                    tailor make every look with a personal touch.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="col-span-1 py-2 font-thin">PHONE</div>
                <div className="col-span-1 py-2">07838849597</div>
                <div className="col-span-1 py-2 font-thin">EMAIL</div>
                <div className="col-span-1 py-2 break-words">
                  <a href="mailto:appointments@bloomshair.co.uk">
                    appointments@bloomshair.co.uk
                  </a>
                </div>

                <div className="col-span-1 py-2 font-thin">FOLLOW</div>
                <div className="col-span-1 py-2">
                  <ul className="flex flex-row text-gray-600 ">
                    <li className="px-2 text-2xl hover:text-blue-500">
                      <a href="https://www.instagram.com/viaromanonsolopizza/">
                        <FaInstagram />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
