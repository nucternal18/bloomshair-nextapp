import Link from "next/link";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { ServiceProps } from "../../../lib/types";

// component
import Button from "../../Button";
import { UpdateService } from "../../DrawerContainers";

interface ITable {
  tableData: Partial<ServiceProps>[];
  handleDelete: (id: string) => void;
  handleUpdateDrawerOpen: (id: string) => void;
}

const Table = ({ tableData, handleDelete, handleUpdateDrawerOpen }: ITable) => {
  return (
    <table className="w-full sm:rounded-2xl md:table">
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
            Name
          </th>

          <th
            scope="col"
            className="
                  px-2
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
            Price
          </th>
          <th
            scope="col"
            className="
                  px-2
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
            Category
          </th>
          <th
            scope="col"
            className="
                  px-2
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
            Created At
          </th>
          <th
            scope="col"
            className="
                  px-2
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
            Actions
          </th>
        </tr>
      </thead>
      <tbody className=" block px-1 md:px-0 pb-4  md:table-row-group">
        {tableData?.map((item) => (
          <tr
            key={item.id}
            className="bg-white text-gray-900 dark:text-gray-100 shadow-2xl md:shadow-none dark:bg-gray-700 rounded md:rounded-none overflow-hidden  mb-2 md:mb-0 md:border-none block md:table-row"
          >
            <td className="p-2 flex items-center text-left whitespace-nowrap md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                Name
              </span>
              <div className="flex items-center">
                <div className="text-sm font-medium text-ellipsis overflow-hidden">
                  {item.name}
                </div>
              </div>
            </td>
            <td className="p-2 flex items-center sm:text-center whitespace-nowrap md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                Price
              </span>
              <div className="flex items-center">
                <div className="text-sm font-medium text-ellipsis overflow-hidden">
                  {item.price.toFixed(2)}
                </div>
              </div>
            </td>
            <td className="p-2 flex items-center sm:text-center whitespace-nowrap md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                Category
              </span>
              <div className="flex items-center">
                <div className="text-sm font-medium text-ellipsis overflow-hidden">
                  {item.category}
                </div>
              </div>
            </td>
            <td className="p-2 flex items-center sm:text-center whitespace-nowrap md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                Created At
              </span>
              <div className="flex items-center">
                <div className="text-sm font-medium text-ellipsis overflow-hidden border px-2 drop-shadow-lg rounded-xl text-gray-200 bg-teal-500 border-teal-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </div>
            </td>
            <td className="p-2 flex items-center text-left whitespace-nowrap md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden uppercase font-bold text-teal-500 font-mono">
                Actions
              </span>
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
                  onClick={() => handleUpdateDrawerOpen(item.id)}
                >
                  <FaEdit
                    fontSize={18}
                    className="drop-shadow-md transition ease-in-out delay-150 hover:text-indigo-500 hover:-translate-y-1 hover:scale-110  duration-300"
                  />
                </button>
              </span>

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
                  className="text-red-600 text-md"
                  onClick={() => handleDelete(item.id)}
                >
                  <FaTrash
                    fontSize={18}
                    className="drop-shadow-md transition ease-in-out delay-150 hover:text-rose-500 hover:-translate-y-1 hover:scale-110  duration-300"
                  />
                </button>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
