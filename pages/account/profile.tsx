import { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Session } from "next-auth";

// Components
import Layout from "../../Layout/MainLayout/Layout";
import Table from "../../components/OrdersTable/OrdersTable";

// utils
import { NEXT_URL } from "../../config";
import UserProfileSection from "@components/UserProfile";
import { UserInfoProps } from "@lib/types";
import { Loader } from "@mantine/core";
import useHasMounted from "../../hooks/useHasMounted";

// Redux
import { useGetUserByIdQuery } from "../../features/users/userApiSlice";

type ProfileProps = {
  userData: UserInfoProps;
};

function Profile({ userData }: ProfileProps): JSX.Element {
  const router = useRouter();
  const hasMounted = useHasMounted();
  const { data, isLoading: isLoadingUser } = useGetUserByIdQuery(
    userData.id as string
  );

  const refetch = () => {
    // reload the page to refresh the data
    router.replace(router.asPath);
  };

  if (!hasMounted) {
    return (
      <Layout title="Profile">
        <main className="w-full p-4 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900  md:mx-auto">
          <div className="flex h-[700px] items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout title="Profile">
      <main className="w-full p-4 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900  md:mx-auto">
        <UserProfileSection
          refetch={refetch}
          user={data as UserInfoProps}
          isLoadingUser={isLoadingUser}
        />
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req;
  const session: Session = (await getSession({ req })) as Session;

  if (!session) {
    // If no session is present redirect user to the login page
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      userData: session.user,
    }, // if  will be passed to the page component as props
  };
};

export default Profile;
