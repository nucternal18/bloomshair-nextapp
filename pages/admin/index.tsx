import { getSession } from "next-auth/react";
import { NEXT_URL } from "@config/index";

// Components
import AdminLayout from "../../components/Layout/AdminLayout/AdminLayout";

// utils
import { getUser } from "../../lib/getUser";
import { GetServerSidePropsContext } from "next";
import StatsContainer from "@components/StatsContainer";
import ChartsContainer from "@components/ChartsContainer";

export default function Dashboard({ stats }) {
  return (
    <AdminLayout title="Admin">
      <section className=" w-full h-screen px-4 mx-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 md:px-10">
        <StatsContainer stats={stats} />
        {stats.monthlySalesStats.length > 0 && (
          <ChartsContainer monthlyStats={stats.monthlySalesStats} />
        )}
      </section>
    </AdminLayout>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const req = context.req;
  const session = await getSession({ req });

  if (!session) {
    // If no token is present redirect user to the login page
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }
  const userData = await getUser(req);

  if (!userData?.isAdmin) {
    return {
      redirect: {
        destination: "/not-authorized",
        permanent: false,
      },
    };
  }

  const response = await fetch(`${NEXT_URL}/api/stats`, {
    headers: {
      "Content-Type": "application/json",
      cookie: req.headers.cookie,
    },
  });
  const data = await response.json();

  return {
    props: { stats: data }, // will be passed to the page component as props
  };
}
