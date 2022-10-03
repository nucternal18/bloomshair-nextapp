import Link from "next/link";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { ServiceProps } from "../../../lib/types";

// redux
import { useAppDispatch } from "app/hooks";
import { setService } from "features/hairServices/hairServiceSlice";

interface ITable {
  tableData: ServiceProps[];
  handleDelete: (id: string) => void;
  handleUpdateDrawerOpen: () => void;
}

const tableHeaders = [
  "Service Name",
  "Price",
  "Category",
  "Created At",
  "Actions",
];

const Table = ({ tableData, handleDelete, handleUpdateDrawerOpen }: ITable) => {
  const dispatch = useAppDispatch();
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full sm:rounded-2xl table">
        <thead className="bg-gray-50 dark:bg-teal-500  table-header-group">
          <tr className="table-row font-mono top-auto gap-2  left-auto  relative">
            {tableHeaders.map((header, index) => (
              <th
                key={`table-header-${index}`}
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
                  whitespace-nowrap
                "
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="px-1 md:px-0 pb-4 table-row-group">
          {tableData?.map((item) => (
            <tr
              key={item.id}
              className="bg-white text-gray-900 dark:text-gray-100 shadow-none dark:bg-gray-700 rounded-none overflow-hidden  mb-2 md:mb-0 border-none table-row"
            >
              <td className="p-2  items-center text-left whitespace-nowrap table-cell gap-2">
                <div className="text-sm font-medium text-ellipsis overflow-hidden">
                  {item.name}
                </div>
              </td>
              <td className="p-2  items-center text-center whitespace-nowrap table-cell gap-2">
                <div className="text-sm font-medium text-ellipsis overflow-hidden">
                  {item?.price?.toFixed(2)}
                </div>
              </td>
              <td className="p-2  items-center text-center whitespace-nowrap table-cell gap-2">
                <div className="text-sm font-medium text-ellipsis overflow-hidden">
                  {item.category}
                </div>
              </td>
              <td className="p-2  items-center text-center whitespace-nowrap table-cell gap-2">
                <div className="text-sm font-medium text-ellipsis overflow-hidden border px-2 drop-shadow-lg rounded-xl text-gray-200 bg-teal-500 border-teal-500">
                  {new Date(item?.createdAt as string).toLocaleDateString()}
                </div>
              </td>
              <td className="p-2  items-center text-center whitespace-nowrap table-cell gap-2">
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
                    onClick={() => {
                      handleUpdateDrawerOpen();
                      dispatch(setService(item));
                    }}
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
                    onClick={() => handleDelete(item.id as string)}
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
    </div>
  );
};

export default Table;
