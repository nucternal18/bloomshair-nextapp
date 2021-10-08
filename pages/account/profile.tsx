import { useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import { GetServerSideProps } from "next";
import { useForm, SubmitHandler } from "react-hook-form";

// Components
import Layout from "../../components/Layout/Layout";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";
import Table from "../../components/OrdersTable";

import UpdateProfileForm from "../../components/Forms/UpdateProfileForm";

// context
import { useAuth } from "../../context/auth/AuthContext";

import { NEXT_URL } from "../../config";
import { toast } from "react-toastify";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Profile({ userData, orders }) {
  const [mounted, setMounted] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const { state, uploadUserImage, updateUserProfile } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    }
  }, [state.success]);

  const submitHandler: SubmitHandler<Inputs> = ({
    name,
    email,
    password,
    confirmPassword,
  }) => {
    const user = {
      id: userData._id,
      name,
      email,
      password,
      image: state.image,
    };
    if (
      !password ||
      password.trim().length < 7 ||
      password !== confirmPassword
    ) {
      toast.error("Invalid input - password must be at least 7 characters");
      return;
    }
    updateUserProfile(user);
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      uploadUserImage(reader.result);
    };
    reader.onerror = () => {
      toast.error("something went wrong!");
    };
  };

  return (
    mounted && (
      <Layout title="Profile">
        <main className="w-full p-4 bg-gray-200 md:mx-auto">
          <section className="container px-2 pt-6 pb-8 mb-4 bg-white rounded shadow-xl md:px-12 md:mx-auto ">
            <div className="mb-6 border-b-4 border-current border-gray-200">
              <h1 className="my-2 text-3xl font-semibold md:text-4xl ">
                Profile
              </h1>
            </div>
            {state.error && (
              <ErrorMessage variant="danger">{state.error}</ErrorMessage>
            )}
            {state.loading ? (
              <Spinner className="w-12 h-12" />
            ) : (
              <div className="flex flex-col items-center justify-around md:flex-row">
                {/* Update user details form */}
                <UpdateProfileForm
                  userData={userData}
                  image={state.image}
                  uploading={state.loading}
                  submitHandler={submitHandler}
                  uploadError={state.error}
                  errors={errors}
                  handleSubmit={handleSubmit}
                  register={register}
                  uploadFileHandler={uploadFileHandler}
                />
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
        </main>
      </Layout>
    )
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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

  // If user has logged in and there is a JWT token present,
  // Fetch user data and order data
  const [userRes, orderRes] = await Promise.all([
    fetch(`${NEXT_URL}/api/users/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: context.req.headers.cookie,
      },
    }),
    fetch(`${NEXT_URL}/api/orders/myOrders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: context.req.headers.cookie,
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
};

export default Profile;
