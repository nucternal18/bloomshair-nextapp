import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ProductProps } from "../../../lib/types";
import { useAppDispatch } from "../../../app/hooks";
import { setProduct } from "../../../features/products/productSlice";

interface IProductTable {
  tableData: ProductProps[];
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const tableHeader = [
  "Image",
  "Name",
  "Price",
  "Category",
  "Brand",
  "Count In Stock",
  "Actions",
];

const Table = ({ tableData, setOpenModal }: IProductTable) => {
  const dispatch = useAppDispatch();
  return (
    <div className="shadow-md rounded-sm overflow-x-auto">
      <table className="w-full table">
        <thead className="bg-gray-50 dark:bg-teal-500 table-header-group">
          <tr className="table-row  font-mono top-auto gap-2 left-auto  relative">
            {tableHeader.map((header, index) => (
              <th
                key={`table-header-${index}`}
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
                  whitespace-nowrap
                "
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="px-0 pb-4 table-row-group">
          {tableData?.map((item) => (
            <tr
              key={item.id}
              className="bg-white text-gray-900 dark:text-gray-100  shadow-none dark:bg-gray-700  overflow-hidden  mb-0 border-none table-row"
            >
              <td className="p-2 whitespace-nowrap table-cell gap-2">
                <div className="flex items-center justify-center">
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
              <td className="p-2 text-left whitespace-nowrap table-cell gap-2">
                <div className="flex items-center justify-start sm:justify-center">
                  <div className="text-sm font-medium text-ellipsis overflow-hidden">
                    {item.name}
                  </div>
                </div>
              </td>
              <td className="p-2 sm:text-center whitespace-nowrap table-cell gap-2">
                <div className="flex items-center justify-center">
                  <div className="text-sm font-medium text-ellipsis overflow-hidden">
                    {item.price.toFixed(2)}
                  </div>
                </div>
              </td>
              <td className="p-2 sm:text-center whitespace-nowrap table-cell gap-2">
                <div className="flex items-center justify-center">
                  <div className="text-sm font-medium text-ellipsis overflow-hidden">
                    {item.category}
                  </div>
                </div>
              </td>
              <td className="p-2 sm:text-center whitespace-nowrap table-cell gap-2">
                <div className="flex items-center justify-center">
                  <div className="text-sm font-medium text-ellipsis overflow-hidden">
                    {item.brand}
                  </div>
                </div>
              </td>
              <td className="p-2 sm:text-center whitespace-nowrap table-cell gap-2">
                <div className="flex items-center justify-center">
                  <div className="text-sm font-medium text-ellipsis overflow-hidden">
                    {item.countInStock}
                  </div>
                </div>
              </td>
              <td className="p-2 text-left whitespace-nowrap table-cell gap-2">
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
                      onClick={() => {
                        dispatch(setProduct(item));
                        setOpenModal(true);
                      }}
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
    </div>
  );
};

export default Table;
