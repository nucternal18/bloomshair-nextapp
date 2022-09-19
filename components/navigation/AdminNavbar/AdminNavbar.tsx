/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MdOutlineDashboard } from "react-icons/md";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { FiMoon, FiSun } from "react-icons/fi";

import useHasMounted from "@hooks/useHasMounted";

const AdminNavbar = () => {
  const router = useRouter();
  const [pos, setPos] = useState("top");
  const { theme, setTheme } = useTheme();
  const { data } = useSession();
  const session: Session = data as Session;
  const hasMounted = useHasMounted();

  // Check the top position of the navigation in the window
  const scrollCheck = (e: Event) => {
    const scrolled = document.scrollingElement?.scrollTop;
    if ((scrolled as number) >= 1) {
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

  if (!hasMounted) return null;

  return (
    <nav
      aria-label="admin-dashboard-navigation"
      data-testid="admin-dashboard-navigation"
      className="relative md:ml-56 p-6 md:flex gap-2 md:gap-5  font-mono hidden sm:block shadow-md bg-white dark:bg-gray-900"
    >
      <div className="flex items-center justify-center text-gray-800 dark:text-gray-200 dark:hover:text-yellow-500 ">
        <MdOutlineDashboard fontSize={28} className="mr-2" />
        <h1 className="text-2xl font font-semibold">Dashboard</h1>
      </div>
      <div className="flex justify-end items-center w-full px-2 rounded-md gap-4 text-gray-800 dark:text-gray-200 dark:hover:text-yellow-500 border-none outline-none focus-within:shadow-sm">
        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={`flex p-1  font-medium list-none ml-4 sm:ml-0  cursor-pointer lg:ml-0 lg:mb-0 lg:p-1 lg:px-1 focus:outline-none focus:ring-none focus:border-transparent`}
        >
          {theme === "light" ? (
            <FiSun
              fontSize={21}
              className={`text-gray-900 dark:text-gray-200 font-bold `}
            />
          ) : (
            <FiMoon
              fontSize={21}
              className={`text-gray-900 dark:text-gray-200 font-bold `}
            />
          )}
        </button>
        {session?.user && (
          <button
            type="button"
            className="flex items-center bg-gray-800 dark:bg-yellow-500 px-4 py-2 rounded-3xl text-gray-200 shadow-xl"
            onClick={() => router.push(`/account/profile`)}
          >
            <p className="mr-2 capitalize text-base">{session.user?.name}</p>
            <img
              src={session.user?.image}
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
