import { useState, createContext, useEffect } from 'react';

import { NEXT_URL } from '../config';

export const OrderContext = createContext({
  createOrder: () => {},
  orderDelivery: () => {},
  success: false,
  loading: false,
  error: null,
});

const OrderContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [order, setOrder] = useState(null);
  const [requestStatus, setRequestStatus] = useState('');
  const [cartItems, setCartItems] = useState(
    typeof window !== 'undefined'
      ? localStorage.getItem('cartItems')
        ? JSON.parse(window.localStorage.getItem('cartItems'))
        : []
      : []
  );
  const [shippingAddress, setShippingAddress] = useState(
    typeof window !== 'undefined'
      ? localStorage.getItem('shippingAddress')
        ? JSON.parse(window.localStorage.getItem('shippingAddress'))
        : {}
      : {}
  );
  const [paymentMethod, setPaymentMethod] = useState(
    typeof window !== 'undefined'
      ? localStorage.getItem('paymentMethod')
        ? JSON.parse(window.localStorage.getItem('paymentMethod'))
        : {}
      : {}
  );

  // useEffect to update notification to user if action is successful or not
  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  // create order
  const createOrder = async (order) => {
    try {
      setLoading(true);

      const res = await fetch(`${NEXT_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order }),
      });
      const data = await res.json();
      if (res.ok) {
        setLoading(false);
        setOrder(data);
        setSuccess(true);
        setRequestStatus('success');
        setMessage('Order created successfully');
      }
    } catch (error) {
      setLoading(false);
      setRequestStatus('error');
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Unable to create order';
      setError(err);
    }
  };

  // Add item to cart
  const addToCart = async (id, qty) => {
    const response = await fetch(`${NEXT_URL}/api/products/${id}`);
    const data = await response.json();

    const items = {
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

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  // Remove item from  cart
  const removeFromCart = (id) => {
    const updatedCartItems = cartItems.filter((i) => i.product !== id);

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  // Save shipping information to local storage
  const saveShippingAddress = (data) => (dispatch) => {
    setShippingAddress(data);
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };

  // save payment method to localStorage
  const savePaymentMethod = (data) => (dispatch) => {
    setPaymentMethod(data);

    localStorage.setItem('paymentMethod', JSON.stringify(data));
  };

  // Send payment result to server
  const payOrder = async (orderId, paymentResult) => {
    try {
      setLoading(true);

      await fetch(`${NEXT_URL}/api/orders/${orderId}/pay`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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
          : 'Unable to complete payment';
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
      }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
