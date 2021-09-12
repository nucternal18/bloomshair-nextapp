/* eslint-disable react/display-name */
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { RiAdminFill } from "react-icons/ri";
import { getSession, signOut } from "next-auth/client";
import { useQuery } from "react-query";

// context
import { useCart } from "../../context/cart/cartContext";

// components
import CartContainer from "../CartContainer";
const CartIcon = dynamic(() => import("../CartIcon"), { ssr: false });

// navlinks
import { navLink } from "../../data";
import { getCartItems } from "../../context/cart/cartActions";

const Navbar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const { state } = useCart();
  const { isLoading, data: cartItems } = useQuery("cart", getCartItems, {
    initialData: state.cart.cartItems,
  });

  // mobile nav bar ref
  const mobileNavRef = useRef<HTMLElement>();
  // user drop down ref
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    getSession().then((session) => {
      setLoading(false);
      if (session) {
        setLoadedSession(session);
      }
    });
  }, []);

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
      className={`absolute top-0 z-50 flex flex-wrap items-center justify-between w-full px-2 py-2 ${
        router.asPath === "/" ? "bg-transparent" : "bg-gray-900"
      }  navbar-expand-lg`}
    >
      <div className="container flex items-center justify-between px-2 mx-auto font-light text-gray-500 md:relative sm:px-1 md:px-0 md:flex-row">
        <Link href={"/"}>
          <a className="inline-block p-0 m-0 text-2xl font-bold cursor-pointer md:mr-4 ">
            <Image
              src={"/logo.svg"}
              alt="blooms hair logo"
              height={60}
              width={200}
              layout="intrinsic"
              objectFit="contain"
            />
          </a>
        </Link>
        <div>
          <button
            type="button"
            aria-expanded="false"
            aria-disabled={isOpen}
            disabled={isOpen}
            aria-label="Toggle navigation"
            className="block float-right text-4xl text-gray-200 lg:hidden focus:outline-none focus:shadow-none"
            onClick={toggle}
          >
            &#8801;
          </button>
          <div className="flex items-center lg:hidden ">
            {loadedSession && (
              <button
                className="flex items-center  bg-gray-200 border-2 border-yellow-500 rounded-full"
                disabled
              >
                <Image
                  src={loadedSession.user.image}
                  alt={loadedSession.user.name}
                  width={30}
                  height={30}
                  className="rounded-full"
                  objectFit="cover"
                />
              </button>
            )}
            <button className="">
              <Link href={"/checkout/cart"}>
                <a
                  className={`${
                    router.asPath === "/checkout/cart"
                      ? "text-yellow-500"
                      : "text-gray-200"
                  }text-2xl  list-none cursor-pointer hover:text-yellow-400`}
                >
                  {!isLoading && (
                    <CartIcon
                      itemCount={cartItems?.reduce(
                        (acc, item) => acc + +item.qty,
                        0
                      )}
                    />
                  )}
                </a>
              </Link>
            </button>
          </div>
        </div>
        <ul className={position.right}>
          {navLink.map((link) => (
            <li key={link.id} className="flex px-1 m-0 list-none ">
              <Link href={link.link}>
                <a
                  className={`${
                    router.asPath === link.link
                      ? "text-yellow-500"
                      : "text-gray-200"
                  } flex items-center md:block ml-4 mb-4 lg:ml-0 lg:mb-0 cursor-pointer py-1.5 lg:py-1 px-2 lg:px-1   hover:text-yellow-400 text-sm font-medium list-none uppercase`}
                >
                  {link.title}
                </a>
              </Link>
            </li>
          ))}
          {loadedSession && (
            <li className="px-1 m-0 text-base list-none">
              <button
                className="flex items-center bg-white border-2 border-yellow-500 rounded-full"
                onClick={toggleUserDropdown}
              >
                <Image
                  src={loadedSession.user.image}
                  alt={loadedSession.user.name}
                  width={30}
                  height={30}
                  className="rounded-full"
                  objectFit="cover"
                />
              </button>
              <div
                className={
                  isDropDownOpen
                    ? "absolute right-0 z-20 w-32 mt-2 overflow-hidden bg-gray-900 rounded-md shadow-xl"
                    : "hidden"
                }
                ref={ref}
              >
                <div>
                  <button className="flex items-center px-4 py-2 space-x-2">
                    <FaUser className="text-gray-200 " />
                    <Link href={"/account/profile"}>
                      <a
                        className={`${
                          router.asPath === "/account/login"
                            ? "text-yellow-500"
                            : "text-gray-200"
                        } block text-lg font-medium  uppercase list-none cursor-pointer hover:text-yellow-400`}
                      >
                        Profile
                      </a>
                    </Link>
                  </button>
                  {loadedSession.user.isAdmin && (
                    <button className="flex items-center px-4 py-2 space-x-2">
                      <RiAdminFill className="text-gray-200 " />
                      <Link href={"/admin"}>
                        <a
                          className={`${
                            router.asPath === "/account/login"
                              ? "text-yellow-500"
                              : "text-gray-200"
                          } block text-lg font-medium  uppercase list-none cursor-pointer hover:text-yellow-400`}
                        >
                          admin
                        </a>
                      </Link>
                    </button>
                  )}
                  <button
                    className="flex items-center px-4 py-2 space-x-2 text-lg text-gray-200 hover:text-yellow-500"
                    onClick={logoutHandler}
                  >
                    <FiLogOut className="text-gray-200 " />
                    <p>Logout </p>
                  </button>
                </div>
              </div>
            </li>
          )}
          {!loadedSession && !loading && (
            <li className="px-1 m-0 list-none ">
              <button
                className={`${
                  router.asPath === "/account/login"
                    ? "text-yellow-500"
                    : "text-gray-200"
                } flex items-center px-1`}
                style={{
                  color: router.asPath === "/account/login" ? "orange" : "",
                }}
              >
                <FiLogIn className="text-base" />
                <Link href={"/account/login"}>
                  <a className="flex items-center md:block ml-4 mb-4 lg:ml-0 lg:mb-0 cursor-pointer py-1.5 lg:py-1 px-2 lg:px-1  text-sm font-medium list-none uppercase">
                    Sign In
                  </a>
                </Link>
              </button>
            </li>
          )}
          <button
            className={`${
              router.asPath === "/checkout/cart"
                ? "text-yellow-500"
                : "text-gray-200"
            } block text-2xl font-medium  uppercase list-none cursor-pointer hover:text-yellow-400flex items-center ml-1`}
            onClick={toggleCartDrawer}
          >
            <CartIcon
              itemCount={state.cart.cartItems?.reduce(
                (acc, item) => acc + item.qty,
                0
              )}
            />
          </button>
        </ul>
      </div>
      <CartContainer
        cartIsOpen={cartIsOpen}
        toggleCartDrawer={toggleCartDrawer}
      />
      <aside
        className={
          isOpen
            ? `${classNames.default} ${classNames.enabled}`
            : `${classNames.default} ${classNames.disabled}`
        }
        ref={mobileNavRef}
      >
        <div className="flex flex-col">
          <div className="flex items-center px-3 py-2 ml-4">
            <div className="mr-12">
              <button
                aria-label="Close"
                className=" py-1  text-4xl text-gray-200 cursor-pointer focus:outline-none"
                onClick={toggle}
              >
                &times;
              </button>
            </div>
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
                      className={`${
                        router.asPath === link.link
                          ? "text-yellow-500"
                          : "text-gray-200"
                      }flex items-center  ml-4 mb-2 cursor-pointer py-1.5  px-2   hover:text-yellow-400 text-lg font-medium list-none uppercase`}
                    >
                      {link.title}
                    </a>
                  </Link>
                </li>
              ))}
              {loadedSession ? (
                <>
                  <li className="px-1 m-0 text-base list-none text-md">
                    <button className="flex items-center py-1.5  px-2 mb-2 ml-4 space-x-2">
                      <FaUser className="text-gray-200 " />
                      <Link href={"/account/profile"}>
                        <a
                          className={`${
                            router.asPath === "/account/login"
                              ? "text-yellow-500"
                              : "text-gray-200"
                          }flex items-center text-lg font-medium  uppercase list-none cursor-pointer hover:text-yellow-400`}
                        >
                          Profile
                        </a>
                      </Link>
                    </button>
                  </li>
                  {loadedSession.user.isAdmin && (
                    <li className="px-1 m-0 text-base list-none text-md">
                      <button className="flex items-center py-1.5  px-2 mb-2 ml-4 space-x-2">
                        <RiAdminFill className="text-gray-200 " />
                        <Link href={"/admin"}>
                          <a
                            className={`${
                              router.asPath === "/account/login"
                                ? "text-yellow-500"
                                : "text-gray-200"
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
                      className="flex items-center  ml-4 mb-4 cursor-pointer py-1.5  px-2  space-x-2 text-gray-200 hover:text-gray-400 text-lg font-medium list-none uppercase"
                      onClick={logoutHandler}
                    >
                      <FiLogOut className="text-gray-200 " />
                      <p>Logout </p>
                    </button>
                  </li>
                </>
              ) : (
                <li className="flex items-center px-1 m-0 text-base list-none text-md">
                  <button className="flex items-center">
                    <FiLogIn className="ml-5 mr-1 text-gray-200 " />
                    <Link href={"/account/login"}>
                      <a
                        className={`${
                          router.asPath === "/account/login"
                            ? "text-yellow-500"
                            : "text-gray-200"
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
  default: `lg:hidden flex h-screen fixed top-0 right-0 transition-all ease duration-200`,
  enabled: `w-7/12 md:w-1/3 bg-gray-900 z-50  text-white overflow-y-hidden `,
  disabled: `w-0  bg-gray-800 text-white overflow-x-hidden`,
};

export default Navbar;
