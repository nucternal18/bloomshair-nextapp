import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Session } from "next-auth";

// Components
import AdminLayout from "../../../Layout/AdminLayout/AdminLayout";
import Button from "../../../components/Button";
import Table from "../../../components/Tables/UserTable";
import Spinner from "../../../components/Spinner";

// context
import { ActionType, useAuth } from "../../../context/auth/AuthContext";

// Get user to confirm if admin
import { getUser } from "../../../lib/getUser";

import { NEXT_URL } from "../../../config";
import { UserInfoProps } from "../../../lib/types";

const CustomerListScreen = ({ users, loading }) => {
  const router = useRouter();
  const {
    state: { success, message },
    dispatch,
    deleteUser,
  } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const customer = users.filter(
    (user: UserInfoProps) => user.category === "customer"
  );

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  useEffect(() => {
    setIsRefreshing(false);
  }, [users]);

  //  useEffect(() => {
  //    if (success) {
  //      toast.success(message);
  //      dispatch({ type: ActionType.USER_ACTION_RESET });
  //    }
  //  }, [success]);

  const deleteHandler = (id: string) => {
    deleteUser(id);
    refreshData();
  };
  return (
    <AdminLayout>
      <main className="w-full h-screen p-2 mx-auto overflow-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
        <section className="px-2 sm:px-4 p-2 ">
          <div className="flex items-center justify-between mb-4 border-b-2 border-current border-gray-200">
            <div>
              <h1 className="p-5 mt-6 text-3xl md:text-5xl font-thin font-mono">
                Customers
              </h1>
            </div>
          </div>
          {isRefreshing ? (
            <Spinner message="loading..." />
          ) : (
            <div className="overflow-hidden sm:drop-shadow-2xl sm:rounded-2xl">
              <Table tableData={customer} deleteHandler={deleteHandler} />
            </div>
          )}
        </section>
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
        destination: "/auth/signin",
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

export default CustomerListScreen;
