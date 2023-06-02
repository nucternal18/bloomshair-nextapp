"use client";
import { useCallback, useEffect } from "react";
import { Drawer } from "@mantine/core";
import { useForm, SubmitHandler } from "react-hook-form";

import { ServiceProps } from "../../../lib/types";
import ServiceForm from "../Forms/CreateServiceForm";
import { useAppSelector } from "app/global-state/hooks";
import { hairServiceSelector } from "@app/features/hairServices/hairServiceSlice";
import { useUpdateServiceMutation } from "@app/features/hairServices/hairServicesApiSlice";
import { toast } from "react-toastify";

interface IUpdateHairService {
  isOpenUpdateDrawer: boolean;
  setTsOpenUpdateDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

const UpdateService = ({
  isOpenUpdateDrawer,
  setTsOpenUpdateDrawer,
  refetch,
}: IUpdateHairService) => {
  const { service, category, categoryOptions } =
    useAppSelector(hairServiceSelector);
  const [updateService, { isLoading }] = useUpdateServiceMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<ServiceProps>>({
    defaultValues: {
      name: service?.name,
      price: service?.price,
      category: service?.category,
    },
  });

  useEffect(() => {
    const newServiceItem = {
      name: service?.name,
      price: service?.price,
      category: service?.category,
    };
    reset(newServiceItem);
  }, [service, isOpenUpdateDrawer]);

  const submitHandler: SubmitHandler<Partial<ServiceProps>> = useCallback(
    async (data) => {
      const updatedServiceItem = { ...data, id: service?.id };
      try {
        const response = await updateService(updatedServiceItem).unwrap();
        if (response.success) {
          toast.success(response.message ?? "Service Updated", {
            position: toast.POSITION.TOP_CENTER,
          });
          reset();
          setTsOpenUpdateDrawer(false);
          refetch();
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
          list={categoryOptions as string[]}
          buttonName="Update Service"
          loading={isLoading}
        />
      </Drawer>
    </div>
  );
};

export default UpdateService;
