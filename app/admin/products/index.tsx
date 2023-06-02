import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";

// Components
import AdminLayout from "../../../Layout/AdminLayout/AdminLayout";

// utils
import { NEXT_URL } from "@config/index";
import { IProductPageProps, ProductProps } from "@lib/types";
import useHasMounted from "@hooks/useHasMounted";
import AdminProductSection from "app/components/AdminProductSection";
import { useGetProductsQuery } from "../../global-state/features/products/productApiSlice";

const Products = () => {
  const hasMounted = useHasMounted();

  return (
    hasMounted && (
      <AdminLayout>
        <main className="md:ml-56 h-screen p-2 mx-auto overflow-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
          <AdminProductSection />
        </main>
      </AdminLayout>
    )
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const req = ctx.req;
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
export default Products;
