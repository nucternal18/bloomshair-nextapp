import { useEffect } from 'react';
import Link from 'next/link';
import Image from '';

import ErrorMessage from '../components/ErrorMessage';
// Components
import Layout from '../../../components/Layout';
import CheckoutSteps from '../../../components/navigation/CheckoutStepsNav';
import { Card } from '../../../components/Card';
import Button from '../../../components/Button';

// context
import { OrderContext } from '../../../context/OrderContext';

const PlaceOrderScreen = () => {
  const router = useRouter();
  const { shippingAddress, paymentMethod, cartItems, order, success, error } =
    useContext(OrderContext);
  const { address, city, postalCode, country } = shippingAddress;

  // Calculate prices
  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 5.99);
  const taxPrice = addDecimals(Number((0.2 * itemsPrice).toFixed(2)));
  const totalPrice = addDecimals(
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
  );

  function addDecimals(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
  }

  useEffect(() => {
    if (success) {
      router.push(`/orders/${order._id}`);
    }
    // eslint-disable-next-line
  }, [router, success]);

  const placeOrderHandler = () => {
    createOrder({
      orderItems: cartItems,
      shippingAddress: shippingAddress,
      paymentMethod,
      itemsPrice: itemsPrice,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
    });
  };
  return (
    <Layout>
      <CheckoutSteps step1 step2 step3 step4 />
      <main className='flex w-full p-2 mx-auto bg-gray-200 md:p-4'>
        <section className='flex flex-col p-2 mb-4 bg-white rounded shadow-xl md:p-12 md:mx-auto'>
          <div>
            <div>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {address}, {city}, {postalCode} {country}
              </p>
            </div>
            <div>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </div>
            <div>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <ErrorMessage variant='default'>
                  {' '}
                  Your cart is empty
                </ErrorMessage>
              ) : (
                <div>
                  {cartItems.map((item, index) => (
                    <div key={index}>
                      <div>
                        <div>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            className='rounded'
                          />
                        </div>
                        <div>
                          <Link href={`/product/${item.product}`}>
                            <a>{item.name}</a>
                          </Link>
                        </div>
                        <div>
                          {item.qty} x £{item.price} = £{item.qty * item.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
        <section>
          <Card>
            <div variant='flush'>
              <div>
                <h2>Order Summary</h2>
              </div>
              <div>
                <div className='flex'>
                  <div>Items</div>
                  <div>£{cart.itemsPrice}</div>
                </div>
              </div>
              <div>
                <div className='flex'>
                  <div>Shipping</div>
                  <div>£{cart.shippingPrice}</div>
                </div>
              </div>
              <div>
                <div className='flex'>
                  <div>Tax</div>
                  <div>£{cart.taxPrice}</div>
                </div>
              </div>
              <div>
                <div className='flex'>
                  <div>Total</div>
                  <div>£{cart.totalPrice}</div>
                </div>
              </div>
              <div>
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
              </div>
              <div>
                <Button
                  type='button'
                  color='yellow'
                  disabled={cartItems === 0}
                  onClick={placeOrderHandler}>
                  Place Order
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </Layout>
  );
};

export default PlaceOrderScreen;
