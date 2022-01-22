import Image from "next/image";

function CartIcon({ itemCount }) {
  return (
    <div className="relative flex items-center justify-center w-12 h-12 cursor-pointer">
      <div className="">
        <Image
          src={"/shopping-bag.svg"}
          alt={"shopping bag"}
          width={26}
          height={26}
        />
      </div>
      <div className="absolute text-xs font-bold bottom-4">
        {Number(itemCount)}
      </div>
    </div>
  );
}

export default CartIcon;
