"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  FaBars,
  FaTimes,
  FaNewspaper,
  FaUserCircle,
  FaImages,
  FaShoppingBasket,
  FaShippingFast,
} from "react-icons/fa";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { useTheme } from "next-themes";

// redux
import {
  userApiSlice,
  orderApiSlice,
  hairServiceApiSlice,
  galleryApiSlice,
} from "app/global-state/api/apiSlice";
import { useAppDispatch } from "app/global-state/hooks";

import ActiveLink from "../../ActiveLink";
import { BloomsLogo } from "../../SVG/BloomsLogo";
import useHasMounted from "@hooks/useHasMounted";

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [collapseShow, setCollapseShow] = useState<string>("hidden");
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const hasMounted = useHasMounted();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    signOut();
    dispatch(userApiSlice.util.resetApiState());
    dispatch(orderApiSlice.util.resetApiState());
    dispatch(hairServiceApiSlice.util.resetApiState());
    dispatch(galleryApiSlice.util.resetApiState());
    router.push("/");
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <nav className="relative z-10 flex flex-wrap items-center sm:mr-0 drop-shadow-sm dark:drop-shadow-none justify-between px-4 py-4 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 rounded-md md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden md:w-56">
      <div className="flex flex-wrap items-center justify-between w-full px-0 mx-auto md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap">
        {/* Toggler */}
        <div className="flex items-center gap-4 sm:gap-1">
          <button
            className="px-3 py-1 text-xl leading-none  bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <FaBars
              fontSize={21}
              className={`text-gray-900 dark:text-gray-200 font-bold `}
            />
          </button>

          {/* Brand */}
          {hasMounted && (
            <Link
              href={"/"}
              className="inline-block p-0 m-0 text-2xl font-bold cursor-pointer  "
            >
              <BloomsLogo
                width={200}
                height={80}
                fill={`${theme === "dark" ? "#fff" : "#000"}`}
              />
            </Link>
          )}
        </div>

        {/* Collapse */}
        <div
          className={
            "md:flex md:flex-col md:items-stretch md:opacity-100 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900  md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
            collapseShow
          }
        >
          {/* Collapse header */}
          <div className="block pb-4 mb-4 border-b border-gray-300 border-solid md:min-w-full md:hidden">
            <div className="flex flex-wrap">
              <div className="w-6/12">
                {mounted && (
                  <Link
                    href={"/"}
                    className="inline-block p-0 m-0 text-2xl font-bold cursor-pointer  "
                  >
                    <BloomsLogo
                      width={200}
                      height={80}
                      fill={`${theme === "dark" ? "#fff" : "#000"}`}
                    />
                  </Link>
                )}
              </div>
              <div className="flex justify-end w-6/12">
                <button
                  type="button"
                  className="px-3 py-1 text-xl leading-none  bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
                  onClick={() => setCollapseShow("hidden")}
                >
                  <FaTimes
                    fontSize={21}
                    className={`text-gray-900 dark:text-gray-200 font-bold `}
                  />
                </button>
              </div>
            </div>
          </div>
          {/* Form */}
          <form className="mt-6 mb-4 md:hidden">
            <div className="pt-0 mb-3">
              <input
                type="text"
                placeholder="Search"
                className="w-full h-12 px-3 py-2 text-base font-normal leading-snug  placeholder-gray-400  border border-gray-600 border-solid rounded shadow-none outline-none focus:outline-none"
              />
            </div>
          </form>

          {/* Divider */}
          <hr className="my-1 md:min-w-full" />
          {/* Navigation */}

          <ul className="flex flex-col list-none md:flex-col flex-grow md:min-w-full md:mb-4 ">
            <li className="items-center justify-center">
              <ActiveLink href="/admin">
                <FaNewspaper className="mr-2 text-sm" />
                Admin Home
              </ActiveLink>
            </li>

            <li className="flex flex-row items-center">
              <ActiveLink href="/admin/users">
                <FaUserCircle className="mr-2 text-sm" />
                Manage Customers
              </ActiveLink>
            </li>
            <li className="flex flex-row items-center">
              <ActiveLink href="/admin/users/admin">
                <FaUserCircle className="mr-2 text-sm" />
                Manage Admins
              </ActiveLink>
            </li>
            <li className="items-center">
              <ActiveLink href="/admin/products">
                <FaShoppingBasket className="mr-2 text-sm" />
                Manage Products
              </ActiveLink>
            </li>
            <li className="items-center">
              <ActiveLink href="/admin/hair-services">
                <FaShoppingBasket className="mr-2 text-sm" />
                Manage Services
              </ActiveLink>
            </li>
            <li className="items-center">
              <ActiveLink href="/admin/gallery">
                <FaImages className="mr-2 text-sm" />
                Manage Gallery
              </ActiveLink>
            </li>
            <li className="items-center">
              <ActiveLink href="/admin/orders">
                <FaShippingFast className="mr-2 text-sm" /> Manage Orders
              </ActiveLink>
            </li>
          </ul>

          {/* Divider */}
          <hr className="my-4 md:min-w-full" />
          <ul className="flex flex-col list-none md:flex-col md:min-w-full md:mb-4">
            <li className="items-center">
              <button type="button" className="" onClick={handleLogout}>
                <p className="flex flex-row py-3 text-xs font-bold uppercase hover:text-gray-400">
                  <FiLogOut className="mr-2 text-sm" /> Logout
                </p>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
