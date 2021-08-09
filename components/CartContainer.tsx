import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { OrderContext } from "../context/OrderContext";
import CartItem from "./CartItem";
import Button from "./Button";

function CartContainer({ cartIsOpen, toggle }) {
  const router = useRouter();
  const { cartItems, totalPrice, clearCart, removeFromCart, addToCart } =
    useContext(OrderContext);
  const removeFromCartHandler = (itemId) => {
    removeFromCart(itemId);
    router.reload();
  };
  if (cartItems.length === 0) {
    return (
      <aside
        className={
          cartIsOpen
            ? `${classNames.default} ${classNames.enabled}`
            : `${classNames.default} ${classNames.disabled}`
        }
      >
        <div className="flex items-center justify-between px-3 py-2 ml-4">
          <button
            aria-label="Close"
            className="flex items-center py-1 mr-12 text-4xl text-white cursor-pointer focus:outline-none"
            onClick={toggle}
          >
            &times;
            <p className="ml-2 text-base ">Close</p>
          </button>
        </div>
        {/* cart header */}
        <div className="mb-2 border-b">
          <h2 className="mb-2 text-3xl text-center">your bag</h2>
          <h4 className="mb-2 text-3xl text-center">is currently empty</h4>
        </div>
      </aside>
    );
  }
  return (
    <aside
      className={
        cartIsOpen
          ? `${classNames.default} ${classNames.enabled}`
          : `${classNames.default} ${classNames.disabled}`
      }
    >
      <div className="flex items-center mb-6">
        <button
          aria-label="Close"
          className="flex items-center text-white cursor-pointer focus:outline-none"
          onClick={toggle}
        >
          <p className="ml-2 text-2xl ">&times;</p>
          <p className="ml-2 text-base ">Close</p>
        </button>
      </div>
      {/* cart header */}
      <div className="mb-2 border-b">
        <h2 className="mb-2 text-3xl text-center">your bag</h2>
      </div>
      {/* cart items */}
      <div className="mb-4">
        {cartItems.map((item) => {
          return (
            <CartItem
              key={item.product}
              {...item}
              size={40}
              textSize={"text-sm"}
              addToCart={addToCart}
              removeFromCartHandler={removeFromCartHandler}
            />
          );
        })}
      </div>
      {/* cart footer */}
      <footer className="border-t ">
        <div className="flex justify-between my-2">
          <h4 className="text-xl uppercase">total:</h4>
          <p className="text-xl">£{totalPrice}</p>
        </div>

        <Button type="button" color="yellow" className="w-full">
          <Link href={"/checkout/cart"}>
            <a
              className={`${
                router.asPath === "/checkout/cart"
                  ? "text-yellow-500"
                  : "text-gray-200"
              } block text-xl text-center font-medium  uppercase list-none cursor-pointer hover:text-yellow-400`}
            >
              View Cart
            </a>
          </Link>
        </Button>
        <Button
          type="button"
          color="danger"
          className="w-full mt-2"
          onClick={clearCart}
        >
          clear cart
        </Button>
      </footer>
    </aside>
  );
}
const classNames = {
  default: `hidden md:block flex flex-col h-screen fixed inset-y-0 right-0 transition-all ease duration-200 `,
  enabled: ` md:w-1/4 bg-gray-900 z-50  text-white overflow-x-hidden p-4 `,
  disabled: `w-0  bg-gray-800 text-white overflow-x-hidden`,
};

export default CartContainer;
