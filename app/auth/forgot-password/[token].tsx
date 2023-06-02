import { useCallback } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { GetServerSideProps } from "next";
import { toast } from "react-toastify";

// Components
import Layout from "../../../Layout/MainLayout/Layout";
import ChangePasswordForm from "../../components/Forms/ChangePasswordForm";

import { prisma } from "../../../lib/prisma-db";
import { Session } from "next-auth";
import { useResetCredentialsWithTokenMutation } from "@app/features/users/userApiSlice";
import { Loader } from "@mantine/core";

const url =
  "https://res.cloudinary.com/dtkjg8f0n/image/upload/ar_16:9,c_fill,e_sharpen,g_auto,w_1000/v1625089267/blooms_hair_products/shari-sirotnak-oM5YoMhTf8E-unsplash_rcpxsj.webp";

type Inputs = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword({
  valid,
  token,
}: {
  valid: boolean;
  token: string;
}) {
  const router = useRouter();
  const [resetCredentialsWithToken, { isLoading }] =
    useResetCredentialsWithTokenMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const submitHandler: SubmitHandler<Inputs> = useCallback(
    async ({ password, confirmPassword }) => {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match. please check your password");
      }
      try {
        const response = await resetCredentialsWithToken({
          password,
          token,
        }).unwrap();
        if (response.success) toast.success(response.message);
        router.replace("/auth/signin");
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    []
  );

  if (!valid) {
    return (
      <Layout title="Reset Password">
        <main className="h-screen text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-center ">
            <h1 className="my-5 text-6xl ">Invalid Link</h1>
            <p className="mb-5 text-2xl text-gray-500">
              It looks like you may have clicked on an invalid link. Please
              close this window and try again.
            </p>

            <div className="flex flex-row justify-center py-3 text-lg">
              <p className="mr-2">Return to</p>{" "}
              <Link href={"/auth/signin"}>
                <a className="text-blue-500">Login</a>
              </Link>
            </div>
          </div>
        </main>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <main className="h-screen text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
          <div className="flex flex-col w-full h-screen md:flex-row">
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
                <ChangePasswordForm
                  submitHandler={submitHandler}
                  errors={errors}
                  handleSubmit={handleSubmit}
                  register={register}
                  isLoading={isLoading}
                />
                <div className="flex flex-row justify-center py-3 text-lg">
                  <p className="mr-2">Return to</p>{" "}
                  <Link href={"/auth/signin"}>
                    <a className="text-blue-500">Login</a>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </main>
      </Layout>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req;
  const session: Session = (await getSession({ req })) as Session;

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const tokenDoc = await prisma.token.findUnique({
    where: { token: context.params?.token as string },
  });
  await prisma.$disconnect();
  if (!tokenDoc) return { props: { valid: false } };

  return { props: { token: context.params?.token, valid: true } };
};
