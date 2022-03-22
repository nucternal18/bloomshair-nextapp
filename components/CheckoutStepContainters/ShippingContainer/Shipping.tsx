import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

// Components
import Button from "../../Button";
import ShippingAddressForm from "../../Forms/ShippingAddressForm";

// Context
import { useCart } from "../../../context/cart/cartContext";
import { saveShippingAddress } from "../../../context/cart/cartActions";
import { useAuth } from "../../../context/auth/AuthContext";

type Inputs = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

function ShippingContainer({ userData, handleStepChange }) {
  const router = useRouter();
  const { state, dispatch } = useCart();
  const { updateUserProfile } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const [show, setShow] = useState<boolean>(false);
  const [deliveryMethod, setDeliveryMethod] = useState<string>("");
  const [isAddress, setIsAddress] = useState<boolean>(false);
  const [checkedOne, setCheckedOne] = useState<boolean>(false);
  const [checkedTwo, setCheckedTwo] = useState<boolean>(false);

  useEffect(() => {
    if (userData.shippingAddress.address !== "") {
      setIsAddress(true);
    }
  }, []);

  const submitHandler: SubmitHandler<Inputs> = ({
    address,
    city,
    postalCode,
    country,
  }) => {
    const data = {
      address: address,
      city: city,
      postalCode: postalCode,
      country: country,
    };
    updateUserProfile({ ...userData, shippingAddress: data });
    dispatch(saveShippingAddress(data));
    setShow(false);
  };

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
    setDeliveryMethod("RoyalMail standard");
  };

  const handleChangeTwo = () => {
    setCheckedTwo(!checkedTwo);
    setDeliveryMethod("RoyalMail nextDay");
  };

  const proceedToPayment = () => {
    const shippingAddress =
      userData.shippingAddress.address !== ""
        ? userData.shippingAddress
        : state.cart.shippingAddress;
    if (!deliveryMethod) {
      toast.error("Delivery method required");
      return;
    }
    const data = { ...shippingAddress, deliveryMethod };
    dispatch(saveShippingAddress(data));
    handleStepChange("next");
  };
  const handleOpen = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <div className="flex items-center justify-between mb-6 border-b-2 border-current border-gray-200">
        <h1 className="p-3 text-2xl font-thin md:p-5 md:text-5xl">Shipping</h1>
        <Button
          type="button"
          color="dark"
          onClick={() => {
            router.replace("/checkout/cart");
          }}
        >
          return to cart
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        <div className="h-full flex flex-col justify-between pt-6 pb-8 mx-2 mb-4 border-b md:border-b-0 sm:px-4 md:border-r ">
          <div>
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-8 h-8 p-2 mr-2 text-gray-200 bg-gray-800 rounded-full">
                <p>1</p>
              </div>
              <div className="text-xl">Delivery Address</div>
            </div>
            {userData.shippingAddress?.address ? (
              <div className="">
                <h1 className="text-lg mb-4">Address</h1>
                <div>
                  <p>{userData.shippingAddress.address}</p>
                  <p>{userData.shippingAddress.city}</p>
                  <p>{userData.shippingAddress.postalCode}</p>
                  <p>{userData.shippingAddress.country}</p>
                </div>
              </div>
            ) : (
              <div className="">
                <h1 className="text-lg mb-4">Address</h1>
                <div>
                  <p>{state.cart.shippingAddress.address}</p>
                  <p>{state.cart.shippingAddress.city}</p>
                  <p>{state.cart.shippingAddress.postalCode}</p>
                  <p>{state.cart.shippingAddress.country}</p>
                </div>
              </div>
            )}
          </div>
          <div>
            <Button
              type="submit"
              color="dark"
              className="w-full mb-2"
              onClick={handleOpen}
            >
              Add new delivery address
            </Button>
            <Button
              type="submit"
              color="dark"
              disabled={!!userData?.shippingAddress?.address}
              className="w-full "
              onClick={() => setIsAddress(true)}
            >
              Proceed to Delivery
            </Button>
          </div>
        </div>
        <ShippingAddressForm
          submitHandler={submitHandler}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          show={show}
          handleClose={handleClose}
        />
        <div
          className={`${
            isAddress ? "opacity-100" : "opacity-50"
          } h-full flex flex-col justify-between pt-6 pb-8 mx-2 mb-4 ml-2 border-b md:border-b-0 md:border-r sm:px-4`}
        >
          <label className="flex items-center mb-4">
            <div className="flex items-center justify-center w-8 h-8 p-2 mr-2 text-gray-200 bg-gray-800 rounded-full">
              <p>2</p>
            </div>
            <div className="text-xl">Delivery Methods</div>
          </label>

          <div className="mb-4 border-b">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="free-delivery"
                checked={checkedOne}
                value="standard"
                className="w-4 h-4 mr-2 text-gray-700 border rounded-full focus:ring-transparent"
                onChange={handleChangeOne}
              />
              <label htmlFor="free-delivery" className="ml-2 ">
                <span className="mr-8 font-normal">£4.95</span>
                <span className="font-thin">Standard Delivery 2-5 Days</span>
              </label>
            </div>
            <div className="mb-2">
              <p>
                Excludes weekends. Some items maybe sent direct from the
                supplier
              </p>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="paid-delivery"
                checked={checkedTwo}
                value="nextDay"
                className="w-4 h-4 mr-2 text-gray-700 border rounded-full focus:ring-transparent"
                onChange={handleChangeTwo}
              />
              <label htmlFor="paid-delivery" className="ml-2">
                <span className="mr-8 font-normal">£6.95</span>
                <span className="font-thin">Next Day </span>
              </label>
            </div>
            <div className="mb-2">
              <p>
                Orders must be placed before 4.00pm Monday to Thursday to
                qualify for Next Day delivery. Excludes weekends. Some items
                maybe sent direct from the supplier. VAT is not included in the
                Delivery price.
              </p>
            </div>
          </div>

          <Button
            type="button"
            color="dark"
            className="w-full"
            disabled={!isAddress}
            onClick={proceedToPayment}
          >
            Proceed to payment
          </Button>
        </div>
        <div className="h-full pt-6 pb-8 mx-2 mb-4 ml-2 sm:px-4">
          <label className="flex items-center mb-4">
            <div className="text-xl">Order Summary</div>
          </label>
          <div className="w-full p-2 ">
            <div className="mb-2">
              <p className="font-medium">
                <span className="mr-1">
                  {state.cart.cartItems.reduce(
                    (acc, item) => acc + item.qty,
                    0
                  )}
                </span>
                Items in Cart
              </p>
            </div>
            {state.cart.cartItems.map((item) => (
              <div key={item.product}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-thin">{item.name}</p>
                  <p className="font-medium">
                    £
                    {state.cart.cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            <div className="mb-2">
              <p className="flex items-center">
                <span className="mr-2">Qty</span>
                {state.cart.cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShippingContainer;
