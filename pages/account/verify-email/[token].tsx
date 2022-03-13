import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Layout from "../../../components/Layout/Layout";
import db from "../../../lib/db";
import Token from "../../../models/tokenModel";
import User from "../../../models/userModel";

export default function EmailVerifyPage({ valid }) {
  return (
    <Layout title="Email verification">
      <main className="text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
        <section className="relative flex items-center content-center justify-center h-screen pt-16 pb-32">
          <div className="flex items-center justify-center ">
            <p className="mb-5 text-2xl ">
              {valid
                ? "Thank you for verifying your email address. You may close this page."
                : "It looks like you may have clicked on an invalid link. Please close this window and try again."}
            </p>
          </div>
        </section>
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

  await db.connectDB();

  const deletedToken = await Token.findOneAndDelete({
    token: context.params?.token,
    type: "emailVerify",
  });

  if (!deletedToken) return { props: { valid: false } };

  await User.findByIdAndUpdate(deletedToken.userId, {
    emailVerified: true,
  });

  await db.disconnect();

  return { props: { token: context.params?.token, valid: true } };
};
