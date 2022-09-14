import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { Session } from "next-auth";

// components
import Spinner from "@components/Spinner";
import ErrorMessage from "@components/ErrorMessage";
import AdminLayout from "@components/Layout/AdminLayout/AdminLayout";
import Button from "@components/Button";
import FormRowInput from "@components/Forms/FormComponents/FormRowInput";

// context
import { useAuth } from "@context/auth/AuthContext";

// Get user to confirm if admin
import { getUser } from "@lib/getUser";

// Server Url
import { NEXT_URL } from "@config/index";
import FormRowSelect from "@components/Forms/FormComponents/FormRowSelect";
import { UserInfoProps } from "@lib/types";
import { userInfo } from "os";
import FormCheckbox from "@components/Forms/FormComponents/FormCheckbox";
import { Loader } from "@mantine/core";

const UserEditScreen = ({ user, userId }) => {
  const router = useRouter();
  const { state, editUser } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<UserInfoProps>>({
    defaultValues: {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      category: user.category,
    },
  });

  const submitHandler: SubmitHandler<Partial<UserInfoProps>> = (data) => {
    const image = state.image;
    const name = data.name,
      email = data.email,
      isAdmin = data.isAdmin,
      category = data.category;
    editUser(userId, image, name, email, isAdmin, category);
    router.replace(`${NEXT_URL}/admin/users`);
  };
  return (
    <AdminLayout>
      <main className="w-full h-screen p-2 mx-auto overflow-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
        <section className="px-2 sm:px-4 p-2 rounded shadow-md md:mx-auto ">
          <div className="mt-2">
            <div className="flex items-center justify-between px-2 border-b-2 border-current border-gray-200">
              <div>
                <h1 className="p-5 mt-1 text-4xl font-thin">Edit User</h1>
              </div>
              <Button color="dark" type="button">
                <Link href="/admin/users">
                  <a>Go Back</a>
                </Link>
              </Button>
            </div>

            {state.error && (
              <ErrorMessage variant="danger">{state.error}</ErrorMessage>
            )}
            {state.loading ? (
              <div className="flex h-[700px] items-center justify-center">
                <Loader size="xl" variant="bars" />
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(submitHandler)}
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
                        src={user.image}
                        alt={name}
                        width={450}
                        height={350}
                      />
                    )}
                  </div>
                  <div className="w-full">
                    <div className="mb-4">
                      <FormRowInput
                        title="Name"
                        type="name"
                        inputType="text"
                        errors={errors && errors?.name}
                        {...register("name", {
                          required: "This is required",
                          minLength: {
                            value: 2,
                            message:
                              "Please enter a name with at least 2 characters",
                          },
                          pattern: {
                            value: /^[A-Za-z -]+$/,
                            message: "Please enter a valid name",
                          },
                        })}
                      />
                    </div>
                    <div className="mb-4">
                      <FormRowInput
                        title="Email"
                        type="Email"
                        inputType="email"
                        errors={errors && errors?.email}
                        {...register("email", {
                          required: "This is required",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Please enter a valid email address",
                          },
                        })}
                      />
                    </div>
                    <div className="mb-4">
                      <FormCheckbox
                        label="Is Admin"
                        type="isAdmin"
                        {...register("isAdmin")}
                      />
                    </div>
                    {user.isAdmin && (
                      <>
                        <div className="mb-4">
                          <FormRowSelect
                            name="Category"
                            type="category"
                            errors={errors && errors?.category}
                            list={state?.categoryOptions}
                            {...register("category")}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-center px-4 pt-4 mb-4 border-t-4 border-current border-gray-200">
                  <Button type="submit" color="dark">
                    Update
                  </Button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
    </AdminLayout>
  );
};

export async function getServerSideProps(context) {
  const req = context.req;
  const { id } = context.params;
  const session: Session = await getSession({ req });

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

  if (!session.user?.isAdmin) {
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
