import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaGoogle } from "react-icons/fa";

import Button from "./Button";

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

function BottomPageContainer() {
  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div className="relative">
          <div
            className="relative flex items-center justify-center"
            style={{ height: "400px" }}
          >
            <Image
              src={
                "https://res.cloudinary.com/dtkjg8f0n/image/upload/v1621805390/blooms_hair_products/AdobeStock_278832769_qrecru.webp"
              }
              alt="home background image"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={75}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
              loading="lazy"
            />
            <div className="absolute">
              <div className="flex flex-col items-center justify-center">
                <p className="mb-2 text-4xl font-thin text-center text-white">
                  About Blooms
                </p>
                <div>
                  <Button type="button" color="yellow">
                    <Link href="/about">
                      <a>See More</a>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div
            className="relative flex items-center justify-center "
            style={{ height: "400px" }}
          >
            <Image
              src={
                "https://res.cloudinary.com/dtkjg8f0n/image/upload/v1621805395/blooms_hair_products/AdobeStock_192477796_vtn3n4.webp"
              }
              alt="home background image"
              layout="fill"
              objectFit="cover"
              quality={75}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
              loading="lazy"
            />
            <div className="absolute ">
              <div className="flex flex-col items-center justify-center">
                <p className="mb-2 text-4xl font-thin text-center text-white">
                  Service Menu
                </p>
                <div>
                  <Button type="button" color="yellow">
                    <Link href="/service-menu">
                      <a>See More</a>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div
            className="relative flex items-center justify-center "
            style={{ height: "400px" }}
          >
            <Image
              src={
                "https://res.cloudinary.com/dtkjg8f0n/image/upload/v1621805383/blooms_hair_products/AdobeStock_208497707_gpctl8.webp"
              }
              alt="home background image"
              layout="fill"
              objectFit="cover"
              quality={75}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
              loading="lazy"
            />
            <div className="absolute ">
              <div className="flex flex-wrap items-center justify-center ">
                <div className="flex flex-col items-center justify-center">
                  <p className="mb-2 text-4xl font-thin text-center text-white">
                    Contact Blooms
                  </p>
                  <div>
                    <Button type="button" color="yellow">
                      <Link href="/contact-us">
                        <a>Contact Now</a>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
                  </a>
                </li>
                <li className="px-1 py-2 m-1 text-gray-300 hover:text-rose-600">
                  <a href="https://www.instagram.com/blooms_hair/">
                    <FaInstagram fontSize={28} />
                  </a>
                </li>
                <li className="px-1 py-2 m-1 text-gray-300 hover:text-green-500">
                  <a href="https://www.google.com/maps/place/Blooms+Hair/@51.526503,-0.0994912,15z/data=!4m5!3m4!1s0x0:0x7abe1309f8f21d14!8m2!3d51.526503!4d-0.0994912">
                    <FaGoogle fontSize={28} />
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
