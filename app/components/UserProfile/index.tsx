"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { Loader } from "@mantine/core";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { toast } from "react-toastify";

import Avatar from "app/components/Avatar";
import Button from "app/components/Button";
import { UpdateUserForm, UpdateUserPassForm } from "app/components/Forms";
import Table from "app/components/OrdersTable/OrdersTable";
import EditImageModal from "./EditImageModal";
import { OrderProps, UserInfoProps } from "@lib/types";

// redux userApiSlice import
import { useRequestPasswordResetMutation } from "../../global-state/features/users/userApiSlice";

const UserProfileSection = ({
  refetch,
  user,
  isLoadingUser,
}: {
  isLoadingUser: boolean;
  user: UserInfoProps;
  refetch(): void;
}) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [requestPasswordReset] = useRequestPasswordResetMutation();

  const handleVerifyEmail = useCallback(async () => {
    try {
      const response = await requestPasswordReset(
        user.email as string
      ).unwrap();
      if (response?.success) {
        setResponseMessage(response?.message);
        toast.success(response?.message ?? "Email verification email sent", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error: any) {
      toast.error(error?.message ?? "Error sending email verification", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  }, []);

  if (isLoadingUser) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    );
  }

  return (
    <>
      <section className="  mt-2 w-full  space-y-4 py-6 sm:px-4">
        <h1 className="text-xl font-semibold">Profile Settings</h1>
        {!user?.isEmailVerified && (
          <div className="mb-4 flex items-center justify-between rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200  px-4 py-2 shadow-md">
            {!(responseMessage.length > 0) ? (
              <>
                <p className="font-poppins text-base">
                  <strong>Note:</strong> <span>Your email</span> (
                  <span className="text-primary">{user?.email}</span>) is
                  unverified.
                </p>
                <Button
                  type="button"
                  color="primary"
                  className="rounded-md bg-primary px-4 py-2 text-center font-semibold text-white transition delay-150 
                duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-secondary md:text-lg"
                  onClick={handleVerifyEmail}
                >
                  Verify
                </Button>
              </>
            ) : (
              <p>{responseMessage}</p>
            )}
          </div>
        )}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <section className="w-full space-y-4 lg:col-span-1">
            <div className="flex w-full items-center space-x-6 rounded-md bg-white dark:bg-gray-800  p-6 shadow-xl">
              <div className="mr-2">
                <Avatar
                  imageUrl={user?.image as string}
                  classes="rounded-lg bg-white w-24 h-24"
                />
              </div>
              <div className="space-y-2">
                <div>
                  <h1 className="text-base sm:text-lg font-semibold">
                    {user?.name}
                  </h1>
                </div>
                <Button
                  type="button"
                  color="primary"
                  onClick={() => setOpened(true)}
                >
                  Change Picture
                </Button>
              </div>
            </div>
          </section>
          <section className="space-y-4 lg:col-span-2">
            <div className=" w-full space-y-4 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 px-4 pt-6 pb-8 shadow-xl">
              <h1 className="text-xl font-bold">General Information</h1>
              <UpdateUserForm refetch={refetch} user={user} />
            </div>
            <div className="w-full space-y-4 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 px-4 pt-6 pb-8 shadow-xl">
              <h1 className="text-xl font-bold">Password Information</h1>
              <UpdateUserPassForm refetch={refetch} user={user} />
            </div>
          </section>
        </section>
        {/* Users orders list table */}
        <section className="px-4 pt-6 pb-8 mb-4  rounded shadow-xl  md:mx-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200">
          <div className="mb-6 border-b-2 border-current border-gray-200">
            <h1 className="my-2 text-3xl font-thin md:text-4xl ">My Orders</h1>
          </div>

          <Table tableData={user?.orders as OrderProps[]} />
        </section>
        <section className=" flex w-full flex-col items-center justify-between space-y-4 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-6 shadow-xl md:flex-row md:space-y-0">
          <div className="flex flex-col items-center space-y-2 text-gray-400 md:flex-row md:space-y-0 md:space-x-4">
            <Link href="#">
              <a className=" hover:cursor-pointer hover:underline">
                Terms and Conditions
              </a>
            </Link>
            <Link href="#">
              <a className=" hover:cursor-pointer hover:underline">
                Privacy Policy
              </a>
            </Link>
            <Link href="#">
              <a className="hover:cursor-pointer hover:underline">
                Cookie Policy
              </a>
            </Link>
            <Link href="/contact-us">
              <a className="hover:cursor-pointer hover:underline">Contact</a>
            </Link>
          </div>
          <div className="flex items-center space-x-4 text-gray-400 md:flex-row">
            <a href="#" className="hover:cursor-pointer ">
              <FaFacebook />
            </a>
            <a href="#" className="hover:cursor-pointer">
              <FaInstagram />
            </a>
            <a href="#" className="hover:cursor-pointer">
              <FaTwitter />
            </a>
          </div>
        </section>
      </section>
      <EditImageModal
        opened={opened}
        setOpened={setOpened}
        refetch={refetch}
        user={user}
      />
    </>
  );
};

export default UserProfileSection;
