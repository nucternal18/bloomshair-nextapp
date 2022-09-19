import React from "react";
import { Modal, Button } from "@mantine/core";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

// lib/utils
import { IProductPageProps, ProductProps } from "@lib/types";

// redux productApiSlice import
import {
  useCreateProductMutation,
  useUploadProdImageMutation,
} from "../../features/products/productApiSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  productSelector,
  setProduct,
  setImage,
} from "../../features/products/productSlice";
// components
import ProductForm from "./ProductForm";

interface ICreateProductModalProps {
  open: boolean;
  handleClose?: () => void;
  setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  refreshData: () => void;
}

const CreateProductModal = ({
  open,
  setOpenCreateModal,
  refreshData,
}: ICreateProductModalProps) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState<string>("");
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [uploadProdImage, { isLoading: isLoadingUploadProdImage }] =
    useUploadProdImageMutation();
  const { image, error } = useAppSelector(productSelector);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductProps>();
  const ALLOWED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];

  const uploadFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    const reader = new FileReader();
    if (ALLOWED_FORMATS.includes(file.type)) reader.readAsDataURL(file);
    reader.onloadend = async () => {
      await uploadProdImage(reader.result);
    };
    reader.onerror = () => {
      toast.error("something went wrong!");
    };
  };

  const submitHandler: SubmitHandler<ProductProps> = React.useCallback(
    async (data) => {
      const newData = { ...data, description: value, image: image as string };
      try {
        await createProduct(newData);
        refreshData();
        reset();
        setValue("");
        setOpenCreateModal(false);
        dispatch(setImage(""));
      } catch (error) {
        toast.error((error as string) ?? "Something went wrong");
      }
    },
    [value, image]
  );
  return (
    <Modal
      centered
      overlayColor="rgba(0, 0, 0, 0.5)"
      overlayOpacity={0.55}
      overlayBlur={3}
      size="2xl"
      opened={open}
      onClose={() => {
        setOpenCreateModal(false);
        dispatch(setImage(""));
      }}
      title="Create Product"
      closeOnClickOutside={false}
    >
      <ProductForm
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        errors={errors}
        error={error as string | Error | null}
        isLoading={isLoading as boolean}
        isLoadingImage={isLoadingUploadProdImage as boolean}
        image={image as string}
        uploadFileHandler={uploadFileHandler}
        register={register}
        value={value}
        setValue={setValue}
        setOpenCreateModal={setOpenCreateModal}
      />
    </Modal>
  );
};

export default CreateProductModal;
