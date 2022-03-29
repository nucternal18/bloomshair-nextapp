import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Square } from "@square/web-sdk";
import { ToastContainer } from "react-toastify";
import Script from "next/script";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";

// Context
import { AuthProvider } from "../context/auth/AuthContext";
import { OrderContextProvider } from "../context/order/OrderContext";
import { ProductContextProvider } from "../context/product/productContext";
import { CartProvider } from "../context/cart/cartContext";
import { ServiceProvider } from "../context/serviceContext";

declare global {
  interface Window {
    Square?: Square;
  }
}

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider attribute="class">
            <SessionProvider session={pageProps.session}>
              <ServiceProvider>
                <CartProvider>
                  <AuthProvider>
                    <ProductContextProvider>
                      <OrderContextProvider>
                        <Component {...pageProps} />
                      </OrderContextProvider>
                    </ProductContextProvider>
                  </AuthProvider>
                </CartProvider>
              </ServiceProvider>
            </SessionProvider>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default MyApp;
