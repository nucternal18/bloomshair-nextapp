/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ProductProps } from "../../context/product/productContext";

interface Products {
  products?: ProductProps[];
}
const ProductCarousel = ({ products }: Products) => {
  const [width, setWidth] = useState(0);
  const carousel = useRef(null);

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [carousel.current]);
  return (
    <div aria-label="product-carousel" data-testid="product-carousel">
      <motion.div ref={carousel} className=" overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex gap-2 py-2 cursor-grab focus:cursor-grabbing"
        >
          {products.map((product) => (
            <motion.div
              key={product._id}
              className="min-h-[30rem] min-w-[20rem] sm:min-h-[35rem] sm:min-w-[25rem] p-5"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full rounded-2xl bg-cover bg-no-repeat shadow-xl bg-center"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductCarousel;
