import Image from "next/image";
import React, { FC } from "react";
import {
  FieldError,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";
import { IFormData } from "../../lib/types";
import Button from "../Button";
import Spinner from "../Spinner";

// ** Image Upload Form Interface**
interface IImageUploadFormProps {
  handleSubmit: UseFormHandleSubmit<Partial<IFormData>>;
  submitHandler: (data: Partial<IFormData>) => void;
  register: UseFormRegister<Partial<IFormData>>;
  errors: {
    image?: FieldError;
  };
  uploading: boolean;
  error: string;
  image: string | null;
}

const ImageUploadForm: FC<IImageUploadFormProps> = ({
  submitHandler,
  handleSubmit,
  register,
  errors,
  uploading,
  error,
  image,
}): JSX.Element => {
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col justify-center items-center"
    >
      <div className="flex ld:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-doted border-gray-300 p-3 w-full h-420">
            {uploading && <Spinner message="Uploading..." />}
            {error && <div className="justify-center">{error}</div>}
            {errors?.image && <div>{errors?.image?.message}</div>}
            {!image ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col items-center justify-center ">
                    <p className="font-bold text-2xl cursor-pointer">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload pictures</p>
                  </div>
                  <p className="mt-16 text-center text-gray-400">
                    Use high-quality JPG, PNG less than 10 MB
                  </p>
                </div>
                <input type="file" {...register("image")} className="w-0 h-0" />
              </label>
            ) : (
              <div
                className="flex justify-center items-center"
                style={{ width: "400px" }}
              >
                <Image
                  src={image}
                  alt="Image of salon client"
                  className="rounded-t-lg"
                  width={400}
                  height={400}
                  quality={50}
                  objectFit="contain"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mb-4 ">
        <Button type="submit" color="dark">
          <FaPlusCircle fontSize={21} className="mr-1" />
          <span>Upload</span>
        </Button>
      </div>
    </form>
  );
};

export default ImageUploadForm;
