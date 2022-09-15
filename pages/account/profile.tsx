import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Session } from "next-auth";

// Components
import Layout from "../../Layout/Layout/Layout";
import Table from "../../components/OrdersTable/OrdersTable";

// utils
import { NEXT_URL } from "../../config";
import UserProfileSection from "@components/UserProfile";
import { UserInfoProps } from "@lib/types";
import { Loader } from "@mantine/core";

type ProfileProps = {
  userData: UserInfoProps;
  isLoading: boolean;
};

function Profile({ userData, isLoading }: ProfileProps): JSX.Element {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const refetch = () => {
    // reload the page to refresh the data
    router.replace(router.asPath);
  };

  if (isLoading) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    );
  }

  return (
    mounted && (
      <Layout title="Profile">
        <main className="w-full p-4 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900  md:mx-auto">
          <UserProfileSection refetch={refetch} user={userData} />
        </main>
      </Layout>
    )
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req;
  const session: Session = await getSession({ req });

  if (!session) {
    // If no token is present redirect user to the login page
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  // If user has logged in and there is a JWT token present,
  // Fetch user data and order data
  const userRes = await fetch(`${NEXT_URL}/api/users/${session.user.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: context.req.headers.cookie,
    },
  });

  const userData = await userRes.json();

  // if (!ordersData || !userData) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      userData: userData,
      isLoading: !userData ? true : false,
    }, // if  will be passed to the page component as props
  };
};

export default Profile;
