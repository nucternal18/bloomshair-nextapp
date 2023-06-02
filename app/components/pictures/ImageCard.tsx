"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const ImageCards = ({
  image,
  setSelectedImg,
}: {
  image: string;
  setSelectedImg: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <motion.div
      aria-label="image-card"
      data-testid="image-card"
      layout
      whileHover={{ opacity: 1 }}
      onClick={() => setSelectedImg(image)}
      className="mb-2 rounded shadow-md md:shadow-2xl md:mb-0 "
      style={{ width: "400" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Image
          src={image}
          alt=""
          width={400}
          height={400}
          style={{ objectFit: "cover" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ImageCards;
