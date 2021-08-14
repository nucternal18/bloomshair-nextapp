import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

// Components
import Layout from "../../../components/Layout";
import CheckoutSteps from "../../../components/navigation/CheckoutStepsNav";
import Button from "../../../components/Button";

// context
import { OrderContext } from "../../../context/OrderContext";

function Shipping() {
  const router = useRouter();
  const { shippingAddress, saveShippingAddress } = useContext(OrderContext);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [deliveryMethod, setDeliveryMethod] = useState("free");
  const [isAddress, setIsAddress] = useState(false);

  const { cartItems, getCartItems } = useContext(OrderContext);

  const { data: cart, isLoading } = useQuery("cart", getCartItems, {
    initialData: cartItems,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const data = { address, city, postalCode, country };
    saveShippingAddress(data);
    setIsAddress(true);
  };

  const proceedToPayment = () => {
    const data = { ...shippingAddress, deliveryMethod };
    saveShippingAddress(data);
    router.push("/checkout/payment");
  };
  return (
    <Layout>
      <main className="w-full p-2 mx-auto bg-gray-200 md:p-4">
        <CheckoutSteps step1 step2 />
        <section className="container p-2 mb-4 bg-white rounded shadow-xl md:p-8 md:mx-auto ">
          <div className="flex items-center justify-between mb-6 border-b-2 border-current border-gray-200">
            <h1 className="p-3 text-2xl font-thin md:p-5 md:text-5xl">
              Shipping
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            <form
              onSubmit={submitHandler}
              className="h-full pt-6 pb-8 mx-2 mb-4 border-b sm:border-b-0 sm:px-4 sm:border-r "
            >
              <label className="flex items-center mb-4">
                <div className="flex items-center justify-center w-8 h-8 p-2 mr-2 text-gray-200 bg-gray-800 rounded-full">
                  <p>1</p>
                </div>
                <div className="text-xl">Delivery Address</div>
              </label>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block mb-2 text-base font-bold text-gray-700"
                >
                  Address
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none "
                  type="text"
                  placeholder="Enter your Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="block mb-2 text-base font-bold text-gray-700"
                >
                  city
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none "
                  type="text"
                  placeholder="Enter your City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="postalCode"
                  className="block mb-2 text-base font-bold text-gray-700"
                >
                  Postal Code
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none "
                  type="text"
                  placeholder="Enter your Postal Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="country"
                  className="block mb-2 text-base font-bold text-gray-700"
                >
                  Country
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none "
                  type="text"
                  placeholder="Enter your Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" color="yellow" className="w-full">
                Proceed to delivery
              </Button>
            </form>
            <div
              className={`${
                isAddress ? "opacity-100" : "opacity-50"
              } h-full pt-6 pb-8 mx-2 mb-4 ml-2 border-b sm:border-b-0 sm:border-r sm:px-4`}
            >
              <label className="flex items-center mb-4">
                <div className="flex items-center justify-center w-8 h-8 p-2 mr-2 text-gray-200 bg-gray-800 rounded-full">
                  <p>2</p>
                </div>
                <div className="text-xl">Delivery Methods</div>
              </label>
              <div className="mb-4 border-b">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="free-delivery"
                    className="w-4 h-4 mr-2 text-gray-700 border rounded"
                    onClick={() => setDeliveryMethod("free")}
                  />
                  <label htmlFor="free-delivery" className="ml-2 ">
                    <span className="mr-8 font-normal">Free Delivery</span>
                    <span className="font-thin">3 - 5 Days</span>
                  </label>
                </div>
                <div className="mb-2">
                  <p>
                    Excludes weekends. Some items maybe sent direct from the
                    supplier
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="paid-delivery"
                    className="w-4 h-4 mr-2 text-gray-700 border rounded"
                    onClick={() => setDeliveryMethod("paid")}
                  />
                  <label htmlFor="paid-delivery" className="ml-2">
                    <span className="mr-8 font-normal">£6.95</span>
                    <span className="font-thin">Next Day </span>
                  </label>
                </div>
                <div className="mb-2">
                  <p>
                    Orders must be placed before 4.00pm Monday to Thursday to
                    qualify for Next Day delivery. Excludes weekends. Some items
                    maybe sent direct from the supplier
                  </p>
                </div>
              </div>
              <Button
                type="button"
                color="yellow"
                className="w-full"
                disabled={!isAddress}
                onClick={proceedToPayment}
              >
                Proceed to payment
              </Button>
            </div>
            <div className="h-full pt-6 pb-8 mx-2 mb-4 ml-2 sm:px-4 ">
              <label className="flex items-center mb-4">
                <div className="text-xl">Order Summary</div>
              </label>
              <div className="w-full p-2 bg-gray-200">
                <div className="mb-2">
                  <p className="font-medium">
                    <span className="mr-1">
                      {!isLoading &&
                        cart.reduce((acc, item) => acc + item.qty, 0)}
                    </span>
                    Items in Cart
                  </p>
                </div>
                {cart.map((item) => (
                  <div key={item.product} className="border-b border-gray-300">
                    <div className="flex items-center justify-between">
                      <p className="font-thin">{item.name}</p>
                      <p className="font-medium">
                        £
                        {cart
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toFixed(2)}
                      </p>
                    </div>
                    <div className="mb-2">
                      <p>Qty {item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Shipping;
