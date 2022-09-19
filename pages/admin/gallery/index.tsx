import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { Session } from "next-auth";

// Components
import Table from "@components/Tables/GalleryTable";
import ErrorMessage from "@components/ErrorMessage";
import AdminLayout from "../../../Layout/AdminLayout/AdminLayout";
import { ImageUploadForm } from "@components/Forms";
import { GetServerSidePropsContext } from "next";

// Context
import { ActionType, useGallery } from "@context/GalleryContext";

// Server Url
import { NEXT_URL } from "@config/index";

// utils
import Button from "@components/Button";
import { GalleryProps } from "@lib/types";
import useHasMounted from "@hooks/useHasMounted";
import { Loader } from "@mantine/core";

const GalleryAdminPage = ({
  pictures,
  isLoading,
}: {
  pictures: GalleryProps[];
  isLoading: string;
}) => {
  const router = useRouter();
  const {
    deletePicture,
    uploadGalleryImage,
    createPicture,
    dispatch,
    state: { uploading, error, success, message, image },
  } = useGallery();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const hasMounted = useHasMounted();

  /**
   * @description - This function is used to refresh the page after a successful action
   */
  const refreshData = () => {
    router.reload();
    setIsRefreshing(true);
  };

  useEffect(() => {
    setIsRefreshing(false);
  }, [pictures]);

  /**
   * @description - This function is used to upload the image to cloudinary
   * @param data
   */
  const uploadFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionType.GALLERY_IMAGE_UPLOAD_REQUEST });
    const file = e.target.files?.[0] as File;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      uploadGalleryImage(reader.result as string | ArrayBuffer);
      dispatch({ type: ActionType.GALLERY_IMAGE_UPLOAD_SUCCESS });
    };
    reader.onerror = () => {
      toast.error("something went wrong!");
    };
  };

  /**
   * @description - This function is used to upload a new picture to the server
   */
  const submitHandler = useCallback(async () => {
    try {
      dispatch({ type: ActionType.GALLERY_IMAGE_UPLOAD_REQUEST });
      createPicture(image as string);
      refreshData();
      dispatch({ type: ActionType.GALLERY_IMAGE_UPLOAD_SUCCESS });
    } catch (error: any) {
      toast.error("something went wrong!" + error.message);
      dispatch({
        type: ActionType.GALLERY_ACTION_FAIL,
        payload: error.message,
      });
    }
  }, [image]);

  /**
   * @description - This function is used to delete the image from the server
   * @param id
   */
  const deleteHandler = useCallback((id: string) => {
    try {
      deletePicture(id);
      refreshData();
    } catch (error: any) {
      toast.error("something went wrong!" + error.message);
      dispatch({
        type: ActionType.GALLERY_ACTION_FAIL,
        payload: error.message,
      });
    }
  }, []);

  return (
    hasMounted && (
      <AdminLayout>
        <main className="md:ml-56 md:px-10 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 py-2 max-w-screen-lg">
          <div className="flex w-full items-center justify-between px-4 py-2 mb-4 border-b-2 border-current border-gray-200">
            <div>
              <h1 className="p-2 text-4xl font-thin">Pictures</h1>
            </div>
          </div>
          <section className="px-2 sm:px-4 grid grid-cols-1 gap-2">
            <div className="col-span-1 p-2 shadow-xl w-full dark:bg-gray-800">
              <div className="my-2 ">
                <h1 className="p-2 mb-2 text-4xl font-thin text-center">
                  Upload Pictures
                </h1>
                <p className=" text-center">Load your latest Pictures</p>
              </div>
              <div className="space-y-2">
                <ImageUploadForm
                  uploadFileHandler={uploadFileHandler}
                  uploading={uploading}
                  error={error}
                  image={image}
                />
                <div className="flex items-center justify-center p-2 border-t-2 border-current border-gray-200">
                  <Button type="button" color="dark" onClick={submitHandler}>
                    Add Picture
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-span-1  w-full">
              {isRefreshing ? (
                <div className="w-full flex items-center justify-center h-[300px]">
                  <Loader size="xl" variant="bars" />
                </div>
              ) : error ? (
                <ErrorMessage variant="danger">{error}</ErrorMessage>
              ) : (
                <div className="w-full shadow-2xl mx-auto overscroll-auto">
                  <Table tableData={pictures} deleteHandler={deleteHandler} />
                </div>
              )}
            </div>
          </section>
        </main>
      </AdminLayout>
    )
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const req = context.req;
  const session: Session = (await getSession({ req })) as Session;

  if (!session) {
    // If no token is present redirect user to the login page
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  if (!session.user?.isAdmin) {
    return {
      redirect: {
        destination: "/not-authorized",
        permanent: false,
      },
    };
  }
  const res = await fetch(`${NEXT_URL}/api/gallery`);
  const data = await res.json();

  return {
    props: { pictures: data, isLoading: data ? false : true }, // will be passed to the page component as props
  };
}

export default GalleryAdminPage;
