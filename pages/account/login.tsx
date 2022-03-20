import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

// Components
import Layout from "../../components/Layout/Layout/Layout";

// Context
import { useAuth, ActionType } from "../../context/auth/AuthContext";

import LoginForm from "../../components/Forms/LoginForm";
const url =
  "https://res.cloudinary.com/dtkjg8f0n/image/upload/ar_16:9,c_fill,e_sharpen,g_auto,w_1000/v1625089267/blooms_hair_products/shari-sirotnak-oM5YoMhTf8E-unsplash_rcpxsj.webp";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/checkout/shipping

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const { dispatch } = useAuth();

  const submitHandler: SubmitHandler<Inputs> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (result.error) {
      toast.error("Invalid email or password");
    }
    if (result.ok && redirect === "/checkout") {
      router.push("/checkout");
    }
    if (result.ok) {
      const session = await getSession();
      dispatch({
        type: ActionType.USER_PROFILE_LOAD_SUCCESS,
        payload: session.user,
      });
      router.push("/");
    }
  };

  return (
    <Layout title="Login Page">
      <main className="h-screen text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
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
          <section className="right-0 flex items-center justify-center py-8 md:w-4/12">
            <div className="w-full px-4">
              <LoginForm
                submitHandler={submitHandler}
                handleSubmit={handleSubmit}
                register={register}
                errors={errors}
              />
              <div className="flex flex-row justify-center py-3 text-lg">
                <p className="mr-2">New Customer?</p>{" "}
                <Link href={"/account/register"}>
                  <a className="text-blue-500">Register</a>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
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

  return {
    props: {}, // will be passed to the page component as props
  };
};
