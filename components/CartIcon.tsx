import Image from "next/image";
import { ReactElement, ReactHTMLElement } from "react";
import { AiOutlineShopping } from "react-icons/ai";

function CartIcon({
  itemCount,
  classNames,
}: {
  itemCount: number;
  classNames: string;
}) {
  return (
    <div className={classNames}>
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
