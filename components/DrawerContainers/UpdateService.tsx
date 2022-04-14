import { Drawer } from "@mantine/core";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useService } from "../../context/serviceContext";
import { IFormData, ServiceProps } from "../../lib/types";
import ServiceForm from "../Forms/CreateServiceForm";

interface IUpdateHairService {
  isOpenUpdateDrawer: boolean;
  setTsOpenUpdateDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  refreshData: () => void;
  token: string;
}

const UpdateService = ({
  isOpenUpdateDrawer,
  setTsOpenUpdateDrawer,
  refreshData,
  token,
}: IUpdateHairService) => {
  const { state, updateServiceItem } = useService();
  const { service } = state;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<IFormData>>({
    defaultValues: {
      serviceName: service?.name,
      price: service?.price,
      category: service?.category,
    },
  });

  useEffect(() => {
    const newServiceItem = {
      serviceName: service?.name,
      price: service?.price,
      category: service?.category,
    };
    reset(newServiceItem);
  }, [service, isOpenUpdateDrawer]);

  const submitHandler: SubmitHandler<Partial<IFormData>> = (data): void => {
    const updatedServiceItem = { ...data, _id: service?._id };
    updateServiceItem(updatedServiceItem, token);
    reset();
    setTsOpenUpdateDrawer(false);
    refreshData();
  };

  return (
    <div>
      <Drawer
        opened={isOpenUpdateDrawer}
        onClose={() => setTsOpenUpdateDrawer(false)}
        title="Update Hair Service"
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
          buttonName="Update Service"
          loading={state?.isLoading}
        />
      </Drawer>
    </div>
  );
};

export default UpdateService;
