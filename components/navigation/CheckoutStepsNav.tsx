import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const router = useRouter();
  return (
    <nav className="grid grid-cols-3 gap-4 w-3/4  container max-w-screen-md mx-auto mb-4 sm:px-8">
      <div>
        {step1 ? (
          <Link href="/account/login">
            <a
              className={`${
                router.asPath === "/account/login"
                  ? "text-yellow-500 border-t-4 border-yellow-500 pt-4"
                  : "opacity-60"
              }`}
            >
              Sign-In
            </a>
          </Link>
        ) : (
          <button disabled>Sign In</button>
        )}
      </div>
      <div className="line-through"></div>
      <div>
        {step2 ? (
          <Link href="/checkout/shipping">
            <a
              className={`${
                router.asPath === "/checkout/shipping"
                  ? "text-yellow-500 border-t-4 border-yellow-500 pt-4"
                  : "opacity-60"
              }`}
            >
              Shipping
            </a>
          </Link>
        ) : (
          <button disabled>Shipping</button>
        )}
      </div>
      <div className="line-through "></div>
      <div>
        {step3 ? (
          <Link href="/checkout/payment">
            <a
              className={`${
                router.asPath === "/checkout/payment"
                  ? "text-yellow-500 border-t-4 border-yellow-500 pt-4"
                  : "opacity-60"
              }`}
            >
              Payment
            </a>
          </Link>
        ) : (
          <button disabled>Payment</button>
        )}
      </div>
      <div className="line-through "></div>
      <div>
        {step4 ? (
          <Link href="/checkout/placeorder">
            <a
              className={`${
                router.asPath === "/checkout/placeorder"
                  ? "text-yellow-500 border-t-4 border-yellow-500 pt-4"
                  : "opacity-60"
              }`}
            >
              Place Order
            </a>
          </Link>
        ) : (
          <button disabled>Place Order</button>
        )}
      </div>
    </nav>
  );
};

export default CheckoutSteps;
