import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaPlusCircle } from "react-icons/fa";
import { getSession } from "next-auth/react";

// Components
import Table from "../../../components/Tables/GalleryTable";
import Notification from "../../../components/notification/notification";
import Spinner from "../../../components/Spinner";
import ErrorMessage from "../../../components/ErrorMessage";
import AdminLayout from "../../../components/Layout/AdminLayout/AdminLayout";
import Button from "../../../components/Button";

// Context
import { GalleryContext } from "../../../context/GalleryContext";

// Server Url
import { NEXT_URL } from "../../../config";

// utils
import { getUser } from "../../../lib/getUser";
import { toast } from "react-toastify";

const GalleryListScreen = (props) => {
  const { pictures } = props;
  const router = useRouter();
  const {
    deletePicture,
    uploadGalleryImage,
    createPicture,
    error,
    uploading,
    image,
    message,
    requestStatus,
  } = useContext(GalleryContext);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setIsRefreshing(false);
  }, [pictures]);

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      uploadGalleryImage(reader.result);
    };
    reader.onerror = () => {
      toast.error("something went wrong!");
    };
  };
  const submitHandler = (e) => {
    e.preventDefault();

    createPicture(image.url);
    router.reload();
  };
  const deleteHandler = (id) => {
    deletePicture(id);
    router.reload();
  };

  let notification;
  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: message,
    };
  }
  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: error,
    };
  }
  return (
    <AdminLayout>
      <main className="w-full p-2 mx-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
        <section className="flex flex-col ">
          <div className="container px-2 pt-6 pb-8 mt-6 mb-4 shadow-2xl md:mx-auto">
            <div className="my-6 ">
              <h1 className="p-5 mt-6 mb-4 text-5xl font-bold text-center">
                Pictures
              </h1>
              <p className="mb-2 text-center">Load your latest Pictures</p>
            </div>
            <div>
              <form
                onSubmit={submitHandler}
                className="flex flex-col justify-center px-2 py-2 mx-2 my-2 bg-transparent"
              >
                <div className="mb-4">
                  <label className="flex justify-center mb-2 mr-2 text-base font-bold text-gray-700">
                    <FaPlusCircle className="text-4xl" />
                    <input
                      type="file"
                      onChange={uploadFileHandler}
                      className="hidden"
                    />
                    {uploading && <Spinner message="Uploading..." />}
                    {error && <div className="justify-center">{error}</div>}
                  </label>
                </div>
                <div className="flex justify-center">
                  {image && (
                    <Image src={image.url} alt="" width={100} height={100} />
                  )}
                </div>
                <div className="flex items-center justify-center px-4 pt-4 mb-4 border-t-4 border-current border-gray-200">
                  <Button type="submit" color="dark">
                    Add Picture
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="container px-2 pt-6 pb-8 mt-6 mb-4  shadow-2xl md:mx-auto">
            <div className="flex items-center justify-between px-4 mb-4 border-b-4 border-current border-gray-200">
              <div>
                <h1 className="p-5 mt-6 text-5xl font-bold">Pictures</h1>
              </div>
            </div>
            <div>
              {isRefreshing ? (
                <Spinner message="refreshing..." />
              ) : error ? (
                <ErrorMessage variant="danger">{error}</ErrorMessage>
              ) : (
                <div className="w-full mx-auto overscroll-auto">
                  <Table
                    tableData={pictures}
                    headingColumns={["ID", "IMAGE", "CREATED AT", "ACTIONS"]}
                    deleteHandler={deleteHandler}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
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
    props: { pictures: data }, // will be passed to the page component as props
  };
}

export default GalleryListScreen;
