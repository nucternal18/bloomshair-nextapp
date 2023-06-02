"use client";
import { useCallback } from "react";
import { Drawer } from "@mantine/core";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import { ServiceProps } from "../../../lib/types";
import ServiceForm from "../Forms/CreateServiceForm";
import { useAppSelector } from "app/global-state/hooks";
import { hairServiceSelector } from "@app/features/hairServices/hairServiceSlice";
import { useCreateServiceMutation } from "@app/features/hairServices/hairServicesApiSlice";

interface ICreateHairService {
  isOpenCreateDrawer: boolean;
  setTsOpenCreateDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

const CreateService = ({
  isOpenCreateDrawer,
  setTsOpenCreateDrawer,
  refetch,
}: ICreateHairService) => {
  const { category, categoryOptions } = useAppSelector(hairServiceSelector);
  const [createService] = useCreateServiceMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<ServiceProps>>({
    defaultValues: {
      name: "",
      price: 0,
      category: category,
    },
  });

  const submitHandler: SubmitHandler<Partial<ServiceProps>> = useCallback(
    async (data) => {
      try {
        const response = await createService(data as ServiceProps).unwrap();
        reset();
        setTsOpenCreateDrawer(false);
        refetch();
        if (response.success) {
          toast.success(response.message ?? "Service Created", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } catch (error: any) {
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    },
    []
  );

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
          list={categoryOptions as string[]}
          buttonName="Add Service"
        />
      </Drawer>
    </div>
  );
};

export default CreateService;
