import { getSession } from "next-auth/react";
import { NEXT_URL } from "@config/index";
import dynamic from "next/dynamic";
import { Session } from "next-auth";
import { GetServerSidePropsContext } from "next";

// utils
import useHasMounted from "@hooks/useHasMounted";

// Components
import AdminLayout from "../../Layout/AdminLayout/AdminLayout";
import StatsContainer from "app/components/StatsContainer";
const ChartsContainer = dynamic(
  () => import("app/components/ChartsContainer"),
  {
    ssr: false,
  }
);

export default function Dashboard({
  stats,
  user,
}: {
  stats: any;
  user: Session;
}) {
  const hasMounted = useHasMounted();

  return (
    hasMounted && (
      <AdminLayout title="Admin">
        <section className=" md:ml-56 h-screen px-4 mx-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 md:px-10">
          <StatsContainer stats={stats} />
          {stats.monthlySalesStats?.length > 0 && (
            <ChartsContainer monthlyStats={stats.monthlySalesStats} />
          )}
        </section>
      </AdminLayout>
    )
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const req = context.req;
  const session: Session = (await getSession({ req })) as Session;

  if (!session) {
    // If no token is present redirect user to the login page
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  if (!session.user?.isAdmin) {
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
      cookie: context.req.headers.cookie,
    } as HeadersInit,
  });
  const data = await response.json();

  return {
    props: { stats: data, user: session }, // will be passed to the page component as props
  };
}
