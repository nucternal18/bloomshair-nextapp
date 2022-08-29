import {
  FieldError,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { IFormData, ServiceProps } from "../../lib/types";
import Button from "../Button";

import FormRowInput from "./FormComponents/FormRowInput";
import FormRowSelect from "./FormComponents/FormRowSelect";

interface IServiceForm {
  handleSubmit: UseFormHandleSubmit<Partial<ServiceProps>>;
  submitHandler: (data: Partial<ServiceProps>) => void;
  list: string[];
  register: UseFormRegister<Partial<ServiceProps>>;
  errors: {
    name?: FieldError;
    price?: FieldError;
    category?: FieldError;
  };
  buttonName: string;
  loading?: boolean;
}

const ServiceForm = ({
  handleSubmit,
  submitHandler,
  register,
  errors,
  list,
  buttonName,
  loading,
}: IServiceForm) => {
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col gap-4">
        <FormRowInput
          title="Service Name"
          type="serviceName"
          inputType="text"
          errors={errors && errors?.name}
          {...register("name")}
        />
        <FormRowInput
          title="Price"
          type="price"
          inputType="number"
          errors={errors && errors?.price}
          {...register("price")}
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

export default ServiceForm;
