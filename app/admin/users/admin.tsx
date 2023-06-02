import { useCallback, useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { Session } from "next-auth";

// Components
import AdminLayout from "../../../Layout/AdminLayout/AdminLayout";
import Button from "app/components/Button";
import Table from "app/components/Tables/UserTable";
import { CreateAdmin } from "app/components/DrawerContainers";

// redux userApiSlice import
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "@app/features/users/userApiSlice";

// utils /lib
import { UserInfoProps } from "@lib/types";
import { GetServerSidePropsContext } from "next";
import useHasMounted from "@hooks/useHasMounted";
import { toast } from "react-toastify";
import { Loader } from "@mantine/core";

const AdminUserListScreen = () => {
  const hasMounted = useHasMounted();
  const { data: users, isLoading: isLoadingUser, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const admins = users?.filter(
    (user: UserInfoProps) =>
      user.category === "SuperAdmin" ||
      user.category === "Admin" ||
      user.isAdmin
  );

  const deleteHandler = useCallback(async (id: string) => {
    try {
      const response = await deleteUser(id).unwrap();
      if (response?.success) toast.success(response?.message ?? "User deleted");
      refetch();
    } catch (error: any) {
      toast.error(error?.message ?? "Error deleting user");
    }
  }, []);

  return (
    hasMounted && (
      <AdminLayout>
        <main className="md:ml-56 h-screen p-2 mx-auto overflow-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
          <section className="px-2 sm:px-4  ">
            <div className="flex items-center justify-between mb-4 border-b-2 border-current border-gray-200">
              <div>
                <h1 className="p-5 mt-2 text-3xl md:text-5xl font-thin font-mono">
                  Admin
                </h1>
              </div>
              <div>
                <Button
                  type="button"
                  color="dark"
                  onClick={() => setIsOpenDrawer(!isOpenDrawer)}
                >
                  <FaPlus fontSize={18} className="mr-1" />
                  <span>Create Admin</span>
                </Button>
              </div>
            </div>
            {isLoading ? (
              <Loader size="xl" variant="bars" />
            ) : (
              <div className="overflow-hidden sm:drop-shadow-2xl sm:rounded-2xl">
                <Table
                  tableData={admins as UserInfoProps[]}
                  deleteHandler={deleteHandler}
                />
              </div>
            )}
          </section>
          <CreateAdmin
            refreshData={refetch}
            isOpenDrawer={isOpenDrawer}
            setIsOpenDrawer={setIsOpenDrawer}
          />
        </main>
      </AdminLayout>
    )
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

export default AdminUserListScreen;
