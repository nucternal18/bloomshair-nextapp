import { useState, useContext } from 'react';
import Link from 'next/link';
import cookie from 'cookie';

// Components
import Layout from '../../components/Layout';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import Notification from '../../components/Notification';

// context
import { AuthContext } from '../../context/AuthContext';

function Profile({ user, orders }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {
    loading,
    success,
    error,
    requestStatus,
    image,
    uploading,
    message,
    uploadImage,
    updateUserProfile,
  } = useContext(AuthContext);

  let notification;
  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: message,
    };
  }
  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: error,
    };
  }
  return (
    <Layout>
      <main className='flex-grow w-full p-4 mx-auto bg-gray-200'>
        <section className='container px-12 pt-6 pb-8 mx-2 mb-4 bg-white rounded shadow-xl md:mx-auto '>
          <h2>User Profile</h2>
          {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
          {success && (
            <ErrorMessage variant='success'>Profile updated</ErrorMessage>
          )}
          {loading ? (
            <Spinner />
          ) : (
            <form
              onSubmit={submitHandler}
              className='px-12 pt-6 pb-8 mx-2 mb-4 bg-white rounded shadow-xl sm:mx-auto md:w-2/4'>
              <div>
                <label
                  htmlFor='name'
                  className='block mb-2 text-base font-bold text-gray-700'>
                  Name
                </label>
                <input
                  className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none '
                  type='name'
                  placeholder='Enter your name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}></input>
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-base font-bold text-gray-700'>
                  Email Address
                </label>
                <input
                  className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none '
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}></input>
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-base font-bold text-gray-700'>
                  Password
                </label>
                <input
                  className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none '
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}></input>
              </div>
              <div>
                <label
                  htmlFor='confirmPassword'
                  className='block mb-2 text-base font-bold text-gray-700'>
                  Confirm Password
                </label>
                <input
                  className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none '
                  type='password'
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}></input>
              </div>
              <button
                type='submit'
                className='w-full px-4 py-2 mr-2 font-bold text-blue-400 bg-transparent border border-blue-400 rounded md:w-2/4 hover:bg-blue-700 focus:outline-none focus:shadow-outline hover:text-white'>
                Update
              </button>
            </form>
          )}
        </section>
        <section className='container px-12 pt-6 pb-8 mx-2 mb-4 bg-white rounded shadow-xl md:mx-auto '>
          <h2>My Orders</h2>
          {loadingOrders ? (
            <Spinner />
          ) : errorOrders ? (
            <ErrorMessage variant='danger'>{errorOrders}</ErrorMessage>
          ) : (
            <table className='flex flex-col flex-no-wrap my-5 overflow-hidden rounded-lg table-auto sm:bg-transparent sm:shadow'>
              <thead className='text-white'>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}></i>
                      )}
                    </td>
                    <td>
                      <button className='w-full px-4 py-2 mr-2 font-bold text-blue-400 bg-transparent border border-blue-400 rounded md:w-2/4 hover:bg-blue-700 focus:outline-none focus:shadow-outline hover:text-white'>
                        <Link href={`/order/${order._id}`}>
                          <a>Details</a>
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { token } = cookie.parse(context.req.headers.cookie);

  const userRes = await fetch(`${SERVER_URL}/api/users/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const orderRes = await fetch(`${SERVER_URL}/api/orders/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const ordersData = await orderRes.json();
  const userData = await userRes.json();

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { user: userData, orders: ordersData }, // will be passed to the page component as props
  };
}

export default Profile;
