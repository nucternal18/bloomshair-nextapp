import { useState, createContext, useEffect } from "react";

import { NEXT_URL } from "../config";

type PaymentResProps = {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
};
type ShippingAddressProps = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

type CartItemsProps = {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
};

type OrderProps = {
  orderItems: CartItemsProps[];
  shippingAddress: ShippingAddressProps;
  paymentMethod: "";
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};

interface IOrder {
  createOrder: (newOrder: OrderProps) => void;
  addToCart: (id: string | string[], qty: number) => void;
  removeFromCart: (id: string) => void;
  saveShippingAddress: (data: ShippingAddressProps) => void;
  savePaymentMethod: (data: string) => void;
  payOrder: (orderId: string, paymentResult: PaymentResProps) => void;
  setTotalPrice: (totalPrice: number) => void;
  shippingAddress: ShippingAddressProps;
  paymentMethod: "";
  cartItems: CartItemsProps[];
  requestStatus: string;
  message: string;
  success: boolean;
  loading: boolean;
  error: string | Error | null;
  totalPrice: number;
  order: any;
}

export const OrderContext = createContext<IOrder>({
  createOrder: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  saveShippingAddress: () => {},
  savePaymentMethod: () => {},
  payOrder: () => {},
  setTotalPrice: () => {},
  shippingAddress: null,
  paymentMethod: null,
  cartItems: null,
  requestStatus: "",
  message: "",
  success: false,
  loading: false,
  error: null,
  totalPrice: 0,
  order: null,
});

const OrderContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [order, setOrder] = useState(null);
  const [requestStatus, setRequestStatus] = useState("");
  const [cartItems, setCartItems] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("cartItems")
        ? JSON.parse(window.localStorage.getItem("cartItems"))
        : []
      : []
  );
  const [shippingAddress, setShippingAddress] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("shippingAddress")
        ? JSON.parse(window.localStorage.getItem("shippingAddress"))
        : {}
      : {}
  );
  const [paymentMethod, setPaymentMethod] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("paymentMethod")
        ? JSON.parse(window.localStorage.getItem("paymentMethod"))
        : ""
      : ""
  );

  // useEffect to update notification to user if action is successful or not
  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  // create order
  const createOrder = async (newOrder) => {
    try {
      setLoading(true);

      const res = await fetch(`${NEXT_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newOrder }),
      });
      const data = await res.json();
      if (res.ok) {
        setLoading(false);
        setOrder(data);
        setSuccess(true);
        setRequestStatus("success");
        setMessage("Order created successfully");
      }
    } catch (error) {
      setLoading(false);
      setRequestStatus("error");
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unable to create order";
      setError(err);
    }
  };

  // Add item to cart
  const addToCart = async (id: string | string[], qty: number) => {
    const response = await fetch(`${NEXT_URL}/api/products/${id}`);
    const data = await response.json();

    const items: CartItemsProps = {
      product: data.data._id,
      name: data.data.name,
      image: data.data.image,
      price: data.data.price,
      countInStock: data.data.countInStock,
      qty,
    };
    console.log(items);
    const existItem = cartItems.find((i) => i.product === items.product);

    if (existItem) {
      cartItems.map((i) => (i.product === existItem.product ? items : i));
    } else {
      setCartItems((prevItems) => [...prevItems, items]);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  // Remove item from  cart
  const removeFromCart = (id) => {
    const updatedCartItems = cartItems.filter((i) => i.product !== id);

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // Save shipping information to local storage
  const saveShippingAddress = (data: ShippingAddressProps) => {
    setShippingAddress(data);
    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };

  // save payment method to localStorage
  const savePaymentMethod = (data) => {
    setPaymentMethod(data);

    localStorage.setItem("paymentMethod", JSON.stringify(data));
  };

  // Send payment result to server
  const payOrder = async (orderId, paymentResult) => {
    try {
      setLoading(true);

      await fetch(`${NEXT_URL}/api/orders/${orderId}/pay`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentResult }),
      });

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unable to complete payment";
      setError(err);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        createOrder,
        addToCart,
        removeFromCart,
        saveShippingAddress,
        savePaymentMethod,
        payOrder,
        setTotalPrice,
        shippingAddress,
        paymentMethod,
        cartItems,
        requestStatus,
        message,
        success,
        loading,
        error,
        totalPrice,
        order,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
