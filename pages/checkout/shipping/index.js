import { useContext, useState } from 'react';
import cookie from 'cookie';
import { useRouter } from 'next/router';
// Components
import Layout from '../../../components/Layout';
import CheckoutSteps from '../../../components/navigation/CheckoutStepsNav';

// context
import { OrderContext } from '../../../context/OrderContext';

function Shipping() {
  const router = useRouter();
  const { shippingAddress, saveShippingAddress } = useContext(OrderContext);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country });
    router.push('/checkout/payment');
  };
  return (
    <Layout>
      <div>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <form
          onSubmit={submitHandler}
          className='px-12 pt-6 pb-8 mx-2 mb-4 bg-white rounded shadow-xl sm:mx-auto md:w-2/4'>
          <div className='mb-4'>
            <label
              htmlFor='address'
              className='block mb-2 text-base font-bold text-gray-700'>
              Address
            </label>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none '
              type='text'
              placeholder='Enter your Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}></input>
          </div>
          <div className='mb-4'>
            <label
              htmlFor='city'
              className='block mb-2 text-base font-bold text-gray-700'>
              city
            </label>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none '
              type='text'
              placeholder='Enter your City'
              value={city}
              onChange={(e) => setCity(e.target.value)}></input>
          </div>
          <div className='mb-4'>
            <label
              htmlFor='postalCode'
              className='block mb-2 text-base font-bold text-gray-700'>
              Postal Code
            </label>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none '
              type='text'
              placeholder='Enter your Postal Code'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}></input>
          </div>
          <div className='mb-4'>
            <label
              htmlFor='country'
              className='block mb-2 text-base font-bold text-gray-700'>
              Country
            </label>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none '
              type='text'
              placeholder='Enter your Country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}></input>
          </div>
          <button type='submit'>Continue</button>
        </form>
      </div>
    </Layout>
  );
}

// export async function getServerSideProps(context) {
//   const { token } = cookie.parse(context.req.headers.cookie || '');
//   if (!token) {
//     // If no token is present redirect user to the login page
//     return {
//       redirect: {
//         destination: '/account/login',
//         permanent: false,
//       },
//     };
//   }

// //   if (token) {
// //     // If user has logged in and there is a JWT token present,
// //     // Fetch user data and order data
// //     const [userRes, orderRes] = await Promise.all([
// //       fetch(`${SERVER_URL}/api/users/profile`, {
// //         method: 'GET',
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       }),
// //       fetch(`${SERVER_URL}/api/orders/myorders`, {
// //         method: 'GET',
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       }),
// //     ]);

// //     const [userData, ordersData] = await Promise.all([
// //       userRes.json(),
// //       orderRes.json(),
// //     ]);

// //     return {
// //       props: { userData: userData, orders: ordersData }, // if  will be passed to the page component as props
// //     };
// //   }
//   return {
//     props: {}, // If no token, an empty object will be passed to the page component as props
//   };
// }

export default Shipping;
