import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";

// Component
import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";
import { Card } from "../../../components/Card";

import { OrderContext } from "../../../context/OrderContext";

function Cart() {
  const router = useRouter();
  const { id, qty } = router.query;
  const [cart, setCart] = useState([]);
  const { cartItems, addToCart, removeFromCart } = useContext(OrderContext);

  useEffect(() => {
    if (id) {
      addToCart(id, +qty);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, qty, cartItems]);

  useEffect(() => {
    if (cartItems) {
      setCart(cartItems);
    }
  }, [cartItems]);

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
        <section className="container p-2 mb-4 bg-white rounded shadow-xl md:p-12 md:mx-auto ">
          <div className="flex items-center justify-between mb-6 border-b-4 border-current border-gray-200">
            <h1 className="p-3 text-2xl font-bold md:p-5 md:text-5xl">
              Shopping Cart
            </h1>
          </div>
          <div className="flex justify-center w-full">
            <div className="grid grid-cols-1 px-1 md:gap-2 lg:gap-4 md:px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
              <div className=" md:col-span-2 lg:col-span-3">
                {cart.length === 0 ? (
                  <ErrorMessage variant="default">
                    Your cart is empty
                  </ErrorMessage>
                ) : (
                  <Card className="p-2 mb-2 ">
                    <div className="flex justify-between p-2 border-b-2">
                      <h1 className="text-2xl font-semibold">Cart Items</h1>
                      <h2 className="text-2xl font-semibold">{qty} Items</h2>
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
                            <a className="font-semibold md:text-xl">
                              {item.name}
                            </a>
                          </Link>
                        </div>
                        <div className="mr-2 font-semibold md:text-xl">
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
                            color="yellow"
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            <FaTrash className="" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </Card>
                )}
              </div>
              <div className="col-span-1">
                <Card className="p-1 md:w-64">
                  <div className="p-3 border-b">
                    <h1 className="text-2xl font-semibold ">Order Summary</h1>
                  </div>
                  <div className="w-full p-6">
                    <div className="flex justify-between">
                      <div className="flex items-center mb-4 text-xl font-semibold">
                        <h2 className="mr-1">Items</h2>
                        {cart.reduce((acc, item) => acc + item.qty, 0)}
                      </div>
                      <p className="mb-4 text-lg font-semibold">
                        £
                        {cart
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toFixed(2)}
                      </p>
                    </div>
                    {/* <div className="w-full mb-4">
                      <label className="inline-block mb-3 text-sm font-medium uppercase">
                        Shipping
                      </label>
                      <select
                        disabled={cart.length === 0}
                        value={shippingCost}
                        className="block w-full px-1 py-3 text-sm text-gray-600"
                        onChange={(e) =>
                          setShippingCost(Number(e.target.value))
                        }
                      >
                        <option>Choose Shipping method...</option>
                        <option value={5.99}>Standard shipping-£5.99</option>
                      </select>
                    </div> */}
                    <div className="w-full mt-8 border-t">
                      <div className="flex justify-between py-6 text-sm font-semibold uppercase">
                        <span>Total cost</span>
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
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Cart;
