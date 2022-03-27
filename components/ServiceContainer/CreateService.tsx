import { Drawer, Button, Group, TextInput } from "@mantine/core";
import { useForm, SubmitHandler } from "react-hook-form";
import { useService } from "../../context/serviceContext";
import { IFormData } from "../../lib/types";
import ServiceForm from "../Forms/ServiceForm";

interface ICreateHairService {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateService = ({ opened, setOpened }: ICreateHairService) => {
  const { state, createService } = useService();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<IFormData>>({
    defaultValues: {
      serviceName: "",
      price: 0,
      category: state?.service?.category,
    },
  });

  const submitHandler: SubmitHandler<Partial<IFormData>> = (data): void => {
    console.log(data);
    reset();
    setOpened(false);
  };

  return (
    <div>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create Hair Service"
        position="right"
        padding="xl"
        size="xl"
      >
        <ServiceForm
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          submitHandler={submitHandler}
          list={state?.service?.categoryOptions}
        />
      </Drawer>
    </div>
  );
};

export default CreateService;
