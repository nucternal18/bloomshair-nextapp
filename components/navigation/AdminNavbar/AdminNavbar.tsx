/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MdOutlineDashboard } from "react-icons/md";

// context
import { useAuth } from "@context/auth/AuthContext";

const AdminNavbar = () => {
  const router = useRouter();
  const { state } = useAuth();
  const [pos, setPos] = useState("top");

  // Check the top position of the navigation in the window
  const scrollCheck = (e) => {
    const scrolled = document.scrollingElement.scrollTop;
    if (scrolled >= 1) {
      setPos("moved");
    } else {
      setPos("top");
    }
  };
  useEffect(() => {
    document.addEventListener("scroll", scrollCheck);
    return () => {
      document.removeEventListener("scroll", scrollCheck);
    };
  }, []);
  return (
    <nav
      aria-label="admin-dashboard-navigation"
      data-testid="admin-dashboard-navigation"
      className="relative p-6 md:flex gap-2 md:gap-5 w-full font-mono hidden sm:block shadow-xl bg-white dark:bg-gray-900"
    >
      <div className="flex items-center justify-center text-gray-800 dark:text-gray-200 dark:hover:text-yellow-500 ">
        <MdOutlineDashboard fontSize={28} className="mr-2" />
        <h1 className="text-2xl font font-semibold">Dashboard</h1>
      </div>
      <div className="flex justify-end items-center w-full px-2 rounded-md text-gray-800 dark:text-gray-200 dark:hover:text-yellow-500 border-none outline-none focus-within:shadow-sm">
        {state.user && (
          <button
            type="button"
            className="flex items-center bg-gray-800 dark:bg-yellow-500 px-4 py-2 rounded-3xl text-gray-200 shadow-xl"
            onClick={() => router.push(`/user-profile/${state.user?.id}`)}
          >
            <p className="mr-2 capitalize text-base">{state.user?.name}</p>
            <img
              src={state.user?.image}
              alt="user-profile"
              className="w-8 h-8 rounded-full"
            />
          </button>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
