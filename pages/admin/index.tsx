import { getSession } from "next-auth/react";

// Components
import AdminLayout from "../../components/Layout/AdminLayout";

// utils
import { getUser } from "../../lib/getUser";

export default function Dashboard() {
  return (
    <AdminLayout title="Admin">
      <section className="flex items-center justify-center flex-grow w-full h-screen px-4 mx-auto bg-gray-100 md:px-10">
        <h1 className="text-2xl">Welcome to Blooms hair</h1>
      </section>
    </AdminLayout>
  );
}
export async function getServerSideProps(context) {
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
  return {
    props: {}, // will be passed to the page component as props
  };
}
