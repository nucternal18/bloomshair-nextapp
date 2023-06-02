"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { NEXT_URL } from "../../../../config";
import { UserInfoProps } from "../../../../lib/types";

interface IUserTable {
  tableData: UserInfoProps[];
  deleteHandler: (id: string) => void;
}

const Table = ({ tableData, deleteHandler }: IUserTable) => {
  const router = useRouter();

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
            Name
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
            Email
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
            category
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
            Admin
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
            Actions
          </th>
        </tr>
      </thead>
      <tbody className=" block px-1 md:px-0 pb-4  md:table-row-group">
        {tableData?.map((item: Partial<UserInfoProps>) => (
          <tr
            key={item.id}
            className="bg-white text-gray-900 dark:text-gray-100 drop-shadow-xl md:shadow-none dark:bg-gray-800 rounded md:rounded-none overflow-hidden  mb-2 md:mb-0 md:border-none block md:table-row"
          >
            <td className="p-2 flex items-center text-left whitespace-nowrap md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                Image
              </span>
              <div className="flex items-center">
                <Image
                  src={item.image as string}
                  alt={item.name as string}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
            </td>
            <td className="p-2 flex items-center sm:text-center whitespace-nowrap md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                Name
              </span>
              <div className="flex items-center justify-center">
                <div className="text-sm font-medium text-ellipsis overflow-hidden">
                  {item.name}
                </div>
              </div>
            </td>
            <td className="p-2 flex items-center sm:text-center whitespace-nowrap md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                Email
              </span>
              <div className="flex items-center justify-center">
                <div className="text-sm font-medium text-ellipsis overflow-hidden">
                  {item.email}
                </div>
              </div>
            </td>
            <td className="p-2 flex items-center sm:text-center whitespace-nowrap md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                Category
              </span>
              <div className="flex items-center justify-center">
                <div className="text-sm font-medium text-ellipsis overflow-hidden">
                  {item.category}
                </div>
              </div>
            </td>
            <td className="p-2 flex items-center sm:text-center whitespace-nowrap md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                Admin
              </span>
              <div className="flex items-center justify-center">
                <div className="text-sm font-medium text-ellipsis overflow-hidden">
                  {item.isAdmin ? (
                    <FaCheck className="text-green-400" />
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                </div>
              </div>
            </td>
            <td className="p-2 flex items-center text-left whitespace-nowrap md:table-cell gap-2">
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
                    onClick={() =>
                      router.replace(`${NEXT_URL}/admin/users/${item.id}`)
                    }
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
                    onClick={() => deleteHandler(item.id as string)}
                  >
                    <FaTrash
                      fontSize={18}
                      className="drop-shadow-md transition ease-in-out delay-150 hover:text-rose-500 hover:-translate-y-1 hover:scale-110  duration-300"
                    />
                  </button>
                </span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
