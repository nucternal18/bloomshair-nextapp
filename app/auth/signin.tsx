import { signIn, getSession, useSession, getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

// Components
import Layout from "../../Layout/MainLayout/Layout";
import LoginForm from "../components/Forms/LoginForm";
import { Button, Loader } from "@mantine/core";
import useHasMounted from "@hooks/useHasMounted";

const url =
  "https://res.cloudinary.com/dtkjg8f0n/image/upload/ar_16:9,c_fill,e_sharpen,g_auto,w_1000/v1625089267/blooms_hair_products/shari-sirotnak-oM5YoMhTf8E-unsplash_rcpxsj.webp";

type Inputs = {
  email: string;
  password: string;
};

const provider = [{ name: "google", Icon: FcGoogle }];

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { redirect } = router.query;
  const { status } = useSession();
  const loading = status === "loading";
  const hasMounted = useHasMounted();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const handleOAuthSignIn = async (provider: string) =>
    await signIn(provider, { redirect: false });

  const submitHandler: SubmitHandler<Inputs> = async (data) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
    });
    if (result?.error) {
      toast.error("Invalid email or password");
    }
    if (result?.ok && redirect === "/checkout") {
      router.replace("/checkout");
    }
    if (result?.ok) {
      router.replace("/");
    }
  };

  return (
    hasMounted && (
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
                  csrfToken={csrfToken}
                />
                <div>
                  <span className=""></span>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    OR
                  </p>
                </div>
                <div className="flex items-center justify-center mt-4">
                  {provider.map(({ name, Icon }) => (
                    <Button
                      key={name}
                      leftIcon={<Icon fontSize={20} />}
                      onClick={() => handleOAuthSignIn(name)}
                      variant="outline"
                      color="gray"
                      size="lg"
                      className="mx-2 uppercase"
                      fullWidth
                    >
                      SIGN IN WITH {name}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-row justify-center py-3 text-lg">
                  <p className="mr-2">New Customer?</p>{" "}
                  <Link href={"/auth/register"}>
                    <a className="text-blue-500">Register</a>
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
  const csrfToken = await getCsrfToken(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken,
    }, // will be passed to the page component as props
  };
};
