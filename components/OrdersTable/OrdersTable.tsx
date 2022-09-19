import Link from "next/link";
import { FaTimes } from "react-icons/fa";

// component
import Button from "../Button";

// types
import { OrderProps } from "@lib/types";
interface ITable {
  tableData: OrderProps[];
}

const Table = ({ tableData }: ITable) => {
  return (
    <table className="w-full sm:rounded-2xl  md:table">
      <thead className="bg-gray-50 dark:bg-teal-500  hidden md:table-header-group">
        <tr className="md:table-row absolute  -top-full font-mono md:top-auto gap-2 -left-full md:left-auto  md:relative">
          <th
            scope="col"
            className="
                  px-3
                  py-3
                  text-left 
                  font-medium
                  text-gray-800
                  dark:text-gray-100
                  uppercase
                  tracking-wider
                  md:table-cell
                "
          >
            ID
          </th>

          <th
            scope="col"
            className="
                  px-3
                  py-3
                  text-left 
                  font-medium
                  text-gray-800
                  dark:text-gray-100
                  uppercase
                  tracking-wider
                  md:table-cell
                "
          >
            DATE
          </th>
          <th
            scope="col"
            className="
                  px-3
                  py-3
                  text-left 
                  font-medium
                  text-gray-800
                  dark:text-gray-100
                  uppercase
                  tracking-wider
                  md:table-cell
                "
          >
            TOTAL
          </th>
          <th
            scope="col"
            className="
                  px-3
                  py-3
                  text-left 
                  font-medium
                  text-gray-800
                  dark:text-gray-100
                  uppercase
                  tracking-wider
                  md:table-cell
                "
          >
            PAID
          </th>
          <th
            scope="col"
            className="
                  px-3
                  py-3
                  text-left 
                  font-medium
                  text-gray-800
                  dark:text-gray-100
                  uppercase
                  tracking-wider
                  md:table-cell
                "
          >
            DELIVERED
          </th>
          <th
            scope="col"
            className="
                  px-3
                  py-3
                  text-left 
                  font-medium
                  text-gray-800
                  dark:text-gray-100
                  uppercase
                  tracking-wider
                  md:table-cell
                "
          >
            DETAILS
          </th>
        </tr>
      </thead>
      <tbody className=" block px-1 md:px-0  md:table-row-group">
        {tableData?.map((item) => (
          <tr
            key={item.id}
            className="bg-white text-gray-900 dark:text-gray-100 shadow-2xl md:shadow-none dark:bg-gray-700 rounded md:rounded-none overflow-hidden  mb-2 md:mb-0 md:border-none block md:table-row"
          >
            <td className="p-2 flex items-center text-left whitespace-nowrap md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                ID
              </span>
              <div className="flex items-center">
                <div className="text-sm font-medium text-ellipsis overflow-hidden">
                  {item.id}
                </div>
              </div>
            </td>
            <td className="p-2 flex items-center text-left whitespace-nowrap md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                DATE
              </span>
              <div className="flex items-center">
                <div className="text-sm font-medium text-ellipsis overflow-hidden">
                  {new Date(item.createdAt as Date).toLocaleDateString()}
                </div>
              </div>
            </td>
            <td className="p-2 flex items-center text-left whitespace-nowrap md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                TOTAL PRICE
              </span>
              <div className="flex items-center">
                <div className="text-sm font-medium text-ellipsis overflow-hidden">
                  £{item.totalPrice}
                </div>
              </div>
            </td>
            <td className="p-2 flex items-center text-left whitespace-nowrap md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                PAID
              </span>
              <div className="flex items-center">
                <div className="text-sm font-medium text-ellipsis overflow-hidden">
                  {item.isPaid ? (
                    new Date(item.paidAt as Date).toLocaleDateString()
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                </div>
              </div>
            </td>
            <td className="p-2 flex items-center text-left whitespace-nowrap md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                DELIVERED
              </span>
              <div className="flex items-center">
                <div className="text-sm font-medium text-ellipsis overflow-hidden">
                  {item.isDelivered ? (
                    new Date(item.deliveredAt as Date).toLocaleDateString()
                  ) : (
                    <FaTimes className="text-red-500 " />
                  )}
                </div>
              </div>
            </td>

            <td className="p-2 flex items-center text-left whitespace-nowrap md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden uppercase font-bold text-teal-500 font-mono">
                DETAILS
              </span>
              <span
                className="
                    px-2
                    inline-flex
                    text-xs
                    leading-5
                  "
              >
                <Button type="button" color="dark">
                  <Link href={`/orders/${item.id}`}>
                    <a>Details</a>
                  </Link>
                </Button>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
