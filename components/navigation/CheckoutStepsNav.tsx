import { FC } from "react";
import Link from "next/link";

interface ICheckout {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
}

const CheckoutSteps: FC<ICheckout> = ({
  step1,
  step2,
  step3,
  step4,
}): JSX.Element => {
  return (
    <nav className="flex justify-center mb-4">
      <div>
        {step1 ? (
          <Link href="/login">
            <a>Sign In</a>
          </Link>
        ) : (
          <button disabled>Sign In</button>
        )}
      </div>
      <div>
        {step2 ? (
          <Link href="/shipping">
            <a>Shipping</a>
          </Link>
        ) : (
          <button disabled>Shipping</button>
        )}
      </div>
      <div>
        {step3 ? (
          <Link href="/payment">
            <a>Payment</a>
          </Link>
        ) : (
          <button disabled>Payment</button>
        )}
      </div>
      <div>
        {step4 ? (
          <Link href="/placeorder">
            <a>Place Order</a>
          </Link>
        ) : (
          <button disabled>Place Order</button>
        )}
      </div>
    </nav>
  );
};

export default CheckoutSteps;
