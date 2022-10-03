import { IForm, ServiceProps } from "../../lib/types";
import Button from "../Button";

import FormRowInput from "./FormComponents/FormRowInput";
import FormRowSelect from "./FormComponents/FormRowSelect";

interface IServiceForm extends IForm<Partial<ServiceProps>> {
  list: string[];
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

export default ServiceForm;
