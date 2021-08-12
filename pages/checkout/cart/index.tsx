import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { useQuery, useQueryClient } from "react-query";

// Component
import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";

import { OrderContext } from "../../../context/OrderContext";

function Cart() {
  const router = useRouter();
  const { id, qty } = router.query;
  const { cartItems, addToCart, removeFromCart, clearCart, getCartItems } =
    useContext(OrderContext);

  const { data: cart, isLoading } = useQuery("cart", getCartItems, {
    initialData: cartItems,
  });

  useEffect(() => {
    if (id) {
      addToCart(id, +qty);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, qty, cart]);

  const removeFromCartHandler = (itemId) => {
    removeFromCart(itemId);
    router.reload();
  };

  const checkoutHandler = () => {
    router.push("/checkout/shipping");
  };

  return (
    <Layout>
      <main className="w-full p-2 mx-auto bg-gray-200 md:p-4">
        <section className="container max-w-screen-lg p-2 mb-4 bg-white rounded shadow-xl md:p-12 md:mx-auto">
          <div className="flex items-center justify-between px-3 py-2 mb-6 border-b-2 border-current border-gray-200 md:px-5">
            <h1 className="text-3xl font-thin md:text-5xl">Shopping Basket</h1>
            <Button
              type="button"
              color="dark"
              className="hidden md:block"
              onClick={() => router.push("/products")}
            >
              Continue Shopping
            </Button>
          </div>
          <div className="flex justify-center w-full">
            <div className="grid grid-cols-1 px-1 md:gap-2 lg:gap-4 md:px-1 sm:grid-cols-2 md:grid-cols-3 ">
              <div className=" md:col-span-2">
                {cart.length === 0 ? (
                  <ErrorMessage variant="default">
                    Your cart is empty
                  </ErrorMessage>
                ) : (
                  <div className="p-4 mb-2 border">
                    <div className="flex justify-between p-2 border-b-2">
                      <h1 className="text-2xl font-normal">Cart Items</h1>
                    </div>
                    {cart.map((item) => (
                      <div
                        className="flex items-center justify-around w-full"
                        key={item.product}
                      >
                        <div className="hidden mr-2 md:block">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={70}
                            height={70}
                            className="rounded"
                          />
                        </div>
                        <div className="mr-2 truncate">
                          <Link href={`/products/${item.product}`}>
                            <a className="font-normal md:text-xl">
                              {item.name}
                            </a>
                          </Link>
                        </div>
                        <div className="mr-2 font-thin md:text-xl">
                          £{item.price}
                        </div>
                        <div className="mr-2">
                          <select
                            className="w-full px-3 py-2 my-2 bg-white border rounded outline-none"
                            value={item.qty}
                            onChange={(e) =>
                              addToCart(item.product, Number(e.target.value))
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option
                                key={x + 1}
                                value={x + 1}
                                className="py-1"
                              >
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mr-2">
                          <Button
                            type="button"
                            color="danger"
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            <FaTrash className="" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex flex-col justify-around mb-2 md:items-center md:flex-row">
                  <div>
                    <Button
                      type="button"
                      color="dark"
                      className="w-full mb-2 md:w-40"
                      disabled={cart.length === 0}
                      onClick={() => null}
                    >
                      Clear Cart
                    </Button>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center">
                    <Button
                      type="button"
                      color="dark"
                      className="w-full mb-2 md:w-40 md:mr-1"
                      disabled={cart.length === 0}
                      onClick={() => router.reload()}
                    >
                      Update Basket
                    </Button>
                    <p className="mb-2 text-center"> -Or- </p>
                    <Button
                      type="button"
                      color="dark"
                      className="w-full mb-2 md:w-48 md:ml-1"
                      onClick={() => router.push("/products")}
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
                          {cart
                            .reduce(
                              (acc, item) => acc + item.qty * item.price,
                              0
                            )
                            .toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-thin">Items:</p>
                        <p className="font-medium">
                          {cart.reduce((acc, item) => acc + item.qty, 0)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <p className="font-thin">Delivery:</p>
                        <p className="font-medium">Not yet calculated</p>
                      </div>
                    </div>
                    <div className="w-full mt-8 border-t">
                      <div className="flex justify-between py-6 text-sm font-semibold uppercase">
                        <span className="font-thin">Total</span>
                        <span>
                          {" "}
                          £
                          {cart
                            .reduce(
                              (acc, item) => acc + item.qty * item.price,
                              0
                            )
                            .toFixed(2)}
                        </span>
                      </div>
                      <Button
                        type="button"
                        color="yellow"
                        className="w-full"
                        disabled={cart.length === 0}
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
  );
}

export default Cart;
