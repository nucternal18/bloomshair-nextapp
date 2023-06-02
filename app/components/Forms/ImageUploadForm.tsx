import { Loader } from "@mantine/core";
import Image from "next/image";
import React, { FC } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

// ** Image Upload Form Interface**
interface IImageUploadFormProps {
  uploadFileHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
  error?: string | Error | null;
  image: string | null;
}

const ImageUploadForm: FC<IImageUploadFormProps> = ({
  uploadFileHandler,
  uploading,
  error,
  image,
}): JSX.Element => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex ld:flex-row flex-col justify-center items-center bg-white dark:bg-gray-800 lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 w-full">
          {uploading ? (
            <div className="flex justify-center items-center flex-col border-2 border-doted border-gray-300 p-3 w-full h-[220px]">
              <Loader size="xl" variant="bars" />
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col border-2 border-doted border-gray-300 p-3 w-full h-[220px]">
              {!image ? (
                <label>
                  <div className="flex flex-col items-center justify-center h-full ">
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
                  <input
                    type="file"
                    onChange={uploadFileHandler}
                    className="hidden"
                  />
                </label>
              ) : (
                <div
                  className="flex relative justify-center items-center"
                  style={{ width: "210px" }}
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
          )}
          {error && <div>{error as string}</div>}
        </div>
      </div>
    </div>
  );
};

export default ImageUploadForm;
