import React from "react";
import { Button, Loader } from "@mantine/core";
import Image from "next/image";
import { FaPlusCircle } from "react-icons/fa";
import {
  FieldErrorsImpl,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import { TextEditor } from "..";
import FormRowInput from "@components/Forms/FormComponents/FormRowInput";
import { ProductProps } from "@lib/types";

interface IProductFormProps {
  handleSubmit: UseFormHandleSubmit<ProductProps>;
  submitHandler: SubmitHandler<ProductProps>;
  register: UseFormRegister<ProductProps>;
  errors: FieldErrorsImpl<ProductProps>;
  isLoadingImage: boolean;
  isLoading: boolean;
  image: string;
  product?: ProductProps;
  uploadFileHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | Error | null;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setOpenCreateModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductForm = ({
  handleSubmit,
  submitHandler,
  isLoading,
  isLoadingImage,
  image,
  product,
  uploadFileHandler,
  error,
  errors,
  register,
  value,
  setValue,
}: IProductFormProps) => {
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="w-full px-12 pt-6 pb-8 mx-2 mb-4  sm:mx-auto"
    >
      <div className="flex flex-col items-center justify-around md:flex-row">
        {isLoadingImage ? (
          <div className="w-full h-[500px] flex items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <div className="flex flex-col items-center w-full mb-2">
            {image ? (
              <Image src={image} alt={product?.name} width={450} height={350} />
            ) : (
              <Image
                src={product?.image as string}
                alt={product?.name}
                width={250}
                height={250}
              />
            )}
            <label className="block py-2 my-2 mr-2 text-base font-bold ">
              <FaPlusCircle fontSize={21} className="text-4xl cursor-pointer" />
              <input
                type="file"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>
        )}
        {error && <div className="justify-center">{error as string}</div>}
        <div className="w-full">
          <div className="flex flex-col w-full mb-2">
            <FormRowInput
              type={"name"}
              title={"Name"}
              errors={errors}
              inputType={"text"}
              {...register("name")}
            />
          </div>
          <div className="flex flex-col w-full mb-2">
            <FormRowInput
              type={"slug"}
              title={"Slug"}
              errors={errors}
              inputType={"text"}
              {...register("slug")}
            />
          </div>
          <div className="flex flex-col mb-2">
            <FormRowInput
              type={"price"}
              title={"Price"}
              errors={errors}
              inputType={"text"}
              {...register("price")}
            />
          </div>
          <div className="flex flex-col mb-2">
            <FormRowInput
              type={"brand"}
              title={"Brand"}
              errors={errors}
              inputType={"text"}
              {...register("brand")}
            />
          </div>
          <div className="flex flex-col mb-2">
            <FormRowInput
              type={"category"}
              title={"Category"}
              errors={errors}
              inputType={"text"}
              {...register("category")}
            />
          </div>
          <div className="flex flex-col mb-2">
            <FormRowInput
              type={"weight"}
              title={"Weight"}
              errors={errors}
              inputType={"text"}
              {...register("weight")}
            />
          </div>
          <div className="flex flex-col mb-2">
            <FormRowInput
              type={"countInStock"}
              title={"Count In Stock"}
              errors={errors}
              inputType={"number"}
              {...register("countInStock")}
            />
          </div>
        </div>
      </div>
      <TextEditor value={value} setValue={setValue} />
      <div className="flex items-center justify-center px-4 pt-4 my-4 border-t-2 border-current border-gray-200">
        <Button
          type="submit"
          loading={isLoading}
          fullWidth
          className="w-full rounded-md border border-indigo-900 bg-indigo-900 px-4 py-2 text-white"
        >
          {isLoading ? "Submitting......" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
