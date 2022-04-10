import { Drawer } from "@mantine/core";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../context/auth/AuthContext";
import { UserInfoProps } from "../../lib/types";
import { CreateAdminForm } from "../Forms";

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
  const { state, createAdmin } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<UserInfoProps>>({
    defaultValues: {
      name: "",
      email: "",
      isAdmin: false,
      category: "administrator",
    },
  });

  const submitHandler: SubmitHandler<Partial<UserInfoProps>> = (data): void => {
    const displayName = data.name,
      email = data.email,
      isAdmin = data.isAdmin,
      category = data.category;
    createAdmin(displayName, email, isAdmin, category);
    reset();
    setIsOpenDrawer(false);
    refreshData();
  };

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
          errors={errors}
          buttonName="Create Admin"
          list={state?.categoryOptions}
        />
      </Drawer>
    </div>
  );
};

export default CreateAdmin;
