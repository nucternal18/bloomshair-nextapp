import { Drawer } from "@mantine/core";
import { useForm, SubmitHandler } from "react-hook-form";
import { useService } from "../../context/serviceContext";
import { IFormData } from "../../lib/types";
import ServiceForm from "../Forms/ServiceForm";

interface ICreateHairService {
  isOpenCreateDrawer: boolean;
  setTsOpenCreateDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  refreshData: () => void;
}

const CreateService = ({
  isOpenCreateDrawer,
  setTsOpenCreateDrawer,
  token,
  refreshData,
}: ICreateHairService) => {
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
    createService(data, token);
    reset();
    setTsOpenCreateDrawer(false);
    refreshData();
  };

  return (
    <div>
      <Drawer
        opened={isOpenCreateDrawer}
        onClose={() => setTsOpenCreateDrawer(false)}
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
          buttonName="Add Service"
        />
      </Drawer>
    </div>
  );
};

export default CreateService;
