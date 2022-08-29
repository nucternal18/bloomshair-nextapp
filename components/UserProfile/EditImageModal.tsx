import { UserInfoProps, IFormData } from "@lib/types";
import React, { useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Loader, Modal } from "@mantine/core";
import { toast } from "react-toastify";
import { ActionType, useAuth } from "@context/auth/AuthContext";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Image from "next/image";

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
  const { state, dispatch, uploadUserImage, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditImageProps>();

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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
        image: state?.image,
      };
      try {
        updateUserProfile(updatedImg);
        setOpened(false);
        refetch();
      } catch (error) {
        toast.error("Something went wrong! Unable to upload Image", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    },
    [state?.image]
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
              {state.loading ? (
                <div className="flex h-[200px] items-center justify-center">
                  <Loader size="xl" variant="bars" />
                </div>
              ) : !state.image ? (
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
                    src={state.image}
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
            disabled={state.loading}
            className="w-full bg-blue-500"
            loading={state.loading}
          >
            Submit
          </Button>
          <Button
            type="button"
            fullWidth
            className="w-full bg-red-500 capitalize hover:bg-red-600"
            onClick={() => {
              dispatch({
                type: ActionType.USER_IMAGE_UPLOAD_SUCCESS,
                payload: null,
              });
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
