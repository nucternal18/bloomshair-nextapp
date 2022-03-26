import { Button, Group, TextInput } from "@mantine/core";

const ServiceForm = ({ handleSubmit, submitHandler, register, errors }) => {
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Group direction="column" spacing="xl" grow>
        <TextInput
          aria-label="service-name"
          placeholder="add service name"
          label="Service name"
          error={errors && errors.message.serviceName}
          {...register("serviceName", { required: true })}
        />
        <TextInput
          aria-label="service-price"
          placeholder="add price"
          label="Price"
          error={errors && errors.message.price}
          {...register("price", { required: true })}
        />
      </Group>
      <Group direction="row" mt="md">
        <Button type="submit" variant="filled">
          Add Service
        </Button>
      </Group>
    </form>
  );
};

export default ServiceForm;
