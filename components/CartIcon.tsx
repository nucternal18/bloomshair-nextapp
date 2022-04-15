import Image from "next/image";
import { AiOutlineShopping } from "react-icons/ai";

function CartIcon({ itemCount, ...props }) {
  return (
    <div
      className="relative flex items-center justify-center w-12 h-12"
      {...props}
    >
      <div className="">
        <AiOutlineShopping fontSize={30} />
      </div>
      <div className="absolute text-xs font-bold bottom-3">
        {Number(itemCount)}
      </div>
    </div>
  );
}

export default CartIcon;
