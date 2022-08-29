import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ProductProps } from "../../../lib/types";

interface IProductTable {
  deleteHandler: (slug: string, id: string) => void;
  tableData: ProductProps[];
}

const Table = ({ tableData, deleteHandler }: IProductTable) => {
  return (
    <table className="w-full sm:drop-shadow-2xl sm:rounded-2xl md:table">
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
            Price
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
            Category
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
            Brand
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
            Count In Stock
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
        {tableData?.map((item) => (
          <tr
            key={item.id}
            className="bg-white text-gray-900 dark:text-gray-100 shadow-2xl md:shadow-none dark:bg-gray-700 rounded md:rounded-none overflow-hidden  mb-2 md:mb-0 md:border-none block md:table-row"
          >
            <td className="p-2 flex items-center text-left whitespace-nowrap md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                Image
              </span>
              <div className="flex items-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="rounded-sm"
                  objectFit="cover"
                />
              </div>
            </td>
            <td className="p-2 flex items-center text-left whitespace-nowrap md:table-cell gap-2">
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
                Price
              </span>
              <div className="flex items-center justify-center">
                <div className="text-sm font-medium text-ellipsis overflow-hidden">
                  {item.price.toFixed(2)}
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
                Brand
              </span>
              <div className="flex items-center justify-center">
                <div className="text-sm font-medium text-ellipsis overflow-hidden">
                  {item.brand}
                </div>
              </div>
            </td>
            <td className="p-2 flex items-center sm:text-center whitespace-nowrap md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden font-bold text-teal-500 font-mono">
                Count In Stock
              </span>
              <div className="flex items-center justify-center">
                <div className="text-sm font-medium text-ellipsis overflow-hidden">
                  {item.countInStock}
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
                  <button type="button" className="text-blue-600 text-md">
                    <Link href={`/admin/products/${item.slug}`}>
                      <a>
                        <FaEdit
                          fontSize={18}
                          className="drop-shadow-md transition ease-in-out delay-150 hover:text-indigo-500 hover:-translate-y-1 hover:scale-110  duration-300"
                        />
                      </a>
                    </Link>
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
                    onClick={() => deleteHandler(item.slug, item.id)}
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
