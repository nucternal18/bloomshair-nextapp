import React from "react";
import {
  FieldError,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { UserInfoProps } from "../../lib/types";
import Button from "../Button";
import FormCheckbox from "./FormComponents/FormCheckbox";
import FormRowInput from "./FormComponents/FormRowInput";
import FormRowSelect from "./FormComponents/FormRowSelect";

interface ICreateAdminForm {
  handleSubmit: UseFormHandleSubmit<Partial<UserInfoProps>>;
  submitHandler: (data: Partial<UserInfoProps>) => void;
  list: string[];
  register: UseFormRegister<Partial<UserInfoProps>>;
  errors: {
    name?: FieldError;
    email?: FieldError;
    isAdmin?: FieldError;
    category?: FieldError;
  };
  buttonName: string;
  loading?: boolean;
}

const CreateAdminForm = ({
  handleSubmit,
  submitHandler,
  register,
  errors,
  list,
  buttonName,
  loading,
}: ICreateAdminForm) => {
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col gap-4">
        <FormRowInput
          title="Name"
          type="name"
          inputType="text"
          errors={errors && errors?.name}
          {...register("name", {
            required: "This is required",
            minLength: {
              value: 2,
              message: "Please enter a name with at least 2 characters",
            },
            pattern: {
              value: /^[A-Za-z -]+$/,
              message: "Please enter a valid name",
            },
          })}
        />
        <FormRowInput
          title="Email"
          type="Email"
          inputType="email"
          errors={errors && errors?.email}
          {...register("email", {
            required: "This is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
          })}
        />
        <FormCheckbox
          label="Is Admin"
          type="isAdmin"
          {...register("isAdmin")}
        />
        <FormRowSelect
          name="Category"
          type="category"
          errors={errors && errors?.category}
          list={list}
          {...register("category")}
        />
        <Button type="submit" color="primary" disabled={loading}>
          {buttonName}
        </Button>
      </div>
    </form>
  );
};

export default CreateAdminForm;
