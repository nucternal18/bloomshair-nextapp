import React from "react";
import {
  FieldError,
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { UserInfoProps, IForm } from "../../lib/types";
import Button from "../Button";
import FormCheckbox from "./FormComponents/FormCheckbox";
import FormRowInput from "./FormComponents/FormRowInput";
import FormRowSelect from "./FormComponents/FormRowSelect";

interface ICreateAdminForm extends IForm<UserInfoProps> {
  list: string[];
  buttonName: string;
  loading?: boolean;
  errors: Partial<FieldErrorsImpl<UserInfoProps>>;
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
          placeHolder="Select Category"
          label="Category"
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
