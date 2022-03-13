import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

// Components
import Layout from "../../components/Layout/Layout";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";
import Table from "../../components/OrdersTable";
import Button from "../../components/Button";
import UpdateProfileForm from "../../components/Forms/UpdateProfileForm";

// context
import { useAuth } from "../../context/auth/AuthContext";

// utils
import { NEXT_URL } from "../../config";

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
        <main className="w-full p-4 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900  md:mx-auto">
          <section className="container px-2 pt-6 pb-8 mb-4  rounded shadow-xl md:px-12 md:mx-auto ">
            <div className="mb-6 border-b-2 border-current border-gray-200">
              <h1 className="my-2 text-3xl font-thin md:text-4xl ">Profile</h1>
            </div>
            {!userData.emailVerified && (
              <div className="flex items-center justify-between mb-4 border border-gray-800 px-4 py-2">
                <p>
                  <strong>Note:</strong> <span>Your email</span> (
                  <span className="text-blue-500">{userData.email}</span>) is
                  unverified.
                </p>
                <Button type="button" color="primary">
                  Verify
                </Button>
              </div>
            )}
            {state.error && (
              <ErrorMessage variant="danger">{state.error}</ErrorMessage>
            )}
            {state.loading ? (
              <Spinner message="Loading Profile..." />
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
          <section className="container px-2 pt-6 pb-8 mb-4  rounded shadow-xl md:px-12 md:mx-auto ">
            <div className="mb-6 border-b-2 border-current border-gray-200">
              <h1 className="my-2 text-3xl font-thin md:text-4xl ">
                My Orders
              </h1>
            </div>
            {orders && <Table tableData={orders} />}
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

  // if (!ordersData || !userData) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: { userData: userData, orders: ordersData }, // if  will be passed to the page component as props
  };
};

export default Profile;
