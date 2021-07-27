// import '../styles/globals.css'
import "tailwindcss/tailwind.css";

import AuthProvider from "../context/AuthContext";
import OrderContextProvider from "../context/OrderContext";
import ProductContextProvider from "../context/productContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ProductContextProvider>
        <OrderContextProvider>
          <Component {...pageProps} />
        </OrderContextProvider>
      </ProductContextProvider>
    </AuthProvider>
  );
}

export default MyApp;
