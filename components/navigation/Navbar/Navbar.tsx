/* eslint-disable react/display-name */
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaTimes, FaUser } from "react-icons/fa";
import { FiLogIn, FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiAdminFill } from "react-icons/ri";
import { signOut } from "next-auth/react";
import { useQuery } from "react-query";
import { useTheme } from "next-themes";
import { useSnipcart } from "use-snipcart";

// context
import { useCart } from "@context/cart/cartContext";
import { useAuth } from "@context/auth/AuthContext";
import { getCartItems } from "@context/cart/cartActions";

// components
const CartIcon = dynamic(() => import("@components/CartIcon"), { ssr: false });

// navlinks
import { navLink } from "../../../data";
import { BloomsLogo } from "../../SVG/BloomsLogo";

const Navbar = () => {
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartIsOpen, setCartIsOpen] = useState<boolean>(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [pos, setPos] = useState<string>("top");
  const { state } = useCart();
  const { state: authState } = useAuth();

  const { cart = {} } = useSnipcart();

  useEffect(() => {
    setMounted(true);
  }, []);

  // mobile nav bar ref
  const mobileNavRef = useRef<HTMLElement>();
  // user drop down ref
  const ref = useRef<HTMLDivElement>();

  // Close user drop down list when user clicks outside event window
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        if (!isDropDownOpen) return;
        toggleUserDropdown();
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [isDropDownOpen, ref]);

  // Close mobile nav drawer when user clicks outside event window
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!mobileNavRef.current?.contains(event.target)) {
        if (!isOpen) return;
        toggle();
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, mobileNavRef]);

  // Check the top position of the navigation in the window
  useEffect(() => {
    const handleScrollTop = (e) => {
      const scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 5) {
        setPos("moved");
      } else {
        setPos("top");
      }
    };
    document.addEventListener("scroll", handleScrollTop);
    return () => document.removeEventListener("scroll", handleScrollTop);
  }, []);

  // toggle the mobile navigation bar and the user dropdown list
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const toggleUserDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  // toggle cart drawer
  const toggleCartDrawer = () => {
    setCartIsOpen(!cartIsOpen);
  };

  // logout handler
  const logoutHandler = () => {
    signOut();
  };

  return (
    <nav
      aria-label="main-navigation"
      data-testid="main-navigation"
      className={`top-0 z-10 flex flex-wrap items-center justify-between w-full px-2 py-2 text-gray-900 dark:text-gray-200 ${
        router.asPath === "/" && pos === "top"
          ? "bg-transparent absolute"
          : pos === "top"
          ? "absolute bg-white dark:bg-gray-900 "
          : "fixed shadow-b-2xl bg-white dark:bg-gray-900"
      }  navbar-expand-lg`}
    >
      <div className="container flex items-center justify-between px-2 mx-auto font-light  md:relative sm:px-1 md:px-0 md:flex-row">
        {mounted && (
          <Link href={"/"}>
            <a className="inline-block p-0 m-0 text-2xl font-bold cursor-pointer md:mr-4 ">
              <BloomsLogo
                width={250}
                height={80}
                fill={`${
                  router.asPath === "/" && pos === "top"
                    ? "#fff"
                    : resolvedTheme === "dark"
                    ? "#fff"
                    : "#000"
                }`}
              />
              <span hidden>Home</span>
            </a>
          </Link>
        )}

        <div className="flex items-center flex-row-reverse">
          <button
            type="button"
            aria-expanded="false"
            aria-disabled={isOpen}
            disabled={isOpen}
            aria-label="Toggle navigation"
            className="block float-right text-4xl  lg:hidden focus:outline-none focus:shadow-none"
            onClick={toggle}
          >
            <GiHamburgerMenu
              fontSize={21}
              className={`${
                router.asPath === "/" && pos === "top"
                  ? "text-gray-200"
                  : "text-gray-900 dark:text-gray-200"
              } font-bold `}
            />
          </button>
          <div className="flex items-center lg:hidden">
            {authState.user && (
              <button
                aria-label="user-dropdown"
                className="flex items-center  bg-gray-200 border-2 border-yellow-500 rounded-full"
                disabled
              >
                <Image
                  src={authState.user.image}
                  alt={authState.user.name}
                  width={30}
                  height={30}
                  className="rounded-full"
                  objectFit="cover"
                />
              </button>
            )}
            <button
              aria-label="cart-button"
              className="snipcart-checkout text-2xl  list-none cursor-pointer hover:text-yellow-400"
            >
              <CartIcon
                itemCount={cart.items?.count || 0}
                className={`${
                  router.asPath === "/" && pos === "top"
                    ? "text-gray-200"
                    : "text-gray-900 dark:text-gray-200"
                } font-bold relative flex items-center justify-center w-12 h-12 cursor-pointer `}
              />
            </button>
          </div>
        </div>
        {/* Main Nav Links */}
        <ul className={position.right}>
          {navLink.map((link) => (
            <li key={link.id} className="flex px-1 m-0 list-none ">
              <Link href={link.link}>
                <a
                  className={`${
                    router.asPath === "/" && pos === "top"
                      ? "text-gray-200"
                      : router.asPath === link.link
                      ? "text-yellow-500"
                      : ""
                  } flex items-center lg:block ml-0 mb-0 cursor-pointer py-1   hover:text-yellow-400 text-xs  font-normal list-none uppercase`}
                >
                  {link.title}
                </a>
              </Link>
            </li>
          ))}
          <li className="flex px-1 m-0 list-none ">
            <button
              type="button"
              aria-label="toggle-theme-button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`flex p-1 ml-4 font-medium list-none  cursor-pointer md:block lg:ml-0 lg:mb-0 lg:p-1 lg:px-1 focus:outline-none focus:ring-none focus:border-transparent`}
            >
              {resolvedTheme === "light" ? (
                <FiSun
                  fontSize={18}
                  className={`${
                    router.asPath === "/" && pos === "top"
                      ? "text-gray-200"
                      : "text-gray-900 dark:text-gray-200"
                  } font-bold `}
                />
              ) : (
                <FiMoon
                  fontSize={18}
                  className={`${
                    router.asPath === "/" && pos === "top"
                      ? "text-gray-200"
                      : "text-gray-900 dark:text-gray-200"
                  } font-bold `}
                />
              )}
              <span hidden>toggle theme</span>
            </button>
          </li>
          {authState.user ? (
            <li className="px-1 m-0 text-base list-none">
              <button
                aria-label="user-dropdown-button"
                className="flex items-center bg-white border-2 border-yellow-500 rounded-full"
                onClick={toggleUserDropdown}
              >
                <Image
                  src={authState.user.image}
                  alt={authState.user.name}
                  width={30}
                  height={30}
                  className="rounded-full"
                  objectFit="cover"
                />
              </button>
              <div
                className={
                  isDropDownOpen
                    ? "absolute right-0 z-20 w-32 mt-2 overflow-hidden bg-white dark:bg-gray-900  rounded-md shadow-2xl"
                    : "hidden"
                }
                ref={ref}
              >
                <div>
                  <button
                    aria-label="user-profile-link"
                    className="flex items-center px-4 py-2 space-x-2"
                  >
                    <FaUser fontSize={18} />
                    <Link href={"/account/profile"}>
                      <a
                        className={`${
                          router.asPath === "/account/login"
                            ? "text-yellow-500"
                            : ""
                        } block text-lg font-medium space-x-2  list-none cursor-pointer hover:text-yellow-400`}
                      >
                        Profile
                      </a>
                    </Link>
                  </button>
                  {authState.user.isAdmin && (
                    <button
                      aria-label="admin-link"
                      className="flex items-center px-4 py-2 space-x-2"
                    >
                      <RiAdminFill fontSize={18} />
                      <Link href={"/admin"}>
                        <a
                          className={`${
                            router.asPath === "/account/login"
                              ? "text-yellow-500"
                              : ""
                          } block text-lg font-medium   list-none cursor-pointer hover:text-yellow-400`}
                        >
                          Admin
                        </a>
                      </Link>
                    </button>
                  )}
                  <button
                    aria-label="logout-button"
                    className="flex items-center px-4 py-2 space-x-2 text-lg hover:text-yellow-500"
                    onClick={logoutHandler}
                  >
                    <FiLogOut fontSize={18} />
                    <p className="font-medium">Logout </p>
                  </button>
                </div>
              </div>
            </li>
          ) : (
            <li className="m-0 list-none ">
              <button
                aria-label="login-button"
                className={`${
                  router.asPath === "/" && pos === "top"
                    ? "text-gray-200"
                    : router.asPath === "/account/login"
                    ? "text-yellow-500"
                    : ""
                } flex items-center px-1`}
              >
                <FiLogIn fontSize={18} />
                <Link href={"/account/login"}>
                  <a className="flex items-center md:block ml-2 mb-2 lg:ml-0 lg:mb-0 cursor-pointer py-1.5 lg:py-1 px-2 lg:px-1  text-xs font-medium list-none uppercase">
                    Sign In
                  </a>
                </Link>
              </button>
            </li>
          )}
          <li className="list-none mb-1 flex items-center gap-1">
            <button
              aria-label="cart-button"
              className={`snipcart-checkout text-xl font-medium  uppercase list-none cursor-pointer `}
            >
              <CartIcon
                itemCount={cart.items?.count || 0}
                className={`${
                  router.asPath === "/" && pos === "top"
                    ? "text-gray-200"
                    : "text-gray-900 dark:text-gray-200"
                } font-bold relative flex items-center justify-center w-12 h-12  `}
              />
            </button>
            <span
              className={`${
                router.asPath === "/" && pos === "top"
                  ? "text-gray-200"
                  : "text-gray-900 dark:text-gray-200"
              } text-sm mt-2 `}
            >
              {cart.items?.count > 0 && `£${cart.subtotal?.toFixed(2)}`}
            </span>
          </li>
        </ul>
      </div>

      {/* Mobile Nav links */}
      <aside
        className={
          isOpen
            ? `${classNames.default} ${classNames.enabled}`
            : `${classNames.default} ${classNames.disabled}`
        }
        ref={mobileNavRef}
      >
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-32 w-full px-3 py-2 my-2 ml-2">
            <button
              aria-label="Close"
              className=" py-1  text-4xl  cursor-pointer focus:outline-none"
              onClick={toggle}
            >
              <FaTimes fontSize={21} />
              <span hidden>close</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex p-1  font-medium list-none cursor-pointer md:block lg:ml-0 lg:mb-0 lg:p-1 lg:px-1 focus:outline-none focus:ring-none focus:border-transparent"
            >
              {resolvedTheme === "light" ? (
                <FiSun fontSize={21} className="font-bold " />
              ) : (
                <FiMoon fontSize={21} className="font-bold " />
              )}
              <span hidden>toggle-theme</span>
            </button>
          </div>

          <div className="mt-2">
            <ul className="overscroll-y-auto">
              {navLink.map((link) => (
                <li
                  key={link.id}
                  className="flex px-1 m-0 text-base list-none sm:text-xs md:text-sm text-md"
                >
                  <Link href={link.link}>
                    <a
                      aria-label={link.title}
                      className={`${
                        router.asPath === link.link ? "text-yellow-500" : ""
                      }flex items-center  ml-4 mb-2 cursor-pointer py-1.5  px-2   hover:text-yellow-400 text-lg font-medium list-none uppercase`}
                    >
                      {link.title}
                    </a>
                  </Link>
                </li>
              ))}
              {authState.user ? (
                <>
                  <li className="px-1 m-0 text-base list-none text-md">
                    <button
                      aria-label="user-profile-button"
                      className="flex items-center py-1.5  px-2 mb-2 ml-4 space-x-2"
                    >
                      <FaUser fontSize={18} />
                      <Link href={"/account/profile"}>
                        <a
                          className={`${
                            router.asPath === "/account/login"
                              ? "text-yellow-500"
                              : ""
                          }flex items-center text-lg font-medium  uppercase list-none cursor-pointer hover:text-yellow-400`}
                        >
                          Profile
                        </a>
                      </Link>
                    </button>
                  </li>
                  {authState.user.isAdmin && (
                    <li className="px-1 m-0 text-base list-none text-md">
                      <button
                        aria-label="admin-button"
                        className="flex items-center py-1.5  px-2 mb-2 ml-4 space-x-2"
                      >
                        <RiAdminFill fontSize={18} />
                        <Link href={"/admin"}>
                          <a
                            className={`${
                              router.asPath === "/account/login"
                                ? "text-yellow-500"
                                : ""
                            } block text-lg font-medium  uppercase list-none cursor-pointer hover:text-yellow-400`}
                          >
                            admin
                          </a>
                        </Link>
                      </button>
                    </li>
                  )}
                  <li className="px-1 m-0 text-base list-none text-md">
                    <button
                      aria-label="logout-button"
                      className="flex items-center  ml-4 mb-4 cursor-pointer py-1.5  px-2  space-x-2  text-lg font-medium list-none uppercase"
                      onClick={logoutHandler}
                    >
                      <FiLogOut fontSize={18} />
                      <p>Logout </p>
                    </button>
                  </li>
                </>
              ) : (
                <li className="flex items-center px-1 m-0 text-base list-none text-md">
                  <button
                    aria-label="login-button"
                    className="flex items-center"
                  >
                    <FiLogIn fontSize={18} className="ml-5 mr-1 " />
                    <Link href={"/account/login"}>
                      <a
                        className={`${
                          router.asPath === "/account/login"
                            ? "text-yellow-500"
                            : ""
                        }py-1 text-lg font-medium  uppercase list-none cursor-pointer hover:text-yellow-400`}
                      >
                        Sign In
                      </a>
                    </Link>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </aside>
    </nav>
  );
};

const position = {
  left: "hidden  pl-0 mb-0 mr-auto lg:flex md:pl-0 md:mb-0 md:items-center",
  right: "hidden  pl-0 mb-0 ml-auto lg:flex md:pl-0 md:mb-0 md:items-center",
  center:
    "hidden  pl-0 mb-0 ml-auto lg:flex md:pl-0 md:mb-0 md:mx-auto md:items-center",
  default: "hidden  pl-0 mb-0 mr-auto lg:flex md:pl-0 md:mb-0 md:items-center",
};

const classNames = {
  default: `lg:hidden flex h-screen  fixed top-0 right-0 transition-all ease duration-200`,
  enabled: `w-7/12 md:w-1/3  z-50  text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 overflow-y-hidden `,
  disabled: `w-0 text-white overflow-x-hidden`,
};

export default Navbar;
