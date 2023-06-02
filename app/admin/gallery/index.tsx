import { useCallback } from "react";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
import { Session } from "next-auth";
import { Loader } from "@mantine/core";

// Components
import Table from "app/components/Tables/GalleryTable";
import AdminLayout from "../../../Layout/AdminLayout/AdminLayout";
import { ImageUploadForm } from "app/components/Forms";
import { GetServerSidePropsContext } from "next";
import Button from "app/components/Button";

// redux
import {
  useGetImagesQuery,
  useUploadGalleryImageMutation,
  useDeleteImageMutation,
  useAddImageMutation,
} from "@app/features/gallery/galleryApiSlice";
import { useAppDispatch, useAppSelector } from "app/global-state/hooks";
import { gallerySelector, setImage } from "@app/features/gallery/gallerySlice";

// Server Url
import { NEXT_URL } from "@config/index";

// utils/libs/hooks
import { GalleryProps } from "@lib/types";
import useHasMounted from "@hooks/useHasMounted";

const GalleryAdminPage = () => {
  const hasMounted = useHasMounted();
  const dispatch = useAppDispatch();
  const { data: pictures, isLoading, refetch } = useGetImagesQuery();
  const [uploadImage, { isLoading: isUploading, error }] =
    useUploadGalleryImageMutation();
  const [deleteImage] = useDeleteImageMutation();
  const [addImage] = useAddImageMutation();
  const { image } = useAppSelector(gallerySelector);

  /**
   * @description - This function is used to upload the image to cloudinary
   * @param data
   */
  const uploadFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      await uploadImage(reader.result as string | ArrayBuffer).unwrap();
      toast.success("Image uploaded successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    };
    reader.onerror = () => {
      toast.error("something went wrong!", {
        position: toast.POSITION.TOP_CENTER,
      });
    };
  };

  /**
   * @description - This function is used to upload a new picture to the server
   */
  const submitHandler = useCallback(async () => {
    try {
      const response = await addImage(image as string).unwrap();
      if (response.success) {
        toast.success(response.message ?? "Image added successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        dispatch(setImage(null));
        refetch();
      }
    } catch (error: any) {
      toast.error(
        error.message ?? "Something went wrong! Unable to add image",
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    }
  }, [image]);

  /**
   * @description - This function is used to delete the image from the server
   * @param id
   */
  const deleteHandler = useCallback(async (id: string) => {
    try {
      const response = await deleteImage(id).unwrap();
      if (response.success) {
        toast.success(response.message ?? "Image deleted successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        refetch();
      }
    } catch (error: any) {
      toast.error(error.message ?? "something went wrong!", {
        position: toast.POSITION.TOP_CENTER,
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
                  uploading={isUploading}
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
              {isLoading ? (
                <div className="w-full flex items-center justify-center h-[400px]">
                  <Loader size="xl" variant="bars" />
                </div>
              ) : (
                <div className="w-full shadow-2xl mx-auto overscroll-auto">
                  <Table
                    tableData={pictures as GalleryProps[]}
                    deleteHandler={deleteHandler}
                  />
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
