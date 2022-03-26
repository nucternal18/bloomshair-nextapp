import { Drawer, Button, Group, TextInput } from "@mantine/core";
import { useForm, SubmitHandler } from "react-hook-form";
import ServiceForm from "../Forms/ServiceForm";

type IFormData = {
  serviceName: string;
  price: number;
};
interface ICreateHairService {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateService = ({ opened, setOpened }: ICreateHairService) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      serviceName: "",
      price: 0,
    },
  });

  const submitHandler: SubmitHandler<IFormData> = (data): void => {
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
        />
      </Drawer>
    </div>
  );
};

export default CreateService;
