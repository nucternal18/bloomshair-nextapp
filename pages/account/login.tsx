import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import cookie from "cookie";
import { GetServerSideProps } from "next";

// Components
import Spinner from "../../components/Spinner";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import Notification from "../../components/notification/notification";
import Layout from "../../components/Layout";

import { authContext } from "../../context/AuthContext";
const url =
  "https://res.cloudinary.com/dtkjg8f0n/image/upload/ar_16:9,c_fill,e_sharpen,g_auto,w_1000/v1625089267/blooms_hair_products/shari-sirotnak-oM5YoMhTf8E-unsplash_rcpxsj.webp";

export default function Login() {
  const { loading, login, error, requestStatus, setError } =
    useContext(authContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 5
    ) {
      setError("Invalid input - password must be at least 5 characters");
      return;
    }
    //dispatch login
    login(email, password);
  };

  let notification;

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: error,
    };
  }
  return (
    <Layout>
      <main className="h-screen bg-gray-200">
        <div className="z-0 flex flex-col w-full h-screen md:flex-row">
          <div className="relative hidden transform md:left-0 md:block md:top-0 md:bottom-0 md:overflow-y-auto md:w-8/12">
            <div style={{ width: "100%", height: "100%" }}>
              <Image
                src={url}
                alt="by Lauren Fleischmann"
                layout="fill"
                quality={75}
                objectFit="cover"
              />
            </div>
          </div>
          <section className="right-0 z-50 flex items-center justify-center py-8 md:w-4/12">
            <div className="w-full px-4">
              {loading ? (
                <Spinner />
              ) : (
                <form
                  onSubmit={submitHandler}
                  className="px-2 pt-6 pb-8 mx-2 mb-4 bg-transparent "
                >
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-base font-bold text-gray-700"
                    >
                      Email Address
                    </label>
                    <input
                      className="z-0 w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none "
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
                  {error && (
                    <ErrorMessage variant="danger">{error}</ErrorMessage>
                  )}
                  <Button type="submit" color="dark">
                    Sign In
                  </Button>
                </form>
              )}
              <div className="flex flex-row justify-center py-3 text-lg">
                <p className="mr-2">New Customer?</p>{" "}
                <Link href={"/account/register"}>
                  <a className="text-blue-500">Register</a>
                </Link>
              </div>
            </div>
            {notification && (
              <Notification
                status={notification.status}
                title={notification.title}
                message={notification.message}
              />
            )}
          </section>
        </div>
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = cookie.parse(context.req.headers.cookie || "");

  if (token) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
};
