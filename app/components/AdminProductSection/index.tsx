"use client";
import { useState, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Loader } from "@mantine/core";

// Components
import Paginate from "app/components/Paginate";
import Button from "app/components/Button";
import Table from "app/components/Tables/ProductTable";
import { HandleDeleteModal } from "app/components/index";

// utils
import { ProductProps } from "@lib/types";
import CreateProductModal from "./CreateProductModal";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../global-state/features/products/productApiSlice";
import { useAppSelector, useAppDispatch } from "../../global-state/hooks";
import {
  productSelector,
  setProduct,
} from "../../global-state/features/products/productSlice";

const AdminProductSection = () => {
  const router = useRouter();
  const { page, product } = useAppSelector(productSelector);
  const dispatch = useAppDispatch();
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const keyword: string = "";

  const {
    data: productData,
    isLoading: isLoadingProduct,
    isError: isProductError,
    error: productError,
    refetch,
  } = useGetProductsQuery({ page, keyword });

  const [
    deleteProduct,
    {
      isLoading: isLoadingDeleteProduct,
      isError: isDeleteProductError,
      error: deleteProductError,
    },
  ] = useDeleteProductMutation();

  const refreshData = () => {
    refetch();
  };

  /**
   * @description - map through the products and return the required data
   * @param {array} products - array of products
   */
  const data = productData?.products?.map((row: Partial<ProductProps>) => {
    return {
      id: row["id"],
      image: row["image"],
      name: row["name"],
      price: row["price"],
      category: row["category"],
      brand: row["brand"],
      countInStock: row["countInStock"],
      slug: row["slug"],
    };
  });
  // function to handle closing the delete modal
  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
    dispatch(setProduct(null));
  };

  /**
   * @description - function to delete a product
   * @param id
   */
  const deleteHandler = useCallback(async (data: ProductProps) => {
    const slug = data.slug as string;
    const id = data.id;
    try {
      await deleteProduct({ slug, id });
      refreshData();
      handleDeleteModalClose();
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error((error as string) ?? "Something went wrong");
    }
  }, []);

  // function to create a product

  if (isLoadingProduct) {
    <section className="px-2 sm:px-4 pt-6 pb-8 mt-6 mb-4  md:mx-auto ">
      <div className="flex items-center justify-between mb-6 border-b-2 border-current border-gray-200">
        <div>
          <h1 className="p-3 text-4xl font-thin md:p-5 md:text-5xl">
            Products
          </h1>
        </div>
        <div className="text-sm ">
          <Button
            color="dark"
            type="button"
            onClick={() => setOpenCreateModal(true)}
          >
            <FaPlus className="mr-1" /> Create Product
          </Button>
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    </section>;
  }

  return (
    <>
      <section className="px-2 sm:px-4 pt-6 pb-8 mt-6 mb-4  md:mx-auto ">
        <div className="flex items-center justify-between mb-6 border-b-2 border-current border-gray-200">
          <div>
            <h1 className="p-3 text-4xl font-thin md:p-5 md:text-5xl">
              Products
            </h1>
          </div>
          <div className="text-sm ">
            <Button
              color="dark"
              type="button"
              onClick={() => setOpenCreateModal(true)}
            >
              <FaPlus className="mr-1" /> Create Product
            </Button>
          </div>
        </div>
        <div className="mb-4">
          <Table
            tableData={data as ProductProps[]}
            setOpenModal={setOpenDeleteModal}
          />
        </div>
        <Paginate
          numberOfPages={productData?.pages as number}
          router={router}
        />
      </section>
      <HandleDeleteModal
        open={openDeleteModal}
        handleClose={handleDeleteModalClose}
        deleteHandler={deleteHandler}
        data={product}
        isLoading={isLoadingDeleteProduct as boolean}
      />
      <CreateProductModal
        open={openCreateModal}
        refreshData={refreshData}
        setOpenCreateModal={setOpenCreateModal}
      />
    </>
  );
};

export default AdminProductSection;
