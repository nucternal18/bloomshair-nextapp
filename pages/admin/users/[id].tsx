import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Spinner from "../../../components/Spinner";
import ErrorMessage from "../../../components/ErrorMessage";
import AdminLayout from "../../../components/Layout/AdminLayout/AdminLayout";
import Button from "../../../components/Button";

// context
import { useAuth } from "../../../context/auth/AuthContext";

// Get user to confirm if admin
import { getUser } from "../../../lib/getUser";

// Server Url
import { NEXT_URL } from "../../../config";
import { toast } from "react-toastify";

const UserEditScreen = (props) => {
  const router = useRouter();
  const { state, editUser } = useAuth();

  const [name, setName] = useState(props.user.name);
  const [email, setEmail] = useState(props.user.email);
  const [isAdmin, setIsAdmin] = useState(props.user.isAdmin);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/admin/users");
    }
  }, [state.success]);

  const submitHandler = (e) => {
    e.preventDefault();
    const image = state.image;
    editUser(props.userId, image, name, email, isAdmin);
  };
  return (
    <AdminLayout>
      <main className="w-full h-screen p-2 mx-auto overflow-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
        <section className="container px-2 pt-6 pb-8 mx-2 mt-6 mb-4  rounded shadow-xl md:mx-auto ">
          <div className="mt-6">
            <div className="flex items-center justify-between px-2 border-b-4 border-current border-gray-200">
              <div>
                <h1 className="p-5 mt-1 text-5xl font-bold">Edit User</h1>
              </div>
              <Button color="dark" type="button">
                <Link href="/admin/users">
                  <a>Go Back</a>
                </Link>
              </Button>
            </div>
            {state.loading && <Spinner message="loading..." />}
            {state.error && (
              <ErrorMessage variant="danger">{state.error}</ErrorMessage>
            )}
            <form
              onSubmit={submitHandler}
              className="px-12 pt-6 pb-8 mx-2 mb-4  rounded sm:mx-auto "
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col items-center rounded-full mb-4">
                  {state.image ? (
                    <Image
                      src={state.image}
                      alt={name}
                      width={450}
                      height={350}
                    />
                  ) : (
                    <Image
                      src={props.user.image}
                      alt={name}
                      width={450}
                      height={350}
                    />
                  )}
                </div>
                <div className="w-full">
                  <div className="mb-4">
                    <label className="block mb-2 text-base font-bold ">
                      Name
                    </label>
                    <input
                      className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none "
                      type="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-base font-bold ">
                      Email Address
                    </label>
                    <input
                      className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none "
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="checkbox"
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    />
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
        </section>
      </main>
    </AdminLayout>
  );
};

export async function getServerSideProps(context) {
  const req = context.req;
  const { id } = context.params;
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

  const res = await fetch(`${NEXT_URL}/api/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: context.req.headers.cookie,
    },
  });
  const data = await res.json();

  return {
    props: { user: data, userId: id }, // will be passed to the page component as props
  };
}

export default UserEditScreen;
