import React from "react";
import Image from "next/image";
import Button from "./Button";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";

function CartItem({
  product,
  image,
  name,
  price,
  qty,
  countInStock,
  removeFromCartHandler,
  addToCart,
  size,
  textSize,
}) {
  // const { remove, increase, decrease, toggleAmount } = useGlobalContext();
  return (
    <div className="flex items-center justify-around w-full" key={product}>
      <div className="hidden mr-2 md:block">
        <Image
          src={image}
          alt={name}
          width={size}
          height={size}
          className="rounded"
        />
      </div>
      <div className="mr-2 truncate">
        <Link href={`/products/${product}`}>
          <a className={`${textSize}font-semibold `}>{name}</a>
        </Link>
      </div>
      <div className={`${textSize} mr-2 font-semibold `}>£{price}</div>
      <div className="mr-2">
        <select
          className="w-full px-3 py-2 my-2 bg-white border rounded outline-none"
          value={qty}
          onChange={(e) => addToCart(product, Number(e.target.value))}
        >
          {[...Array(countInStock).keys()].map((x) => (
            <option key={x + 1} value={x + 1} className="py-1">
              {x + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="mr-2">
        <Button
          type="button"
          color="yellow"
          onClick={() => removeFromCartHandler(product)}
        >
          <FaTrash className="" />
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
