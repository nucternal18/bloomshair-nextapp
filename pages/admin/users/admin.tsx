import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { Session } from "next-auth";

// Components
import AdminLayout from "../../../components/Layout/AdminLayout/AdminLayout";
import Button from "../../../components/Button";
import Table from "../../../components/Tables/UserTable";
import Spinner from "../../../components/Spinner";
import { CreateAdmin } from "../../../components/DrawerContainers";

// context
import { ActionType, useAuth } from "../../../context/auth/AuthContext";

// Get user to confirm if admin
import { getUser } from "../../../lib/getUser";

import { NEXT_URL } from "../../../config";
import { UserInfoProps } from "../../../lib/types";
// import { toast } from "react-toastify";

const AdminUserListScreen = ({ users }) => {
  const router = useRouter();
  const {
    state: { message, success },
    dispatch,
    deleteUser,
  } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const admins = users.filter(
    (user: UserInfoProps) =>
      user.category === "superAdmin" ||
      user.category === "administrator" ||
      user.isAdmin
  );

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  useEffect(() => {
    setIsRefreshing(false);
  }, [users]);

  // useEffect(() => {
  //   if (success) {
  //     toast.success(message);
  //     dispatch({ type: ActionType.USER_ACTION_RESET });
  //   }
  // }, [success]);

  const deleteHandler = (id) => {
    deleteUser(id);
    refreshData();
  };
  return (
    <AdminLayout>
      <main className="w-full h-screen p-2 mx-auto overflow-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
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
          {isRefreshing ? (
            <Spinner message="loading..." />
          ) : (
            <div className="overflow-hidden sm:drop-shadow-2xl sm:rounded-2xl">
              <Table tableData={admins} deleteHandler={deleteHandler} />
            </div>
          )}
        </section>
        <CreateAdmin
          refreshData={refreshData}
          isOpenDrawer={isOpenDrawer}
          setIsOpenDrawer={setIsOpenDrawer}
        />
      </main>
    </AdminLayout>
  );
};

export async function getServerSideProps(context) {
  const req = context.req;
  const session: Session = await getSession({ req });

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

  if (!session.user?.isAdmin) {
    return {
      redirect: {
        destination: "/not-authorized",
        permanent: false,
      },
    };
  }
  const res = await fetch(`${NEXT_URL}/api/users/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: context.req.headers.cookie,
    },
  });
  const data = await res.json();
  const isLoading = !data ? true : false;

  return {
    props: { users: data, isLoading: isLoading }, // will be passed to the page component as props
  };
}

export default AdminUserListScreen;
