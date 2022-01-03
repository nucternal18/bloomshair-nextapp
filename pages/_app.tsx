import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";

// Context
import { AuthProvider } from "../context/auth/AuthContext";
import { OrderContextProvider } from "../context/order/OrderContext";
import { ProductContextProvider } from "../context/product/productContext";
import { CartProvider } from "../context/cart/cartContext";

declare global {
  interface Window {
    paypal?: any;
    Square?: any;
  }
}

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <SessionProvider session={pageProps.session}>
            <CartProvider>
              <AuthProvider>
                <ProductContextProvider>
                  <OrderContextProvider>
                    <Component {...pageProps} />
                  </OrderContextProvider>
                </ProductContextProvider>
              </AuthProvider>
            </CartProvider>
          </SessionProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
      <Script src="https://www.paypal.com/sdk/js?client-id=AVWa8N4iHxN5XSlZoJerbtPPdJbVkCHLaJgmmYfqKdY6ncElIYgSz-0GUwc0SRiIlIyDzSIM6mcEWcyv" />
    </>
  );
}

export default MyApp;
