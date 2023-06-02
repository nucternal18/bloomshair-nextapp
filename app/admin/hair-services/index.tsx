import React, { useCallback, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { Loader } from "@mantine/core";

// utils/libs/config
import { IFormData, ServiceCategory, ServiceProps } from "@lib/types";
import { NEXT_URL } from "@config/index";

// components
import Button from "app/components/Button";
import { CreateService, UpdateService } from "app/components/DrawerContainers";
import AdminLayout from "../../../Layout/AdminLayout";
import Table from "app/components/Tables/ServiceTable";
import { SearchForm } from "app/components/Forms";

// context
import {
  useDeleteServiceMutation,
  useGetHairServicesQuery,
} from "@app/features/hairServices/hairServicesApiSlice";
import { useAppDispatch, useAppSelector } from "app/global-state/hooks";
import {
  hairServiceSelector,
  setSearchOptions,
} from "@app/features/hairServices/hairServiceSlice";
import { toast } from "react-toastify";

type Inputs = {
  category: string;
  sortBy: string;
};

const HairServices = () => {
  const dispatch = useAppDispatch();
  const [isOpenCreateDrawer, setTsOpenCreateDrawer] =
    React.useState<boolean>(false);
  const [isOpenUpdateDrawer, setTsOpenUpdateDrawer] =
    React.useState<boolean>(false);
  const [deleteService] = useDeleteServiceMutation();
  const { category, sortBy } = useAppSelector(hairServiceSelector);

  const {
    data: services,
    isLoading,
    error,
    refetch,
  } = useGetHairServicesQuery({ sortBy, category });

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      category: category,
      sortBy: sortBy,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {};

  useEffect(() => {
    const subscribe = watch((data) => {
      dispatch(
        setSearchOptions({
          sortBy: data.sortBy as string,
          category: data.category as ServiceCategory,
        })
      );
    });
    return () => subscribe.unsubscribe();
  }, [watch]);

  const handleUpdateDrawerOpen = async () => {
    setTsOpenUpdateDrawer(true);
  };

  const handleDelete = useCallback(async (id: string) => {
    try {
      const response = await deleteService(id).unwrap();
      if (response.success) {
        toast.success(response.message ?? "Service Deleted", {
          position: toast.POSITION.TOP_CENTER,
        });
        refetch();
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, []);
  return (
    <AdminLayout>
      <main className="md:ml-56  p-2 mx-auto min-h-screen text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
        <section className="flex flex-col w-full max-w-screen-lg mx-auto ">
          <div className="flex items-center justify-between mb-6 border-b-2 border-current border-gray-200">
            <div>
              <h1 className="p-3 text-4xl font-thin font-serif md:p-5 md:text-5xl">
                Services
              </h1>
            </div>
            <div className="text-sm ">
              <Button
                color="dark"
                type="button"
                onClick={() => setTsOpenCreateDrawer((open) => !open)}
              >
                <FaPlus className="mr-1" /> Create Service
              </Button>
            </div>
          </div>
          <CreateService
            isOpenCreateDrawer={isOpenCreateDrawer}
            setTsOpenCreateDrawer={setTsOpenCreateDrawer}
            refetch={refetch}
          />
        </section>
        <section className="flex flex-col w-full my-4 mx-auto max-w-screen-lg drop-shadow-md rounded bg-white dark:bg-gray-900 ">
          <SearchForm
            register={register}
            errors={errors}
            reset={reset}
            handleSubmit={handleSubmit}
            submitHandler={onSubmit}
          />
        </section>
        <section className="flex flex-col w-full mx-auto max-w-screen-lg drop-shadow-md rounded bg-white dark:bg-gray-900 ">
          {isLoading ? (
            <div className="w-full h-[700px] flex items-center justify-center">
              <Loader size="xl" variant="bars" />
            </div>
          ) : (
            <div>
              <Table
                tableData={services as ServiceProps[]}
                handleDelete={handleDelete}
                handleUpdateDrawerOpen={handleUpdateDrawerOpen}
              />
            </div>
          )}
          <UpdateService
            isOpenUpdateDrawer={isOpenUpdateDrawer}
            setTsOpenUpdateDrawer={setTsOpenUpdateDrawer}
            refetch={refetch}
          />
        </section>
      </main>
    </AdminLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const req = context.req;
  const { sortBy, category, search } = context.query;
  const session: Session = (await getSession({ req })) as Session;

  if (!session) {
    // If no token is present redirect user to the login page
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  if (!session.user?.isAdmin) {
    return {
      redirect: {
        destination: "/not-authorized",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
};

export default HairServices;
