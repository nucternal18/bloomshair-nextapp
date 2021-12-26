import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";

// Components
import AdminLayout from "../../../components/Layout/AdminLayout";
import Button from "../../../components/Button";
import Table from "../../../components/Tables/UserTable";
import Spinner from "../../../components/Spinner";

// context
import { useAuth } from "../../../context/auth/AuthContext";

// Get user to confirm if admin
import { getUser } from "../../../lib/getUser";

import { NEXT_URL } from "../../../config";

const UserListScreen = ({ users, loading }) => {
  const router = useRouter();
  const { state, deleteUser } = useAuth();

  const data = users.map((row) => {
    return {
      id: row["_id"],
      image: row["image"],
      name: row["name"],
      email: row["email"],
      isAdmin: row["isAdmin"],
      actions: row["actions"],
    };
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.reload();
    }
  }, [state.success]);

  const deleteHandler = (id) => {
    deleteUser(id);
  };
  return (
    <AdminLayout>
      <main className="w-full h-screen p-2 mx-auto overflow-auto bg-gray-100">
        <section className="container px-2 pt-6 pb-8 mt-6 mb-4 bg-white rounded shadow-2xl md:mx-auto ">
          <div className="flex items-center justify-between mb-4 border-b-4 border-current border-gray-200">
            <div>
              <h1 className="p-5 mt-6 text-5xl font-bold">Users</h1>
            </div>
            <div className="">
              <Button color="dark" type="button">
                <Link href={"/user/createUser"}>
                  <a className="flex items-center">
                    <FaPlus className="mr-1" /> Create User
                  </a>
                </Link>
              </Button>
            </div>
          </div>
          {loading ? (
            <Spinner className="w-12 h-12" />
          ) : (
            <div className="overflow-hidden">
              <Table
                tableData={data}
                headingColumns={[
                  "ID",
                  "IMAGE",
                  "NAME",
                  "EMAIL",
                  "ADMIN",
                  "ACTION",
                ]}
                deleteHandler={deleteHandler}
              />
            </div>
          )}
        </section>
      </main>
    </AdminLayout>
  );
};

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
  const res = await fetch(`${NEXT_URL}/api/users/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: context.req.headers.cookie,
    },
  });
  const data = await res.json();
  const loading = !data ? true : false;

  return {
    props: { users: data, loading: loading }, // will be passed to the page component as props
  };
}

export default UserListScreen;
