import { useState, useEffect, useCallback } from "react";
import { getSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { Session } from "next-auth";
import { Loader, Button } from "@mantine/core";
import { GetServerSidePropsContext } from "next";
import { UserCategory } from "@prisma/client";

// components
import AdminLayout from "Layout/AdminLayout/AdminLayout";
import FormRowInput from "app/components/Forms/FormComponents/FormRowInput";

// redux userApiSlice import
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@app/features/users/userApiSlice";
import { useAppSelector } from "app/global-state/hooks";
import { userSelector } from "@app/features/users/userSlice";

// Server Url
import { NEXT_URL } from "@config/index";
import FormRowSelect from "app/components/Forms/FormComponents/FormRowSelect";
import { UserInfoProps } from "@lib/types";
import FormCheckbox from "app/components/Forms/FormComponents/FormCheckbox";

const UserEditScreen = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const { categoryOptions } = useAppSelector(userSelector);
  const { data: user, isLoading: isLoadingUser } = useGetUserByIdQuery(userId);
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<UserInfoProps>>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      isAdmin: user?.isAdmin,
      category: user?.category,
    },
  });

  useEffect(() => {
    reset({
      name: user?.name,
      email: user?.email,
      isAdmin: user?.isAdmin,
      category: user?.category,
    });
  }, [user]);

  const submitHandler: SubmitHandler<Partial<UserInfoProps>> = useCallback(
    async (data) => {
      const name = data.name as string,
        email = data.email as string,
        isAdmin = data.isAdmin as boolean,
        category = data.category as string;
      try {
        const response = await updateUser({
          id: userId,
          name: name,
          email: email,
          isAdmin: isAdmin,
          category: category as UserCategory,
        }).unwrap();
        if (response.success) toast.success(response.message);
        router.replace(`${NEXT_URL}/admin/users`);
      } catch (error: any) {
        toast.error(error?.message ?? "Error updating user");
      }
    },
    []
  );

  if (isLoadingUser) {
    return (
      <AdminLayout>
        <main className="md:ml-56 h-screen p-2 mx-auto overflow-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
          <div className="flex h-[700px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        </main>
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
      <main className="md:ml-56 h-screen p-2 mx-auto overflow-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
        <section className="px-2 sm:px-4 p-2 rounded shadow-md md:mx-auto ">
          <div className="mt-2">
            <div className="flex items-center justify-between px-2 border-b-2 border-current border-gray-200">
              <div>
                <h1 className="p-5 mt-1 text-4xl font-thin">Edit User</h1>
              </div>
              <Button
                color="dark"
                type="button"
                variant="outline"
                className="bg-gray-900 text-gray-100 hover:bg-gray-800"
              >
                <Link href="/admin/users">
                  <a>Go Back</a>
                </Link>
              </Button>
            </div>
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="px-12 pt-6 pb-8 mx-2 mb-4  rounded sm:mx-auto "
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col items-center rounded-full mb-4">
                  {user?.image && (
                    <Image
                      src={user?.image as string}
                      alt={user?.name as string}
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
                  {user?.isAdmin && (
                    <>
                      <div className="mb-4">
                        <FormRowSelect
                          placeHolder="Category"
                          label="Category"
                          type="category"
                          errors={errors && errors?.category}
                          list={categoryOptions as string[]}
                          {...register("category")}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center pt-4 mb-4 border-t-4 border-current border-gray-200">
                <Button
                  type="submit"
                  color="dark"
                  variant="outline"
                  loading={isLoadingUpdate}
                  className="bg-gray-900 text-gray-100 hover:bg-gray-800"
                  fullWidth
                >
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

  return {
    props: { userId: context.params?.id }, // will be passed to the page component as props
  };
}

export default UserEditScreen;
