import Link from "next/link";
import { FaTimes } from "react-icons/fa";

// component
import Button from "../Button";

// types
import { OrderProps } from "@lib/types";
interface ITable {
  tableData: OrderProps[];
}

const tableHeaders: Array<string> = [
  "Order ID",
  "Date",
  "Total",
  "Paid",
  "Delivered",
  "Details",
];
const Table = ({ tableData }: ITable) => {
  return (
    <div className="relative w-full overflow-x-auto">
      <table className="w-full sm:rounded-xl  table">
        <thead className="bg-gray-50 dark:bg-teal-500  table-header-group">
          <tr className="table-row font-mono top-auto gap-2 left-auto  relative">
            {tableHeaders.map((header, index) => (
              <th
                key={`${header}-${index}`}
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
                  table-cell
                "
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="px-0  table-row-group">
          {tableData?.map((item) => (
            <tr
              key={item.id}
              className="bg-white text-gray-900 dark:text-gray-100 shadow-none dark:bg-gray-700  rounded-none overflow-hidden  mb-0 border-none table-row"
            >
              <td className="p-2  items-center text-left whitespace-nowrap table-cell gap-2">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-ellipsis overflow-hidden">
                    {item.id}
                  </div>
                </div>
              </td>
              <td className="p-2  items-center text-left whitespace-nowrap table-cell gap-2">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-ellipsis overflow-hidden">
                    {new Date(item.createdAt as Date).toLocaleDateString()}
                  </div>
                </div>
              </td>
              <td className="p-2  items-center text-left whitespace-nowrap table-cell gap-2">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-ellipsis overflow-hidden">
                    £{item.totalPrice}
                  </div>
                </div>
              </td>
              <td className="p-2  items-center text-left whitespace-nowrap table-cell gap-2">
                <div className="text-sm font-medium text-ellipsis overflow-hidden">
                  {item.isPaid ? (
                    new Date(item.paidAt as Date).toLocaleDateString()
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                </div>
              </td>
              <td className="p-2  items-center text-center whitespace-nowrap table-cell gap-2">
                <div className="text-sm font-medium text-ellipsis  overflow-hidden">
                  {item.isDelivered ? (
                    new Date(item.deliveredAt as Date).toLocaleDateString()
                  ) : (
                    <FaTimes fontSize={24} className="text-red-500  " />
                  )}
                </div>
              </td>

              <td className="p-2  items-center text-left whitespace-nowrap table-cell gap-2">
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
    </div>
  );
};

export default Table;
