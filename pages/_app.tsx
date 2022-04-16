import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { SnipcartProvider } from "use-snipcart";
import { ToastContainer } from "react-toastify";

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

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider attribute="class">
            <SessionProvider session={pageProps.session}>
              <AppProviders>
                <SnipcartProvider>
                  <Component {...pageProps} />
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
