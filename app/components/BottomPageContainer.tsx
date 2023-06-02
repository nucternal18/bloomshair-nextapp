"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaGoogle } from "react-icons/fa";

const shimmer = (w: number, h: number) => `
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

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

function BottomPageContainer() {
  return (
    <>
      <section className="relative">
        <div className="relative" style={{ height: "500px" }}>
          <Image
            src={
              "https://res.cloudinary.com/dtkjg8f0n/image/upload/v1626474377/blooms_hair_products/lauren-fleischmann-akfxOADwNhk-unsplash_fcmoqo.webp"
            }
            alt="home background image"
            layout="fill"
            objectFit="cover"
            quality={50}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
            loading="lazy"
          />
          <div
            id="blackOverlay"
            className="absolute flex flex-col items-center justify-center w-full h-full bg-black opacity-75"
          >
            <motion.div
              className="z-50 flex flex-col items-center justify-center px-2 opacity-75"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 2.0 }}
            >
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <h2 className="text-5xl font-thin text-gray-300">
                Lets Get Social
              </h2>
              <p className="text-xl text-center text-yellow-500">
                Keep up to date with Blooms Hair on our social media channels
              </p>
              <ul className="flex justify-center ">
                <li className="px-1 py-2 m-1 text-gray-300 hover:text-blue-500">
                  <a href="https://www.facebook.com/bloomshair">
                    <FaFacebook fontSize={28} />
                    <span hidden>Got to our facebook page</span>
                  </a>
                </li>
                <li className="px-1 py-2 m-1 text-gray-300 hover:text-rose-600">
                  <a href="https://www.instagram.com/blooms_hair/">
                    <FaInstagram fontSize={28} />
                    <span hidden>Got to our instagram page</span>
                  </a>
                </li>
                <li className="px-1 py-2 m-1 text-gray-300 hover:text-green-500">
                  <a href="https://www.google.com/maps/place/Blooms+Hair/@51.526503,-0.0994912,15z/data=!4m5!3m4!1s0x0:0x7abe1309f8f21d14!8m2!3d51.526503!4d-0.0994912">
                    <FaGoogle fontSize={28} />
                    <span hidden>Got to our google page</span>
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BottomPageContainer;
