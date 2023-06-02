"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Drawer } from "@mantine/core";

// redux
import {
  removeFromCart,
  addToCart,
  cartSelector,
} from "@app/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "app/global-state/hooks";

// Component
import CartItem from "./CartItem";
import Button from "./Button";
import { NEXT_URL } from "../../config";
import { CartItemsProps } from "@lib/types";

function CartContainer({
  cartIsOpen,
  toggleCartDrawer,
}: {
  cartIsOpen: boolean;
  toggleCartDrawer: () => void;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(cartSelector);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const removeFromCartHandler = (itemId: string) => {
    dispatch(removeFromCart(itemId));
    router.reload();
  };

  const updateCartHandler = async (id: string, qty: number) => {
    const res = await fetch(`${NEXT_URL}/api/products/${id}`, {
      method: "GET",
    });
    const data = await res.json();
    const items: CartItemsProps = {
      product: data.product.id,
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
  //     router.push('/auth/signin?redirect=/checkout/shipping');
  //   }
  //   router.push('/checkout/shipping');
  // };
  if (cart.cartItems?.length === 0 && mounted) {
    return (
      <Drawer
        opened={cartIsOpen}
        onClose={toggleCartDrawer}
        position="right"
        title="Your Cart"
        padding="xl"
        size="xl"
      >
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
      </Drawer>
    );
  }
  return (
    mounted && (
      <Drawer
        opened={cartIsOpen}
        onClose={toggleCartDrawer}
        position="right"
        title="Your Cart"
        padding="xl"
        size="xl"
      >
        <div className="pt-4">
          {/* cart items */}
          <div className="mb-4">
            {cart.cartItems?.map((item: CartItemsProps) => {
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
                {cart.cartItems
                  ?.reduce(
                    (acc: number, item: { qty: number; price: number }) =>
                      acc + item.qty * item.price,
                    0
                  )
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
      </Drawer>
    )
  );
}

export default CartContainer;
