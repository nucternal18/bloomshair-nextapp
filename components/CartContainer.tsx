import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// Context
import { useCart } from "../context/cart/cartContext";
import { removeFromCart, addToCart } from "../context/cart/cartActions";

// Component
import CartItem from "./CartItem";
import Button from "./Button";
import { NEXT_URL } from "../config";
import { CartItemsProps } from "../context/cart/cartState";

function CartContainer({ cartIsOpen, toggleCartDrawer }) {
  const router = useRouter();
  const { state, dispatch } = useCart();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const removeFromCartHandler = (itemId) => {
    dispatch(removeFromCart(itemId));
    router.reload();
  };

  const updateCartHandler = async (id, qty) => {
    const res = await fetch(`${NEXT_URL}/api/products/${id}`, {
      method: "GET",
    });
    const data = await res.json();
    const items: CartItemsProps = {
      product: data.product._id,
      name: data.product.name,
      image: data.product.image,
      price: data.product.price,
      countInStock: data.product.countInStock,
      qty,
    };
    dispatch(addToCart(items));
  };

  // const checkoutHandler = () => {
  //   if (!loadedSession) {
  //     router.push('/account/login?redirect=/checkout/shipping');
  //   }
  //   router.push('/checkout/shipping');
  // };
  if (state.cart.cartItems?.length === 0 && mounted) {
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
            className="flex items-center text-gray-700 cursor-pointer mb-2 focus:outline-none"
            onClick={toggleCartDrawer}
          >
            <p className="ml-2 text-3xl ">&times;</p>
          </button>
        </div>
        <div className="mb-4 ">
          <h4 className="mb-2 text-2xl text-center">
            Basket is currently empty
          </h4>
        </div>
        <div>
          <Button type="button" color="dark" className="w-full">
            <Link href="/products">
              <a
                className={`block text-xl text-center font-normal list-none cursor-pointer hover:text-yellow-400`}
              >
                Continue Shopping
              </a>
            </Link>
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
            {state.cart.cartItems?.map((item) => {
              return (
                <div key={item.product}>
                  <CartItem
                    {...item}
                    size={40}
                    textSize={"text-sm"}
                    updateCartHandler={updateCartHandler}
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
                {state.cart.cartItems
                  ?.reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </p>
            </div>
            {/* <Button
              type='button'
              color='danger'
              className='w-full my-4'
              onClick={checkoutHandler}>
              Proceed to Checkout
            </Button> */}
            <Button type="button" color="dark" className="w-full">
              <Link href={"/cart"}>
                <a
                  className={`block text-xl text-center font-normal list-none cursor-pointer `}
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
  default: `hidden md:block flex flex-col h-screen fixed inset-y-0 right-0 transition-all ease-in-out duration-200 `,
  enabled: `sm:w-[40vw] md:w-[35vw] lg:w-[30vw] bg-gray-100 z-50  text-gray-700 overflow-x-hidden p-4 transition-all duration-200 ease-in-out `,
  disabled: `w-0  bg-gray-800 text-white overflow-x-hidden`,
};

export default CartContainer;
