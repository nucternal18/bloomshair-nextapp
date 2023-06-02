"use client";
import { Drawer } from "@mantine/core";
import { useForm, SubmitHandler } from "react-hook-form";

import { IFormData } from "@lib/types";
import CreateOrderForm from "app/components/Forms/CreateOrderForm";

interface ICreateOrder {
  isOpenDrawer: boolean;
  setIsOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  refreshData: () => void;
}

const CreateOrder = ({
  isOpenDrawer,
  setIsOpenDrawer,
  token,
  refreshData,
}: ICreateOrder) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<IFormData>>({
    defaultValues: {},
  });

  const submitHandler: SubmitHandler<Partial<IFormData>> = (data): void => {
    reset();
    setIsOpenDrawer(false);
    refreshData();
  };

  return (
    <div>
      <Drawer
        opened={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        position="right"
        padding="xl"
        size="xl"
        aria-labelledby="drawer-title"
        aria-describedby="drawer-body"
      >
        <h1 id="drawer-title" className="text-3xl font-thin border-b-2 ">
          Create Order
        </h1>
        <div id="drawer-body">
          <CreateOrderForm />
        </div>
      </Drawer>
    </div>
  );
};

export default CreateOrder;
