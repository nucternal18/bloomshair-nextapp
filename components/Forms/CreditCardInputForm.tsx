import { HiCreditCard, HiOutlineCalendar } from "react-icons/hi";
import { FaCcMastercard } from "react-icons/fa";

const CreditCardInputForm = ({ register, handleSubmit, errors, onSubmit }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row gap-2 items-center border-2 bg-white border-gray-400 focus:ring-2 focus:ring-blue-600 rounded-md p-2 w-full ">
        <div className="col-span-2 flex items-center w-60 ">
          <label htmlFor="card-number" />
          <input
            type="text"
            id="card-number"
            placeholder="Card number"
            className="bg-white focus:ring-0 outline-none px-2  border-none p-1 w-full order-2"
            {...register("cardNumber")}
          />
          <FaCcMastercard fontSize={28} className="order-1" />
        </div>
        <div className="col-span-1 w-20 flex items-center ">
          <label htmlFor="expiry-date" />
          <input
            type="text"
            id="expiry-date"
            placeholder="MM/YY"
            className="bg-white focus:ring-0 outline-none text-center border-none p-1 w-full order-2"
            {...register("cardExpiry")}
          />
          {/* <HiOutlineCalendar fontSize={28} className="order-1" /> */}
        </div>
        <div className="col-span-1 w-12 flex items-center">
          <label htmlFor="cvv" />
          <input
            type="text"
            id="card-cvv"
            placeholder="CVV"
            className="bg-white focus:ring-0 outline-none text-center border-none p-1 w-full order-2"
            {...register("cardCvv")}
          />
          {/* <HiCreditCard fontSize={28} className="order-1" /> */}
        </div>
        <div className="col-span-1 w-20">
          <label htmlFor="postal-code" />
          <input
            type="text"
            id="postal-code"
            placeholder="ZIP"
            className="bg-white focus:ring-0 outline-none text-center border-none p-1 w-full"
            {...register("postalCode")}
          />
        </div>
      </div>
      <div className="my-5">
        <button
          type="submit"
          className="bg-blue-600 w-full p-2 text-white text-lg rounded shadow-xl font-semibold hover:bg-blue-700"
        >
          Pay
        </button>
      </div>
    </form>
  );
};

export default CreditCardInputForm;
