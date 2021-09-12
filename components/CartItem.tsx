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
  updateCartHandler,
  size,
  textSize,
}) {
  return (
    <div className="w-full mb-2 border-b">
      <div className="flex items-center justify-around w-full mb-2 ">
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
            <a className={`${textSize}font-normal `}>{name}</a>
          </Link>
        </div>
        <div className={`${textSize} mr-2 font-thin `}>£{price}</div>
        <div className="mr-2">
          <select
            className="w-full px-3 py-2 my-2 bg-white border rounded outline-none"
            value={qty}
            onChange={(e) => updateCartHandler(product, Number(e.target.value))}
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
            color="danger"
            onClick={() => removeFromCartHandler(product)}
          >
            <FaTrash className="" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
