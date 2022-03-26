import React from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../../../components/Button";
import CreateService from "../../../components/ServiceContainer";
import AdminLayout from "../../../components/Layout/AdminLayout";

const HairServices = () => {
  const [opened, setOpened] = React.useState(false);
  return (
    <AdminLayout>
      <main className="w-full p-2 mx-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
        <section className="flex flex-col ">
          <div className="flex items-center justify-between mb-6 border-b-4 border-current border-gray-200">
            <div>
              <h1 className="p-3 text-4xl font-bold md:p-5 md:text-5xl">
                Services
              </h1>
            </div>
            <div className="text-sm ">
              <Button
                color="dark"
                type="button"
                onClick={() => setOpened((o) => !o)}
              >
                <FaPlus className="mr-1" /> Create Service
              </Button>
            </div>
          </div>
          <CreateService opened={opened} setOpened={setOpened} />
        </section>
      </main>
    </AdminLayout>
  );
};

export default HairServices;
