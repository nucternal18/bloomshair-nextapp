import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

//components
import Button from "../../../components/Button";
import AdminLayout from "../../../components/Layout/AdminLayout";

// context
import { useAuth } from "../../../context/auth/AuthContext";

// Get user to confirm if admin
import { getUser } from "../../../lib/getUser";

function CreateUser() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { state, registerUser } = useAuth();

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/admin/users");
    }
  }, [state.success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      registerUser(name, email, password, isAdmin);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsAdmin(false);
    }
  };

  return (
    <AdminLayout>
      <main className="w-full h-screen p-2 mx-auto overflow-auto">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container px-2 pt-6 pb-8 mt-6 mb-4 bg-white rounded shadow-xl md:mx-auto "
        >
          <div className="flex items-center justify-between px-4 mb-4 border-b-4 border-current border-gray-200">
            <div>
              <h1 className="p-5 mt-6 text-5xl font-bold">Create User</h1>
            </div>
            <div className="mt-6">
              <Button color="dark" type="button">
                <Link href="/admin/users">
                  <a>Go Back</a>
                </Link>
              </Button>
            </div>
          </div>
          <form
            onSubmit={submitHandler}
            className="px-2 pt-6 pb-8 mx-2 mb-4 bg-transparent "
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-2 text-base font-bold text-gray-700"
              >
                Name
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:shadow-outline focus:outline-none "
                id="name"
                type="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-base font-bold text-gray-700"
              >
                Email Address
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:shadow-outline focus:outline-none "
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-base font-bold text-gray-700"
              >
                Password
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:shadow-outline focus:outline-none "
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-base font-bold text-gray-700"
              >
                Confirm Password
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:shadow-outline focus:outline-none "
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div className="block">
              <div className="mt-2">
                <div>
                  <label htmlFor="isAdmin" className="inline-flex items-center">
                    <input
                      type="checkbox"
                      id="isAdmin"
                      value={isAdmin.toString()}
                      className="form-checkbox"
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                    <span className="ml-2">isAdmin</span>
                  </label>
                </div>
              </div>
            </div>

            <Button type="submit" color="dark">
              Register
            </Button>
          </form>
        </motion.section>
      </main>
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

export default CreateUser;
