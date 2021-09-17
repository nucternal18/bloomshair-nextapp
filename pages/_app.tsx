import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "next-auth/client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";

// Context
import { AuthProvider } from "../context/auth/AuthContext";
import { OrderContextProvider } from "../context/order/OrderContext";
import { ProductContextProvider } from "../context/product/productContext";
import { CartProvider } from "../context/cart/cartContext";

declare global {
  interface Window {
    paypal: any;
    Square: any;
  }
}

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider session={pageProps.session}>
          <CartProvider>
            <AuthProvider>
              <ProductContextProvider>
                <OrderContextProvider>
                  <Component {...pageProps} />
                </OrderContextProvider>
              </ProductContextProvider>
            </AuthProvider>
          </CartProvider>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
