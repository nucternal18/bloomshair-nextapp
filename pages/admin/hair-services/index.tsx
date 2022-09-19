import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";

// utils

import { NEXT_URL } from "@config/index";

// components
import Button from "@components/Button";
import { CreateService, UpdateService } from "@components/DrawerContainers";
import AdminLayout from "../../../Layout/AdminLayout";
import Table from "@components/Tables/ServiceTable";
import Spinner from "@components/Spinner";

// context
import { useService } from "@context/serviceContext";
import { IFormData, ServiceProps } from "@lib/types";
import { SearchForm } from "@components/Forms";

type Inputs = {
  category: string;
  sortBy: string;
};

const HairServices = ({
  services,
  token,
}: {
  services: ServiceProps[];
  token: string;
}) => {
  const router = useRouter();
  const [isOpenCreateDrawer, setTsOpenCreateDrawer] =
    React.useState<boolean>(false);
  const [isOpenUpdateDrawer, setTsOpenUpdateDrawer] =
    React.useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);
  const { fetchServiceItem, deleteServiceItem, state } = useService();
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      category: state.service?.category,
      sortBy: state.service?.sortBy,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {};
  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  useEffect(() => {
    setIsRefreshing(false);
  }, [services]);

  useEffect(() => {
    const subscribe = watch((data) => {
      const { sortBy, category } = data;
      const url = `${NEXT_URL}/admin/hair-services?sortBy=${sortBy}&category=${category}`;
      router.replace(url);
    });
    return () => subscribe.unsubscribe();
  }, [watch]);

  const handleUpdateDrawerOpen = async (id: string) => {
    const response = await fetch(`${NEXT_URL}/api/hair-services/${id}`, {
      headers: {
        cookie: token,
      },
    });
    const data = await response.json();
    if (response.ok) {
      fetchServiceItem(data.service);
    }
    setTsOpenUpdateDrawer(true);
  };

  const handleDelete = (id: string) => {
    deleteServiceItem(id, token);
    refreshData();
  };
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
            token={token}
            refreshData={refreshData}
          />
        </section>
        <section className="flex flex-col w-full my-4 mx-auto max-w-screen-lg drop-shadow-md rounded bg-white dark:bg-gray-900 ">
          <SearchForm
            register={register}
            categoryOptions={["all", ...(state.service.categoryOptions || [])]}
            sortByOptions={state?.service?.sortByOptions as string[]}
            errors={errors}
            reset={reset}
            handleSubmit={handleSubmit}
            submitHandler={onSubmit}
          />
        </section>
        <section className="flex flex-col w-full mx-auto max-w-screen-lg drop-shadow-md rounded bg-white dark:bg-gray-900 ">
          {isRefreshing ? (
            <div className="w-full h-full flex items-center justify-center">
              <Spinner message="refreshing..." />
            </div>
          ) : (
            <div>
              <Table
                tableData={services}
                handleDelete={handleDelete}
                handleUpdateDrawerOpen={handleUpdateDrawerOpen}
              />
            </div>
          )}
          <UpdateService
            isOpenUpdateDrawer={isOpenUpdateDrawer}
            setTsOpenUpdateDrawer={setTsOpenUpdateDrawer}
            token={token}
            refreshData={refreshData}
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
  let url = `hair-services?sortBy=${sortBy || "all"}&category=${
    category || "Gents Hair"
  }`;
  if (search) {
    url += `&search=${search}`;
  }

  const response = await fetch(`${NEXT_URL}/api/${url}`, {
    method: "GET",
  });
  const data = await response.json();
  return {
    props: {
      services: data,
      token: context.req.headers.cookie,
    }, // will be passed to the page component as props
  };
};

export default HairServices;
