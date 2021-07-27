import { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import cookie from "cookie";
import { GetServerSideProps } from "next";

// Components
import Layout from "../../components/Layout";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";
import Notification from "../../components/notification/notification";
import Table from "../../components/OrdersTable";
import Button from "../../components/Button";

// context
import { authContext } from "../../context/AuthContext";

import { SERVER_URL } from "../../config";
import { FaPlusCircle } from "react-icons/fa";

function Profile({ userData, orders }) {
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {
    loading,
    success,
    error,
    requestStatus,
    image,
    uploading,
    message,
    uploadImage,
    updateUserProfile,
    setError,
  } = useContext(authContext);

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

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("something went wrong!");
    };
  };

  const submitHandler = () => {
    console.log("submitted");
    const user = { id: userData._id, name, email, password, image };
    if (
      !password ||
      password.trim().length < 5 ||
      password !== confirmPassword
    ) {
      setError("Invalid input - password must be at least 5 characters");
      return;
    }
    updateUserProfile(user);
  };
  return (
    <Layout>
      <main className="w-full p-4 bg-gray-200 md:mx-auto">
        <section className="container px-2 pt-6 pb-8 mb-4 bg-white rounded shadow-xl md:px-12 md:mx-auto ">
          <div className="mb-6 border-b-4 border-current border-gray-200">
            <h1 className="my-2 text-3xl font-semibold md:text-4xl ">
              Profile
            </h1>
          </div>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {success && (
            <ErrorMessage variant="success">Profile updated</ErrorMessage>
          )}
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex flex-col items-center justify-around md:flex-row">
              {/* Update user details form */}
              <form
                onSubmit={submitHandler}
                className="w-full px-2 pt-6 pb-8 mb-4 bg-white rounded md:px-12 sm:mx-auto"
              >
                <div className="flex flex-col items-center justify-around mb-4 md:flex-row">
                  <div className="flex flex-col items-center w-full ">
                    {image ? (
                      <Image
                        src={image}
                        alt={name}
                        width={450}
                        height={350}
                        layout="responsive"
                        objectFit="cover"
                      />
                    ) : (
                      <Image
                        src={userData.image}
                        alt={name}
                        width={450}
                        height={350}
                        objectFit="cover"
                      />
                    )}
                    <label className="block py-2 my-2 mr-2 text-base font-bold text-gray-700">
                      <FaPlusCircle className="text-4xl" />
                      <input
                        type="file"
                        onChange={uploadFileHandler}
                        className="hidden"
                      />
                      {uploading && <Spinner />}
                      {error && <div className="justify-center">{error}</div>}
                    </label>
                  </div>
                  <div className="w-full">
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-base font-bold text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none "
                        type="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></input>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-base font-bold text-gray-700"
                      >
                        Email Address
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none "
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-base font-bold text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none "
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></input>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-base font-bold text-gray-700"
                      >
                        Confirm Password
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none "
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center px-4 pt-4 mb-4 border-t-4 border-current border-gray-200">
                  <Button type="submit" color="dark">
                    Update
                  </Button>
                </div>
              </form>
            </div>
          )}
        </section>
        {/* Users orders list table */}
        <section className="container px-2 pt-6 pb-8 mb-4 bg-white rounded shadow-xl md:px-12 md:mx-auto ">
          <div className="mb-6 border-b-4 border-current border-gray-200">
            <h1 className="my-2 text-3xl font-semibold md:text-4xl ">
              My Orders
            </h1>
          </div>
          <Table
            tableData={orders}
            headingColumns={[
              "ID",
              "DATE",
              "TOTAL",
              "PAID",
              "DELIVERED",
              "DETAILS",
            ]}
          />
        </section>
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = cookie.parse(context.req.headers.cookie);
  if (!token) {
    // If no token is present redirect user to the login page
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  if (token) {
    // If user has logged in and there is a JWT token present,
    // Fetch user data and order data
    const [userRes, orderRes] = await Promise.all([
      fetch(`${SERVER_URL}/api/users/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      fetch(`${SERVER_URL}/api/orders/myorders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    const [userData, ordersData] = await Promise.all([
      userRes.json(),
      orderRes.json(),
    ]);

    return {
      props: { userData: userData, orders: ordersData }, // if  will be passed to the page component as props
    };
  }
  return {
    props: {}, // If no token, an empty object will be passed to the page component as props
  };
};

export default Profile;
