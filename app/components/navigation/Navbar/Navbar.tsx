"use client";
/* eslint-disable react/display-name */
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTimes } from "react-icons/fa";
import { FiMoon, FiSun } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useTheme } from "next-themes";

// navlinks
import { navLink } from "../../../../data";
import { BloomsLogo } from "../../SVG/BloomsLogo";

const Navbar = () => {
  const path = usePathname();

  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartIsOpen, setCartIsOpen] = useState<boolean>(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [pos, setPos] = useState<string>("top");

  useEffect(() => {
    setMounted(true);
  }, []);

  // mobile nav bar ref
  const mobileNavRef = useRef<HTMLElement>(null);
  // user drop down ref
  const ref = useRef<HTMLDivElement>(null);

  // Close user drop down list when user clicks outside event window
  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (!ref.current?.contains(event.target as HTMLElement)) {
        if (!isDropDownOpen) return;
        toggleUserDropdown();
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [isDropDownOpen, ref]);

  // Close mobile nav drawer when user clicks outside event window
  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (!mobileNavRef.current?.contains(event.target as HTMLElement)) {
        if (!isOpen) return;
        toggle();
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, mobileNavRef]);

  // Check the top position of the navigation in the window
  useEffect(() => {
    const handleScrollTop = () => {
      const scrolled = document.scrollingElement?.scrollTop;
      if ((scrolled as number) >= 5) {
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

  return (
    <nav
      aria-label="main-navigation"
      data-testid="main-navigation"
      className={`top-0 z-10 flex flex-wrap items-center justify-between w-full px-2 py-2 text-gray-900 dark:text-gray-200 ${
        path === "/" && pos === "top"
          ? "bg-transparent absolute"
          : pos === "top"
          ? "absolute bg-white dark:bg-gray-900 "
          : "fixed shadow-b-2xl bg-white dark:bg-gray-900"
      }  navbar-expand-lg`}
    >
      <div className="container flex items-center justify-between mx-auto font-light  md:relative sm:px-1 md:px-0 md:flex-row">
        {mounted && (
          <Link
            href={"/"}
            className="inline-block p-0 m-0 text-2xl font-bold cursor-pointer md:mr-4 "
          >
            <BloomsLogo
              width={200}
              height={70}
              fill={`${
                path === "/" && pos === "top"
                  ? "#fff"
                  : resolvedTheme === "dark"
                  ? "#fff"
                  : "#000"
              }`}
            />
            <span hidden>Home</span>
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
                path === "/" && pos === "top"
                  ? "text-gray-200"
                  : "text-gray-900 dark:text-gray-200"
              } font-bold `}
            />
          </button>
          <div className="flex items-center lg:hidden"></div>
        </div>
        {/* Main Nav Links */}
        <ul className={position.right}>
          {navLink.map((link) => (
            <li key={link.id} className="flex px-1 m-0 list-none ">
              <Link
                href={link.link}
                className={`${
                  path === "/" && pos === "top"
                    ? "text-gray-200"
                    : path === link.link
                    ? "text-yellow-500"
                    : ""
                } flex items-center lg:block ml-0 mb-0 cursor-pointer py-1   hover:text-yellow-400 text-xs  font-normal list-none uppercase`}
              >
                {link.title}
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
                    path === "/" && pos === "top"
                      ? "text-gray-200"
                      : "text-gray-900 dark:text-gray-200"
                  } font-bold `}
                />
              ) : (
                <FiMoon
                  fontSize={18}
                  className={`${
                    path === "/" && pos === "top"
                      ? "text-gray-200"
                      : "text-gray-900 dark:text-gray-200"
                  } font-bold `}
                />
              )}
              <span hidden>toggle theme</span>
            </button>
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
                  <Link
                    href={link.link}
                    className={`${
                      path === link.link ? "text-yellow-500" : ""
                    }flex items-center  ml-4 mb-2 cursor-pointer py-1.5  px-2   hover:text-yellow-400 text-lg font-medium list-none uppercase`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
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
