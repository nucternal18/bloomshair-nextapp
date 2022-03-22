import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import Button from "./Button";

function CheckoutItem({ item, removeFromCartHandler, updateCartHandler }) {
  return (
    <div className="w-full flex items-center text-md  md:text-xl border-b-2 border-gray-200 sm:px-4 h-24">
      <div className="hidden sm:block w-1/4 pr-4">
        <Image
          src={item.image}
          alt={item.name}
          width={70}
          height={70}
          className="rounded"
        />
      </div>
      <span className="w-1/5 md:w-1/4 mr-4 sm:mr-0">{item.name}</span>
      <div className="mr-2 w-14">
        <select
          className="w-full px-3 py-2 my-2 bg-white border rounded outline-none text-gray-900"
          value={item.qty}
          onChange={(e) => updateCartHandler(item.product, e.target.value)}
        >
          {[...Array(item.countInStock).keys()].map((x) => (
            <option key={x + 1} value={x + 1} className="py-1">
              {x + 1}
            </option>
          ))}
        </select>
      </div>
      <span className="w-1/5 md:w-1/4 sm:mr-2 text-center">
        {(item.qty * item.price).toFixed(2)}
      </span>
      <div className=" mx-auto">
        <Button
          type="button"
          color="danger"
          onClick={() => removeFromCartHandler(item.product)}
        >
          <FaTrash className="" />
        </Button>
      </div>
    </div>
  );
}

export default CheckoutItem;
