import { useContext, useEffect, useState } from 'react';
import cookie from 'cookie';
import { useRouter } from 'next/router';
// Components
import Layout from '../../../components/Layout';
import Button from '../../../components/Button';
import CheckoutSteps from '../../../components/navigation/CheckoutStepsNav';

// context
import { OrderContext } from '../../../context/OrderContext';
function Shipping() {
  const router = useRouter();
  const { shippingAddress, savePaymentMethod } = useContext(OrderContext);
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  useEffect(() => {
    if (!shippingAddress) {
      router.push('/checkout/shipping');
    }
  }, [router, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(paymentMethod);
    router.push('/checkout/placeorder');
  };
  return (
    <Layout>
      <div>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <form onSubmit={submitHandler}>
          <div>
            <label as='legend'>Select Method</label>
            <div>
              <input
                type='radio'
                label='PayPal or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              {/* <input
              type='radio'
              label='square'
              id='Square
              name='paymentMethod'
              value='Square'
              onChange={(e) => setPaymentMethod(e.target.value)} /> */}
            </div>
          </div>
          <Button type='submit' color='yellow'>
            Continue
          </Button>
        </form>
      </div>
    </Layout>
  );
}

export default Shipping;
