import Link from "next/link";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import Layout from "../../components/Layout/Layout";
import { NEXT_URL } from "../../config";
import RequestPasswordResetForm from "../../components/Forms/RequestPasswordResetForm";

type Inputs = {
  email: string;
};

function RequestResetPassword() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const submitHandler: SubmitHandler<Inputs> = async ({ email }) => {
    try {
      await fetch(`${NEXT_URL}/api/auth/request-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
        }),
      });
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <Layout title="Forgot password">
      <main className="py-10">
        <div className="mx-auto max-w-screen-sm my-10">
          <div className="flex flex-col items-center justify-center w-full">
            <h1 className="my-5 text-2xl sm:text-5xl text-gray-800">
              Forgot password
            </h1>
            <p className="mb-5 text-center sm:text-xl text-gray-500">
              Enter the email address associated with your account, and
              we&apos;ll send you a link to reset your password.
            </p>
          </div>
          <RequestPasswordResetForm
            submitHandler={submitHandler}
            errors={errors}
            handleSubmit={handleSubmit}
            register={register}
          />
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
}

export default RequestResetPassword;
