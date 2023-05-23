import { useCallback } from "react";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
import { Session } from "next-auth";

// Components
import AdminLayout from "../../../Layout/AdminLayout/AdminLayout";
import Table from "../../components/Tables/UserTable";

import { UserInfoProps } from "../../../lib/types";
import { GetServerSidePropsContext } from "next";
import useHasMounted from "@hooks/useHasMounted";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../global-state/features/users/userApiSlice";
import { Loader } from "@mantine/core";

const CustomerListScreen = () => {
  const hasMounted = useHasMounted();
  const { data: users, isLoading, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const customer = users?.filter(
    (user: UserInfoProps) => user.category === "Customer"
  );

  const deleteHandler = useCallback(async (id: string) => {
    try {
      const response = await deleteUser(id).unwrap();
      if (response) {
        toast.success(response.message ?? "User deleted successfully");
        refetch();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, []);

  if (isLoading) {
    <AdminLayout>
      <main className="md:ml-56 h-screen p-2 mx-auto overflow-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
        <section className="px-2 sm:px-4 p-2 ">
          <div className="flex items-center justify-between mb-4 border-b-2 border-current border-gray-200">
            <div>
              <h1 className="p-5 mt-6 text-3xl md:text-5xl font-thin font-mono">
                Customers
              </h1>
            </div>
          </div>
          <div className="overflow-hidden sm:drop-shadow-2xl sm:rounded-2xl">
            <Loader size="xl" variant="bars" />
          </div>
        </section>
      </main>
    </AdminLayout>;
  }

  return (
    <AdminLayout>
      <main className="md:ml-56 h-screen p-2 mx-auto overflow-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
        <section className="px-2 sm:px-4 p-2 ">
          <div className="flex items-center justify-between mb-4 border-b-2 border-current border-gray-200">
            <div>
              <h1 className="p-5 mt-6 text-3xl md:text-5xl font-thin font-mono">
                Customers
              </h1>
            </div>
          </div>

          <div className="overflow-hidden sm:drop-shadow-2xl sm:rounded-2xl">
            <Table
              tableData={customer as UserInfoProps[]}
              deleteHandler={deleteHandler}
            />
          </div>
        </section>
      </main>
    </AdminLayout>
  );
};

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

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default CustomerListScreen;
