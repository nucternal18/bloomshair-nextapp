import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const Modal = ({
  selectedImg,
  setSelectedImg,
}: {
  selectedImg: string;
  setSelectedImg: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const handleClick = () => {
    setSelectedImg(null);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute top-0 w-full"
      onClick={handleClick}
    >
      <motion.div
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        className="top-0 flex justify-center w-full bg-center"
      >
        <div className="px-1 py-20 md:px-0">
          <Image
            src={selectedImg}
            alt="enlarged pic"
            width={600}
            height={600}
            className="z-50"
            quality={75}
            objectFit="cover"
          />
        </div>
        <span
          id="blackOverlay"
          className="absolute w-screen h-screen bg-black opacity-75"
        ></span>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
