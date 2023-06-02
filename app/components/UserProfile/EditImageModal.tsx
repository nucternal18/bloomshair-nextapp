"use client";
import React, { useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Loader, Modal } from "@mantine/core";
import { toast } from "react-toastify";
import Image from "next/image";
import { AiOutlineCloudUpload } from "react-icons/ai";

import { UserInfoProps } from "@lib/types";

import {
  useUpdateUserMutation,
  useUploadUserImageMutation,
} from "@app/features/users/userApiSlice";
import { useAppSelector } from "app/global-state/hooks";
import { userSelector } from "@app/features/users/userSlice";

type EditImageProps = {
  imageFile: FileList;
};

const EditImageModal = ({
  opened,
  setOpened,
  refetch,
  user,
}: {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  user: Partial<UserInfoProps>;
}) => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const [uploadUserImage, { isLoading: isLoadingUpload }] =
    useUploadUserImageMutation();
  const { image } = useAppSelector(userSelector);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditImageProps>();

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      uploadUserImage(reader.result);
    };
    reader.onerror = () => {
      toast.error("something went wrong!");
    };
  };

  const submitHandler: SubmitHandler<EditImageProps> = useCallback(
    async (data) => {
      const updatedImg = {
        id: user?.id,
        image: image,
      };
      try {
        const response = await updateUser(updatedImg).unwrap();
        if (response.success)
          toast.success(
            response.message ?? "Profile image updated successfully",
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        setOpened(false);
        refetch();
      } catch (error) {
        toast.error("Something went wrong! Unable to upload Image", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    },
    [image]
  );
  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="Edit Image">
      <form
        className="flex h-full w-full flex-col space-y-2"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex w-full flex-col items-center justify-center bg-slate-50 p-3 lg:flex-row  ">
          <div className="flex h-full w-full cursor-pointer items-center justify-center border-2 border-gray-200 p-2">
            <div className="flex h-full w-full cursor-pointer flex-col border-4 border-dashed hover:border-gray-300 hover:bg-gray-100">
              {isLoadingUpload ? (
                <div className="flex h-[200px] items-center justify-center">
                  <Loader size="xl" variant="bars" />
                </div>
              ) : !image ? (
                <label htmlFor="main-image" className="cursor-pointer">
                  <div className="flex h-full flex-col items-center justify-center px-6 py-8">
                    <div className="flex flex-col items-center justify-center ">
                      <p className="cursor-pointer text-2xl font-bold">
                        <AiOutlineCloudUpload />
                      </p>
                      <p className="text-lg">Click to upload pictures</p>
                    </div>
                    <p className=" text-center text-gray-400">
                      Use high-quality JPG, PNG less than 10 MB
                    </p>
                  </div>
                  <input
                    id="main-image"
                    aria-label="main-image"
                    type="file"
                    {...register("imageFile", {
                      onChange: (e) => uploadFileHandler(e),
                    })}
                    className="h-0 w-0"
                  />
                </label>
              ) : (
                <div className="flex items-center justify-center">
                  <Image
                    src={image}
                    alt="Image preview"
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
        <div>
          {errors.imageFile && (
            <p className="text-red-500">{errors.imageFile?.message}</p>
          )}
        </div>
        <div className="w-full space-y-2">
          <Button
            type="submit"
            fullWidth
            disabled={isLoadingUpdate}
            className="w-full bg-blue-500"
            loading={isLoadingUpdate}
          >
            Submit
          </Button>
          <Button
            type="button"
            fullWidth
            className="w-full bg-red-500 capitalize hover:bg-red-600"
            onClick={() => {
              setOpened(false);
            }}
          >
            cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditImageModal;
