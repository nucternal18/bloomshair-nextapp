import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { SnipcartProvider } from "use-snipcart";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";

import { store, wrapper } from "../app/store";

function MyApp({ Component, pageProps, router }: AppProps) {
  // useEffect(() => {
  //   const unsubscribe = snipcart.events.on('item.added', (cartItem) => {
  //     console.log(cartItem);
  //   })
  //   return () => unsubscribe();
  // },[])

  return (
    <>
      <Provider store={store}>
        <ThemeProvider attribute="class">
          <SessionProvider
            session={pageProps.session}
            refetchInterval={5 * 60}
            // Re-fetches session when window is focused
            refetchOnWindowFocus={true}
          >
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
          </SessionProvider>
        </ThemeProvider>
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
      </Provider>
    </>
  );
}

export default MyApp;
