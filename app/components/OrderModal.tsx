"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CartItemsProps } from "../../lib/types";
import Button from "./Button";

interface IOrderModal {
  show: boolean;
  handleClose: () => void;
  tableData: CartItemsProps[];
}

const OrderModal = ({ handleClose, tableData, show }: IOrderModal) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={
        show
          ? "z-50 fixed top-0 left-0 w-full h-full bg-black opacity-50 flex items-center justify-center "
          : "hidden"
      }
      onClick={handleClose}
    >
      <div className="container px-2 pt-6 pb-8 mx-2 mb-4 bg-white shadow-2xl md:mx-auto ">
        <div className="flex items-center justify-between mb-6 border-b-2 border-current border-gray-200">
          <div>
            <h1 className="p-3 text-2xl font-thin capitalize md:p-5 md:text-5xl">
              Ordered Items
            </h1>
          </div>
        </div>
        <table className="w-full sm:rounded-2xl sm:shadow-md mb-4 md:table">
          <thead className="bg-gray-50 dark:bg-teal-500  hidden md:table-header-group">
            <tr className="md:table-row absolute  -top-full font-mono md:top-auto gap-2 -left-full md:left-auto  md:relative">
              <th
                scope="col"
                className="
                  px-3
                  py-3
                  text-left
                  sm:text-center 
                  font-medium
                  text-gray-800
                  dark:text-gray-100
                  uppercase
                  tracking-wider
                  md:table-cell
                "
              >
                Product Id
              </th>
              <th
                scope="col"
                className="
                  px-3
                  py-3
                  text-left 
                  font-medium
                  sm:text-center
                  text-gray-800
                  dark:text-gray-100
                  uppercase
                  tracking-wider
                  md:table-cell
                "
              >
                Image
              </th>

              <th
                scope="col"
                className="
                  px-2
                  py-3
                  text-left
                  sm:text-center 
                  font-medium
                  text-gray-800
                  dark:text-gray-100
                  uppercase
                  tracking-wider
                  md:table-cell
                "
              >
                Product Name
              </th>
              <th
                scope="col"
                className="
                  px-2
                  py-3
                  text-left 
                  sm:text-center
                  font-medium
                  text-gray-800
                  dark:text-gray-100
                  uppercase
                  tracking-wider
                  md:table-cell
                "
              >
                Product Price
              </th>
              <th
                scope="col"
                className="
                  px-2
                  py-3
                  text-left
                  sm:text-center 
                  font-medium
                  text-gray-800
                  dark:text-gray-100
                  uppercase
                  tracking-wider
                  md:table-cell
                "
              >
                QTY Purchased
              </th>
            </tr>
          </thead>
          <tbody className=" block px-1 md:px-0 pb-4  md:table-row-group">
            {tableData?.map((item) => (
              <tr
                key={item.id}
                className="bg-white text-gray-900 dark:text-gray-100 shadow-2xl md:shadow-none dark:bg-gray-700 rounded md:rounded-none overflow-hidden sm:py-2  mb-2 md:mb-0 md:border-none block md:table-row"
              >
                <td className="p-2 flex items-center text-left whitespace-nowrap md:table-cell gap-2">
                  <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                    Product Id
                  </span>
                  <div className="flex items-center justify-center">
                    <div className="text-sm font-medium text-ellipsis overflow-hidden">
                      {item.id}
                    </div>
                  </div>
                </td>
                <td className="p-2 flex items-center sm:text-center whitespace-nowrap md:table-cell gap-2">
                  <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                    Image
                  </span>
                  <div className="flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-md"
                      objectFit="cover"
                    />
                  </div>
                </td>

                <td className="p-2 flex items-center sm:text-center whitespace-nowrap md:table-cell gap-2">
                  <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                    Product Name
                  </span>
                  <div className="flex items-center justify-center">
                    <div className="text-sm font-medium text-ellipsis overflow-hidden">
                      {item.name}
                    </div>
                  </div>
                </td>
                <td className="p-2 flex items-center sm:text-center whitespace-nowrap md:table-cell gap-2">
                  <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                    Product Price
                  </span>
                  <div className="flex items-center justify-center">
                    <div className="text-sm font-medium text-ellipsis overflow-hidden">
                      £{item.price}
                    </div>
                  </div>
                </td>
                <td className="p-2 flex items-center sm:text-center whitespace-nowrap md:table-cell gap-2">
                  <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                    QTY Purchased
                  </span>
                  <div className="flex items-center justify-center">
                    <div className="text-sm font-medium text-ellipsis overflow-hidden">
                      {item.qty}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 mb-4">
          <Button color="dark" type="button" onClick={handleClose}>
            Close
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderModal;
