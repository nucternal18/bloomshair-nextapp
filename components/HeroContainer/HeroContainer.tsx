import Image from "next/image";
import { motion } from "framer-motion";
import { buildImage } from "@lib/cloudinaryUrl";
import Button from "@components/Button";
import Link from "next/link";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

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

const HeroContainer = () => {
  return (
    <section className="relative flex items-center content-center justify-center h-[700px] pt-16 pb-32 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
      <div className="absolute top-0 w-full h-full bg-center bg-cover">
        <div className="relative w-full h-full">
          <Image
            src={buildImage(
              "blooms_hair_products/AdobeStock_53052353_xwep1d"
            ).toURL()}
            alt="BiZkettE1 / Freepik"
            layout="fill"
            objectFit="cover"
            quality={50}
            priority
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
          />
          <div
            id="blackOverlay"
            className="absolute w-full h-full bg-black opacity-50"
          ></div>
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
            <Button buttonName="book-now" type="button" color="yellow">
              <Link href="/book-online">
                <a>Book Now!</a>
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroContainer;
