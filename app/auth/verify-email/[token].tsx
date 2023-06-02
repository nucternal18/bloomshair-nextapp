import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

import Layout from "../../../Layout/MainLayout/Layout";

const prisma = new PrismaClient();

export default function EmailVerifyPage({ valid }: { valid: boolean }) {
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

  const deletedToken = await prisma.token.delete({
    where: {
      token: context.params?.token as string,
    },
  });

  if (!deletedToken) return { props: { valid: false } };

  await prisma.user.update({
    where: { id: deletedToken.userId },
    data: { isEmailVerified: true },
  });

  await prisma.$disconnect();

  return { props: { token: context.params?.token, valid: true } };
};
