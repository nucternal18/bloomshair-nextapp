import { useRouter } from "next/router";
// redux
import { useAppSelector } from "app/hooks";
import { orderSelector } from "features/orders/orderSlice";

// Components
import Button from "../../Button";

const OrderComplete = () => {
  const router = useRouter();
  const { order } = useAppSelector(orderSelector);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-between mb-6 ">
        <h2 className="p-2 text-2xl capitalize font-thin md:p-3 md:text-3xl">
          THANK YOU FOR YOUR PURCHASE!
        </h2>
      </div>
      <div className="px-2 mb-4">
        <h3>your order # is: {order?.id}</h3>
      </div>
      <div className="px-2 mb-4">
        <p>
          We&apos;ve got your order and we&apos;re busy prepping it for you.
          Keep an eye out on you inbox - you&apos;ll receive an order
          confirmation soon
        </p>
      </div>
      <div className="px-2 mb-4">
        <Button
          type="button"
          color="dark"
          onClick={() => {
            router.push("/products");
          }}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default OrderComplete;
