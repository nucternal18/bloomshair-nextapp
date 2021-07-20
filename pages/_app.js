// import '../styles/globals.css'
import 'tailwindcss/tailwind.css';

import AuthContextProvider from '../context/AuthContext';
import OrderContextProvider from '../context/OrderContext';
import ProductContextProvider from '../context/productContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <OrderContextProvider>
          <Component {...pageProps} />
        </OrderContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
