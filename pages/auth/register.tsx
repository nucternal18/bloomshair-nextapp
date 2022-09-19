import { useCallback, useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { GetServerSideProps } from "next";
import { toast } from "react-toastify";

// Components
import Spinner from "../../components/Spinner";
import Layout from "../../Layout/MainLayout/Layout";
import RegisterForm from "../../components/Forms/RegisterForm";

// redux useAppSlice imports
import { useRegisterUserMutation } from "features/users/userApiSlice";
import useHasMounted from "@hooks/useHasMounted";

const url =
  "https://res.cloudinary.com/dtkjg8f0n/image/upload/ar_16:9,c_fill,e_sharpen,g_auto,w_1000/v1625089267/blooms_hair_products/shari-sirotnak-oM5YoMhTf8E-unsplash_rcpxsj.webp";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const router = useRouter();
  const hasMounted = useHasMounted();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const submitHandler: SubmitHandler<Inputs> = useCallback(
    async ({ name, email, password, confirmPassword }) => {
      if (name === "") {
        toast.error("Please enter a valid name");
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match. please check your password");
      }
      try {
        const response = await registerUser({
          name: name,
          email: email,
          password: password,
        }).unwrap();
        if (response?.success) {
          toast.success(response?.message ?? "Registration successful", {
            position: toast.POSITION.TOP_CENTER,
          });
          router.replace("/auth/signin");
        }
      } catch (error: any) {
        toast.error(error.message ?? "Something went wrong");
      }
    },
    []
  );

  return (
    hasMounted && (
      <Layout title="Register">
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
            <section className="right-0 flex items-center justify-center py-8 md:w-4/12">
              <div className="w-full px-4">
                <RegisterForm
                  submitHandler={submitHandler}
                  errors={errors}
                  handleSubmit={handleSubmit}
                  register={register}
                  buttonName="Register"
                  isLoading={isLoading}
                />
                <div className="flex flex-row justify-center py-3 text-lg">
                  <p className="mr-2">Have account?</p>{" "}
                  <Link href={"/auth/signin"}>
                    <a className="text-blue-500">Login</a>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </main>
      </Layout>
    )
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
