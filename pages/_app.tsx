import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import "tailwindcss/tailwind.css";

import AuthProvider from "../context/AuthContext";
import OrderContextProvider from "../context/OrderContext";
import ProductContextProvider from "../context/productContext";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthProvider>
          <ProductContextProvider>
            <OrderContextProvider>
              <Component {...pageProps} />
            </OrderContextProvider>
          </ProductContextProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
