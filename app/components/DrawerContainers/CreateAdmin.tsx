"use client";
import { useCallback } from "react";
import { Drawer } from "@mantine/core";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserInfoProps } from "../../../lib/types";
import { CreateAdminForm } from "../Forms";
import { useCreateAdminMutation } from "../../global-state/features/users/userApiSlice";
import { useAppSelector } from "../../global-state/hooks";
import { userSelector } from "../../global-state/features/users/userSlice";
import { toast } from "react-toastify";

interface ICreateAdmin {
  isOpenDrawer: boolean;
  setIsOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  token?: string;
  refreshData: () => void;
}

const CreateAdmin = ({
  isOpenDrawer,
  setIsOpenDrawer,
  refreshData,
}: ICreateAdmin) => {
  const [createAdmin, { isLoading }] = useCreateAdminMutation();
  const { categoryOptions } = useAppSelector(userSelector);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserInfoProps>({
    defaultValues: {
      name: "",
      email: "",
      isAdmin: false,
      category: "Admin",
    },
  });

  const submitHandler: SubmitHandler<UserInfoProps> = useCallback(
    async (data) => {
      const displayName = data.name,
        email = data.email,
        isAdmin = data.isAdmin,
        category = data.category;

      try {
        const response = await createAdmin({
          name: displayName,
          email: email,
          isAdmin: isAdmin,
          category: category,
        }).unwrap();
        if (response.success)
          toast.success(response.message ?? "Admin Created Successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
        reset();
        setIsOpenDrawer(false);
        refreshData();
      } catch (error: any) {
        console.log(error);
        toast.error(error?.message ?? "Error creating admin", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    },
    []
  );

  return (
    <div>
      <Drawer
        opened={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        title="Create Admin"
        position="right"
        padding="xl"
        size="xl"
      >
        <CreateAdminForm
          handleSubmit={handleSubmit}
          submitHandler={submitHandler}
          register={register}
          errors={{}}
          buttonName="Create Admin"
          list={categoryOptions}
        />
      </Drawer>
    </div>
  );
};

export default CreateAdmin;
