import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery, useQueryClient } from "react-query";

// Context
import { OrderContext } from "../context/OrderContext";

// Component
import CartItem from "./CartItem";
import Button from "./Button";

function CartContainer({ cartIsOpen, toggleCartDrawer }) {
  const router = useRouter();
  const { cartItems, clearCart, removeFromCart, addToCart, getCartItems } =
    useContext(OrderContext);

  const { data: cart, isLoading } = useQuery("cart", getCartItems, {
    initialData: cartItems,
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const removeFromCartHandler = (itemId) => {
    removeFromCart(itemId);
    router.reload();
  };

  const checkoutHandler = () => {
    router.push("/checkout/shipping");
  };
  if (cartItems.length === 0 && mounted) {
    return (
      <aside
        className={
          cartIsOpen
            ? `${classNames.default} ${classNames.enabled}`
            : `${classNames.default} ${classNames.disabled}`
        }
      >
        {/* cart header */}
        <div className="flex items-center justify-between mb-6 border-b">
          <div></div>
          <div>
            <h2 className="mb-2 text-2xl text-center">your bag</h2>
          </div>
          <button
            aria-label="Close"
            className="flex items-center text-gray-700 cursor-pointer focus:outline-none"
            onClick={toggleCartDrawer}
          >
            <p className="ml-2 text-3xl ">&times;</p>
          </button>
        </div>
        <div className="mb-2 ">
          <h4 className="mb-2 text-3xl text-center">
            Basket is currently empty
          </h4>
        </div>
        <div>
          <Button type="button" color="dark" className="w-full">
            Continue Shopping
          </Button>
        </div>
      </aside>
    );
  }
  return (
    mounted && (
      <aside
        className={
          cartIsOpen
            ? `${classNames.default} ${classNames.enabled}`
            : `${classNames.default} ${classNames.disabled}`
        }
      >
        <div>
          <div className="flex items-center justify-between mb-6 border-b">
            <div></div>
            <div>
              <h2 className="mb-2 text-2xl text-center">your bag</h2>
            </div>
            <button
              aria-label="Close"
              className="flex items-center text-gray-700 cursor-pointer focus:outline-none"
              onClick={toggleCartDrawer}
            >
              <p className="ml-2 text-3xl ">&times;</p>
            </button>
          </div>
          {/* cart header */}

          {/* cart items */}
          <div className="mb-4">
            {cart.map((item) => {
              return (
                <div key={item.product}>
                  <CartItem
                    {...item}
                    size={40}
                    textSize={"text-sm"}
                    addToCart={addToCart}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                </div>
              );
            })}
          </div>
          {/* cart footer */}
          <footer className="">
            <div className="flex justify-between px-8 my-2">
              <h4 className="text-xl font-thin ">Basket Subtotal:</h4>
              <p className="text-xl font-medium">
                £
                {cart
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </p>
            </div>
            <Button
              type="button"
              color="danger"
              className="w-full my-4"
              onClick={checkoutHandler}
            >
              Proceed to Checkout
            </Button>
            <Button type="button" color="dark" className="w-full">
              <Link href={"/checkout/cart"}>
                <a
                  className={`block text-xl text-center font-normal list-none cursor-pointer hover:text-yellow-400`}
                >
                  View and Edit Basket
                </a>
              </Link>
            </Button>
          </footer>
        </div>
      </aside>
    )
  );
}
const classNames = {
  default: `hidden md:block flex flex-col h-screen fixed inset-y-0 right-0 transition-all ease duration-200 `,
  enabled: ` md:w-2/5 lg:w-1/4 bg-gray-100 z-50  text-gray-700 overflow-x-hidden p-4 `,
  disabled: `w-0  bg-gray-800 text-white overflow-x-hidden`,
};

export default CartContainer;
