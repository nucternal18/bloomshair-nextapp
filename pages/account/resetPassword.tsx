import { useContext, useEffect } from "react";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { GetServerSideProps } from "next";
import { toast } from "react-toastify";
import Token from "../../models/tokenModel";

// Components
import Spinner from "../../components/Spinner";
import Layout from "../../components/Layout/Layout";

import { useAuth } from "../../context/auth/AuthContext";
import ChangePasswordForm from "../../components/Forms/ChangePasswordForm";
import db from "../../lib/db";

const url =
  "https://res.cloudinary.com/dtkjg8f0n/image/upload/ar_16:9,c_fill,e_sharpen,g_auto,w_1000/v1625089267/blooms_hair_products/shari-sirotnak-oM5YoMhTf8E-unsplash_rcpxsj.webp";

type Inputs = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword({ valid, token }) {
  const router = useRouter();
  const { state, resetPassword } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.replace("/account/login");
    }
  }, [state.success]);

  const submitHandler: SubmitHandler<Inputs> = async ({
    password,
    confirmPassword,
  }) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match. please check your password");
    }
    resetPassword(password, token);
  };

  if (!valid) {
    return (
      <Layout>
        <main className="h-screen bg-gray-200">
          <div className="flex items-center justify-center ">
            <h1 className="my-5 text-6xl text-gray-800">Invalid Link</h1>
            <p className="mb-5 text-2xl text-gray-500">
              It looks like you may have clicked on an invalid link. Please
              close this window and try again.
            </p>

            <div className="flex flex-row justify-center py-3 text-lg">
              <p className="mr-2">Return to</p>{" "}
              <Link href={"/account/login"}>
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
        <main className="h-screen bg-gray-200">
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
                {state.loading ? (
                  <Spinner className="w-12 h-12" />
                ) : (
                  <ChangePasswordForm
                    submitHandler={submitHandler}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    register={register}
                  />
                )}
                <div className="flex flex-row justify-center py-3 text-lg">
                  <p className="mr-2">Return to</p>{" "}
                  <Link href={"/account/login"}>
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
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  await db.connectDB();

  const tokenDoc = await Token.findOne({
    token: context.params?.token,
    type: "passwordReset",
  });
  await db.disconnect();

  return { props: { token: context.params?.token, valid: !!tokenDoc } };
};
