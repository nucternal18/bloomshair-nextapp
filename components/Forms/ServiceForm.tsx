import {
  FieldError,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { IFormData } from "../../lib/types";
import Button from "../Button";

import FormRowInput from "./FormComponents/FormRowInput";
import FormRowSelect from "./FormComponents/FormRowSelect";

interface IServiceForm {
  handleSubmit: UseFormHandleSubmit<Partial<IFormData>>;
  submitHandler: (data: Partial<IFormData>) => void;
  list: string[];
  register: UseFormRegister<Partial<IFormData>>;
  errors: {
    serviceName?: FieldError;
    price?: FieldError;
    category?: FieldError;
  };
}

const ServiceForm = ({
  handleSubmit,
  submitHandler,
  register,
  errors,
  list,
}: IServiceForm) => {
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col gap-4">
        <FormRowInput
          title="Service Name"
          type="serviceName"
          inputType="text"
          errors={errors && errors?.serviceName}
          {...register("serviceName")}
        />
        <FormRowInput
          title="Price"
          type="price"
          inputType="number"
          errors={errors && errors?.price}
          {...register(`price`)}
        />
        <FormRowSelect
          name="Category"
          type="category"
          errors={errors && errors?.category}
          list={list}
          {...register("category")}
        />
        <Button type="submit" color="primary">
          Add Service
        </Button>
      </div>
    </form>
  );
};

export default ServiceForm;
