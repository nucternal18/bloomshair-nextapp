import { motion } from "framer-motion";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";

function ShippingAddressForm({
  submitHandler,
  handleSubmit,
  register,
  errors,
  show,
  handleClose,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={
        show
          ? "z-50 fixed top-0 py-8 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center "
          : "hidden"
      }
    >
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="h-full pt-6 pb-8 mx-2 mb-4 bg-gray-100  sm:px-4  w-full sm:w-2/4"
      >
        <label className="flex items-center justify-between mb-4 border-b-2 border-gray-300">
          <div className="text-xl">Delivery Address</div>
          <div
            className="flex items-center justify-center w-6 h-6 p-2 mr-2 cursor-pointer text-gray-200 bg-gray-800 rounded-full"
            onClick={handleClose}
          >
            x
          </div>
        </label>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block mb-2 text-base font-bold text-gray-700"
          >
            Street Address:
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none "
            id="address"
            type="text"
            placeholder="Street Address"
            {...register("address", {
              required: "This is required",
            })}
            required
          />
          {errors.address && (
            <ErrorMessage variant="danger">
              {errors.address.message}
            </ErrorMessage>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block mb-2 text-base font-bold text-gray-700"
          >
            city:
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none "
            id="city"
            type="text"
            placeholder="City"
            {...register("city", {
              required: "This is required",
            })}
            required
          />
          {errors.city && (
            <ErrorMessage variant="danger">{errors.city.message}</ErrorMessage>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="postalCode"
            className="block mb-2 text-base font-bold text-gray-700"
          >
            Postal Code:
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none "
            id="postalCode"
            type="text"
            placeholder="Postal Code"
            {...register("postalCode", {
              required: "This is required",
            })}
            required
          />
          {errors.postalCode && (
            <ErrorMessage variant="danger">
              {errors.postalCode.message}
            </ErrorMessage>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block mb-2 text-base font-bold text-gray-700"
          >
            Country:
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none "
            id="country"
            type="text"
            placeholder="Enter your Country"
            {...register("country", {
              required: "This is required",
            })}
            required
          />
          {errors.country && (
            <ErrorMessage variant="danger">
              {errors.country.message}
            </ErrorMessage>
          )}
        </div>
        <Button type="submit" color="yellow" className="w-full">
          Save shipping address
        </Button>
      </form>
    </motion.div>
  );
}

export default ShippingAddressForm;
