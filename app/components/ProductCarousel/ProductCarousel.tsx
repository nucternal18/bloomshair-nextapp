"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

import ProductCard from "../ProductCard";
import { ProductProps } from "../../../lib/types";

interface Products {
  products?: ProductProps[];
}
const ProductCarousel = ({ products }: Products) => {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWidth(
      (carousel.current?.scrollWidth as number) -
        (carousel.current?.offsetWidth as number)
    );
  }, [carousel.current]);
  return (
    <div aria-label="product-carousel" data-testid="product-carousel">
      <motion.div ref={carousel} className=" overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex gap-2 py-2 cursor-grab lg:justify-center focus:cursor-grabbing"
        >
          {products?.map((product) => (
            <motion.div
              key={product.id}
              className="min-h-[30rem] min-w-[20rem] sm:min-h-[35rem] sm:min-w-[25rem] p-5"
            >
              {/* <img
                src={product.image}
                alt={product.name}
                className="w-full h-full rounded-2xl bg-cover bg-no-repeat shadow-xl bg-center"
              /> */}
              <ProductCard
                product={product}
                isAvailable={product.countInStock > 0}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductCarousel;
