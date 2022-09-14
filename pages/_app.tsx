import type { AppProps } from "next/app";
import { useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { SnipcartProvider } from "use-snipcart";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";

// Context
import { AuthProvider } from "../context/auth/AuthContext";
import { OrderContextProvider } from "../context/order/OrderContext";
import { ProductContextProvider } from "../context/product/productContext";
import { CartProvider } from "../context/cart/cartContext";
import { ServiceProvider } from "../context/serviceContext";
import { GalleryContextProvider } from "../context/GalleryContext";

const composeProviders =
  (...components) =>
  (props) =>
    components.reduce(
      (children, Current) => <Current {...props}>{children}</Current>,
      props.children
    );

const AppProviders = composeProviders(
  AuthProvider,
  OrderContextProvider,
  ProductContextProvider,
  CartProvider,
  ServiceProvider,
  GalleryContextProvider
);

function MyApp({ Component, pageProps, router }: AppProps) {
  const queryClient = new QueryClient();

  // useEffect(() => {
  //   const unsubscribe = snipcart.events.on('item.added', (cartItem) => {
  //     console.log(cartItem);
  //   })
  //   return () => unsubscribe();
  // },[])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider attribute="class">
            <SessionProvider
              session={pageProps.session}
              refetchInterval={5 * 60}
              // Re-fetches session when window is focused
              refetchOnWindowFocus={true}
            >
              <AppProviders>
                <SnipcartProvider>
                  <motion.div
                    key={router.route}
                    initial="initial"
                    animate="animate"
                    // this is a simple animation that fades in the page. You can do all kind of fancy stuff here
                    variants={{
                      initial: {
                        opacity: 0,
                      },
                      animate: {
                        opacity: 1,
                      },
                    }}
                    transition={{ duration: 0.1 }}
                  >
                    <Component {...pageProps} />
                  </motion.div>
                </SnipcartProvider>
              </AppProviders>
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
