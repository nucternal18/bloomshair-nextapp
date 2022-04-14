import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";

// Components
import Table from "../../../components/Tables/GalleryTable";
import Spinner from "../../../components/Spinner";
import ErrorMessage from "../../../components/ErrorMessage";
import AdminLayout from "../../../components/Layout/AdminLayout/AdminLayout";
import { ImageUploadForm } from "../../../components/Forms";

// Context
import { ActionType, useGallery } from "../../../context/GalleryContext";

// Server Url
import { NEXT_URL } from "../../../config";

// utils
import { getUser } from "../../../lib/getUser";
import Button from "../../../components/Button";

const GalleryAdminPage = ({ pictures, isLoading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const {
    deletePicture,
    uploadGalleryImage,
    createPicture,
    dispatch,
    state: { uploading, error, success, message, image },
  } = useGallery();
  const [isRefreshing, setIsRefreshing] = useState(false);

  /**
   * @description - This function is used to refresh the page after a successful action
   */
  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  useEffect(() => {
    setIsRefreshing(false);
  }, [pictures]);

  const uploadFileHandler = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      uploadGalleryImage(reader.result);
    };
    reader.onerror = () => {
      toast.error("something went wrong!");
    };
  };

  /**
   * @description - This function is used to upload the image to cloudinary
   * @param data
   */
  const submitHandler = async (data) => {
    console.log(data.image[0].name);
    try {
      dispatch({ type: ActionType.GALLERY_IMAGE_UPLOAD_REQUEST });
      if (data.image.length > 0) {
        uploadFileHandler(data.image[0]);
        dispatch({ type: ActionType.GALLERY_IMAGE_UPLOAD_SUCCESS });
      }
    } catch (error) {
      toast.error("something went wrong!" + error.message);
      dispatch({
        type: ActionType.GALLERY_ACTION_FAIL,
        payload: error.message,
      });
    }
  };

  /**
   * @description - This function is used to upload a new picture to the server
   */
  const addImageHandler = () => {
    createPicture(image);
    reset();
    refreshData();
  };

  /**
   * @description - This function is used to delete the image from the server
   * @param id
   */
  const deleteHandler = (id: string) => {
    deletePicture(id);
    refreshData();
  };

  return (
    <AdminLayout>
      <main className="w-full p-2 mx-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
        <section className="container max-w-screen-lg flex flex-col sm:mx-auto">
          <div className=" px-2 pt-6 pb-8 mt-6 mb-4 shadow-2xl w-full">
            <div className="my-6 ">
              <h1 className="p-5 mt-6 mb-4 text-5xl font-thin text-center">
                Upload Pictures
              </h1>
              <p className="mb-2 text-center">Load your latest Pictures</p>
            </div>
            <div>
              <ImageUploadForm
                submitHandler={submitHandler}
                uploading={uploading}
                error={error}
                image={image}
                register={register}
                errors={errors}
                handleSubmit={handleSubmit}
              />
              <div className="flex items-center justify-center px-4 pt-4 mb-4 border-t-2 border-current border-gray-200">
                <Button type="button" color="dark" onClick={addImageHandler}>
                  Add Picture
                </Button>
              </div>
            </div>
          </div>
          <div className="px-2 pt-6 pb-8 mt-6 mb-4   w-full">
            <div className="flex items-center justify-between px-4 mb-4 border-b-2 border-current border-gray-200">
              <div>
                <h1 className="p-5 mt-6 text-4xl font-thin">Pictures</h1>
              </div>
            </div>
            <div>
              {isLoading && <Spinner message="Loading pictures..." />}
              {isRefreshing ? (
                <Spinner message="refreshing..." />
              ) : error ? (
                <ErrorMessage variant="danger">{error}</ErrorMessage>
              ) : (
                <div className="w-full shadow-2xl mx-auto overscroll-auto">
                  <Table tableData={pictures} deleteHandler={deleteHandler} />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </AdminLayout>
  );
};

export async function getServerSideProps(context) {
  const req = context.req;
  const session = await getSession({ req });

  if (!session) {
    // If no token is present redirect user to the login page
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }
  const userData = await getUser(req);

  if (!userData?.isAdmin) {
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
