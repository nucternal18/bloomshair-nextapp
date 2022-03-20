/* eslint-disable no-useless-escape */
import { useState } from "react";
import Image from "next/image";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";

//components
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import Spinner from "../Spinner";

function UpdateProfileForm({
  userData,
  submitHandler,
  image,
  uploading,
  handleSubmit,
  uploadError,
  register,
  errors,
  uploadFileHandler,
}) {
  return (
    <>
      <form
        aria-label="update-profile-form"
        data-testid="update-profile-form"
        onSubmit={handleSubmit(submitHandler)}
        className="w-full px-2 pt-6 pb-8 mb-4 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 rounded md:px-12 sm:mx-auto"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-around mb-4 md:flex-row">
          <div className="flex flex-col items-center w-full rounded-md">
            {image ? (
              <Image
                src={image}
                alt={userData.name}
                width={450}
                height={350}
                layout="responsive"
                objectFit="cover"
                className="rounded-md"
              />
            ) : (
              <Image
                src={userData.image}
                alt={userData.name}
                width={450}
                height={350}
                objectFit="cover"
                className="rounded-md"
              />
            )}
            {uploading ? (
              <Spinner message="Uploading image" />
            ) : (
              <label className="block py-2 my-2 mr-2 text-base font-bold text-gray-700">
                <FaPlusCircle className="text-4xl" />
                <input
                  type="file"
                  onChange={uploadFileHandler}
                  className="hidden"
                />
              </label>
            )}
            {uploadError && (
              <ErrorMessage variant="danger">{uploadError}</ErrorMessage>
            )}
          </div>
          <div className="w-full">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-base font-bold ">
                Name
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none "
                id="name"
                type="text"
                placeholder="Enter your name"
                {...register("name", {
                  required: "This is required",
                  minLength: {
                    value: 2,
                    message: "Please enter a name with at least 2 characters",
                  },
                  pattern: {
                    value: /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/,
                    message: "Please enter a valid name",
                  },
                })}
                defaultValue={userData.name}
              />
              {errors.name && (
                <ErrorMessage variant="danger">
                  {errors.name.message}
                </ErrorMessage>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-base font-bold "
              >
                Email Address
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none "
                id="email"
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: "This is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please enter a valid email address",
                  },
                })}
                defaultValue={userData.email}
              />
              {errors.email && (
                <ErrorMessage variant="danger">
                  {errors.email.message}
                </ErrorMessage>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-base font-bold "
              >
                Password
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none "
                id="password"
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "This is required",
                  minLength: {
                    value: 7,
                    message:
                      "Please enter a password with at least 7 characters",
                  },
                  maxLength: {
                    value: 15,
                    message:
                      "Please enter a password not more than 15 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{7,})/,
                    message:
                      "Password must contain at least one uppercase letter, one number and one special character",
                  },
                })}
              />
              {errors.password && (
                <ErrorMessage variant="danger">
                  {errors.password.message}
                </ErrorMessage>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-base font-bold "
              >
                Confirm Password
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none "
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "This is required",
                  minLength: {
                    value: 7,
                    message:
                      "Please enter a password with at least 7 characters",
                  },
                  maxLength: {
                    value: 15,
                    message:
                      "Please enter a password not more than 15 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{7,})/,
                    message:
                      "Password must contain at least one uppercase letter, one number and one special character",
                  },
                })}
              />
              {errors.confirmPassword && (
                <ErrorMessage variant="danger">
                  {errors.confirmPassword.message}
                </ErrorMessage>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center px-4 pt-4 mb-4 border-t-4 border-current border-gray-200">
          <Button type="submit" color="dark">
            Update
          </Button>
        </div>
      </form>
    </>
  );
}

export default UpdateProfileForm;
