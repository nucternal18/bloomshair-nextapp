"use client";
import { useRouter } from "next/navigation";
import { FaEdit, FaTimes } from "react-icons/fa";

import OrderModal from "app/components/OrderModal";
import { NEXT_URL } from "@config/index";
import { CartItemsProps, OrderProps } from "@lib/types";

interface IOrdersTable {
  handleShow: () => void;
  handleClose: () => void;
  show: boolean;
  tableData: OrderProps[];
}
const tableHeader = [
  "CUSTOMER NAME",
  "DATE",
  "ORDER ITEMS",
  "TOTAL PRICE",
  "PAID",
  "DELIVERED",
  "ACTION",
];
const Table = ({ tableData, handleShow, handleClose, show }: IOrdersTable) => {
  const router = useRouter();
  return (
    <>
      <table className="w-full sm:rounded-2xl md:table">
        <thead className="bg-gray-50 dark:bg-teal-500  hidden md:table-header-group">
          <tr className="md:table-row absolute  -top-full font-mono md:top-auto gap-2 -left-full md:left-auto  md:relative">
            {tableHeader.map((header, index) => (
              <th
                key={`${header}-${index}`}
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
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=" block px-1 md:px-0 pb-4  md:table-row-group">
          {tableData?.map((item) => (
            <tr
              key={item.id}
              className="bg-white text-gray-900 dark:text-gray-100 shadow-2xl md:shadow-none dark:bg-gray-700 rounded md:rounded-none overflow-hidden  mb-2 md:mb-0 md:border-none block md:table-row"
            >
              <td className="py-4 px-2 flex items-center text-left whitespace-nowrap md:table-cell gap-2">
                <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                  Customer Name
                </span>
                <div className="flex items-center justify-center">
                  <div className="text-sm font-medium text-ellipsis overflow-hidden">
                    {item.user && item.user.name}
                  </div>
                </div>
              </td>
              <td className="py-4 px-2 flex items-center sm:text-center whitespace-nowrap md:table-cell gap-2">
                <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                  Date
                </span>
                <div className="flex items-center justify-center">
                  <div className="text-sm font-medium text-ellipsis overflow-hidden border px-2 py-1 shadow-md shadow-teal-500/50 rounded-2xl text-gray-200 bg-teal-500 border-teal-500">
                    {new Date(item.createdAt as Date).toLocaleDateString()}
                  </div>
                </div>
              </td>
              <td className="py-4 px-2 flex items-center sm:text-center whitespace-nowrap md:table-cell gap-2">
                <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                  View
                </span>
                <div className="flex items-center justify-center w-full">
                  <button
                    onClick={handleShow}
                    className="text-sm font-medium text-ellipsis overflow-hidden border border-black hover:border-gray-700 px-4 py-1 bg-gray-900 text-gray-200 hover:bg-gray-700 shadow-md shadow-black/50 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 rounded-full"
                  >
                    View
                  </button>
                  <OrderModal
                    show={show}
                    handleClose={handleClose}
                    tableData={item.orderItems as CartItemsProps[]}
                  />
                </div>
              </td>
              <td className="py-4 px-2 flex items-center sm:text-center whitespace-nowrap md:table-cell gap-2">
                <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                  Total Price
                </span>
                <div className="flex items-center justify-center">
                  <div className="text-sm font-medium text-ellipsis overflow-hidden">
                    £{item.totalPrice}
                  </div>
                </div>
              </td>
              <td className="p-2 flex items-center sm:text-center whitespace-nowrap md:table-cell gap-2">
                <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                  Paid
                </span>
                <div className="flex items-center justify-center">
                  {item.isPaid ? (
                    <div className="text-sm font-medium text-ellipsis overflow-hidden border px-2 py-1 shadow-md shadow-teal-500 rounded-2xl text-gray-200 bg-teal-500 border-teal-500">
                      {new Date(item.paidAt as Date).toLocaleDateString()}
                    </div>
                  ) : (
                    <FaTimes fontSize={18} className="text-red-500" />
                  )}
                </div>
              </td>
              <td className="py-4 px-2 flex items-center sm:text-center whitespace-nowrap md:table-cell gap-2">
                <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                  Delivered
                </span>
                <div className="flex items-center justify-center">
                  <div className="text-sm font-medium text-ellipsis overflow-hidden">
                    {item.isDelivered ? (
                      <div className="border px-2 py-1 shadow-md rounded-2xl text-gray-200 bg-teal-500 border-teal-500">
                        {new Date(
                          item.deliveredAt as Date
                        ).toLocaleDateString()}
                      </div>
                    ) : (
                      <FaTimes fontSize={18} className="text-red-500" />
                    )}
                  </div>
                </div>
              </td>
              <td className="py-4 px-2 flex items-center text-left whitespace-nowrap md:table-cell gap-2">
                <span className="inline-block w-1/3 md:hidden uppercase font-bold text-teal-500 font-mono">
                  Actions
                </span>
                <div className="flex items-center justify-center">
                  <span
                    className="
                    px-2
                    inline-flex
                    text-xs
                    leading-5
                  "
                  >
                    <button
                      type="button"
                      className="text-blue-600 text-md"
                      onClick={(e) => {
                        e.preventDefault();
                        router.replace(`${NEXT_URL}/admin/orders/${item.id}`);
                      }}
                    >
                      <FaEdit
                        fontSize={18}
                        className="drop-shadow-md transition ease-in-out delay-150 hover:text-indigo-500 hover:-translate-y-1 hover:scale-110  duration-300"
                      />
                    </button>
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
