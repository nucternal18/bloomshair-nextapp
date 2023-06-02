import { Key, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

// Component
import Layout from "../../Layout/MainLayout/Layout";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import CheckoutItem from "../components/CheckoutItem";

// Context

import { useAppDispatch, useAppSelector } from "app/global-state/hooks";
import {
  removeFromCart,
  clearCart,
  addToCart,
  cartSelector,
} from "@app/features/cart/cartSlice";
import { NEXT_URL } from "../../config";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { CartItemsProps } from "@lib/types";
import { Session } from "next-auth";

function Cart({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(cartSelector);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const removeFromCartHandler = useCallback((itemId: string) => {
    dispatch(removeFromCart(itemId));
    router.reload();
  }, []);

  const checkoutHandler = () => {
    if (!session) {
      router.push("/auth/signin?redirect=/checkout");
    } else {
      router.push("/checkout");
    }
  };

  const updateCartHandler = async (itemId: string, qty: number) => {
    const res = await fetch(`${NEXT_URL}/api/products/${itemId}`, {
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

  return (
    mounted && (
      <Layout title="Shopping Cart">
        <main className="w-full p-2 mx-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 overflow-hidden md:p-4">
          <section className="container max-w-screen-lg p-2 mb-4  rounded shadow-xl md:p-12 md:mx-auto">
            <div className="flex items-center justify-between px-3 py-2 mb-6 border-b-2 border-gray-200 md:px-5">
              <h1 className="text-3xl font-thin md:text-5xl">
                Shopping Basket
              </h1>
              <Button
                type="button"
                color="dark"
                className="hidden md:block"
                onClick={() => {
                  router.push("/products");
                }}
              >
                Continue Shopping
              </Button>
            </div>
            <div className="flex justify-center w-full">
              <div className="grid grid-cols-1 px-1 md:gap-2 lg:gap-4 md:px-1 sm:grid-cols-2 md:grid-cols-3 w-full">
                <div className=" md:col-span-2">
                  {cart.cartItems?.length === 0 ? (
                    <ErrorMessage variant="default">
                      Your cart is empty
                    </ErrorMessage>
                  ) : (
                    <div className="w-full p-2 mb-2 border">
                      <div className="flex justify-between p-2 border-b">
                        <h1 className="text-2xl font-normal">Cart Items</h1>
                      </div>
                      {cart.cartItems?.map(
                        (item: { product: Key | null | undefined }) => (
                          <div key={item.product}>
                            <CheckoutItem
                              item={item}
                              updateCartHandler={updateCartHandler}
                              removeFromCartHandler={removeFromCartHandler}
                            />
                          </div>
                        )
                      )}
                    </div>
                  )}
                  <div className="flex flex-col justify-around mb-2 md:items-center md:flex-row">
                    <div>
                      <Button
                        type="button"
                        color="dark"
                        className="w-full mb-2 md:w-40"
                        disabled={cart.cartItems?.length === 0}
                        onClick={() => dispatch(clearCart())}
                      >
                        Clear Cart
                      </Button>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                      <Button
                        type="button"
                        color="dark"
                        className="w-full mb-2 md:w-40 md:mr-1"
                        disabled={cart.cartItems?.length === 0}
                        onClick={() => router.reload()}
                      >
                        Update Basket
                      </Button>
                      <p className="mb-2 text-center"> -Or- </p>
                      <Button
                        type="button"
                        color="dark"
                        className="w-full mb-2 md:w-48 md:ml-1"
                        onClick={() => {
                          router.push("/products");
                        }}
                      >
                        Continue Shopping
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="p-1 border md:w-72">
                    <div className="p-3 border-b">
                      <h1 className="text-2xl font-normal ">Order Summary</h1>
                    </div>
                    <div className="w-full p-6">
                      <div className="w-full mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-thin">Subtotal:</p>
                          <p className="font-medium">
                            £
                            {cart.cartItems
                              ?.reduce(
                                (
                                  acc: number,
                                  item: { qty: number; price: number }
                                ) => acc + item.qty * item.price,
                                0
                              )
                              .toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-thin">Items:</p>
                          <p className="font-medium">
                            {
                              +cart.cartItems?.reduce(
                                (acc: any, item: { qty: any }) =>
                                  acc + item.qty,
                                0
                              )
                            }
                          </p>
                        </div>

                        <div className="flex items-center justify-between mb-2">
                          <p className="font-thin">Delivery:</p>
                          <p className="font-medium">Not yet calculated</p>
                        </div>
                      </div>
                      <div className="w-full mt-8 border-t">
                        <div className="flex items-center justify-between py-6 text-sm font-semibold uppercase">
                          <span className="font-thin">Total:</span>
                          <span className="font-medium text-lg">
                            {" "}
                            £
                            {cart.cartItems
                              ?.reduce(
                                (
                                  acc: number,
                                  item: { qty: number; price: number }
                                ) => acc + item.qty * item.price,
                                0
                              )
                              .toFixed(2)}
                          </span>
                        </div>
                        <Button
                          type="button"
                          color="dark"
                          className="w-full"
                          disabled={cart.cartItems?.length === 0}
                          onClick={checkoutHandler}
                        >
                          Proceed To Checkout
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    )
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req;
  const session: Session = (await getSession({ req })) as Session;

  return {
    props: {
      session,
    }, // will be passed to the page component as props
  };
};

export default Cart;
