import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { Session } from "next-auth";
import { Loader } from "@mantine/core";
import { GetServerSidePropsContext } from "next";

//components
import FormContainer from "../../../components/FormContainer";
import Button from "../../../components/Button";
import AdminLayout from "../../../Layout/AdminLayout/AdminLayout";

// Redux ApiSlice imports
import {
  useUpdateProductMutation,
  useUploadProdImageMutation,
} from "../../../features/products/productApiSlice";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  productSelector,
  setError,
} from "../../../features/products/productSlice";

// lib/utils
import { NEXT_URL } from "@config/index";
import { ProductProps } from "@lib/types";
import ProductForm from "@components/AdminProductSection/ProductForm";
import useHasMounted from "@hooks/useHasMounted";

const ProductEditScreen = ({
  product,
  productId,
}: {
  product: ProductProps;
  productId: string;
  isLoading: string;
}): JSX.Element => {
  const router = useRouter();
  const hasMounted = useHasMounted();
  const [updateProduct, { isLoading: isLoadingUpdateProduct }] =
    useUpdateProductMutation();
  const [uploadProdImage, { isLoading: isLoadingUploadProdImage }] =
    useUploadProdImageMutation();
  const { image, error } = useAppSelector(productSelector);
  const [value, setValue] = useState(product.description);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductProps>({
    defaultValues: {
      name: product.name,
      slug: product.slug,
      price: product.price,
      brand: product.brand,
      category: product.category,
      countInStock: product.countInStock,
    },
  });

  const ALLOWED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];

  const submitHandler: SubmitHandler<ProductProps> = useCallback(
    async (data) => {
      try {
        const response = await updateProduct({
          id: productId,
          name: data.name,
          price: data.price,
          image: image ? image : product.image,
          brand: data.brand,
          category: data.category,
          countInStock: data.countInStock,
          description: value,
          slug: product.slug,
        }).unwrap();
        if (response.success)
          toast.success(response.message ?? "Product updated Successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
        router.replace("/admin/products");
      } catch (error: any) {
        console.log(error);
        toast.error(error.message ?? "Error updating product", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    },
    [image]
  );

  const uploadFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    const reader = new FileReader();
    if (ALLOWED_FORMATS.includes(file.type)) reader.readAsDataURL(file);
    reader.onloadend = async () => {
      reader && uploadProdImage(reader.result);
    };
    reader.onerror = () => {
      toast.error("something went wrong!");
    };
  };

  if (!hasMounted) {
    return (
      <AdminLayout>
        <main className="md:ml-56 h-screen p-4 mx-auto overflow-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-center">
            <Loader size="xl" variant="bars" />
          </div>
        </main>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <main className=" md:ml-56  p-4 my-4 mx-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
        <section className="container p-2 mx-2 rounded shadow-md md:mx-auto ">
          <div className="flex items-center justify-between px-4 mb-4 border-b-2 border-current border-gray-200">
            <div className="mt-6">
              <Button color="dark" type="button" onClick={() => router.back()}>
                Go Back
              </Button>
            </div>
            <div>
              <h1 className="p-5 mt-6 text-3xl font-thin md:text-5xl">
                Edit Product
              </h1>
            </div>
          </div>
          <FormContainer>
            <ProductForm
              handleSubmit={handleSubmit}
              submitHandler={submitHandler}
              errors={errors}
              error={error as string | Error | null}
              isLoading={isLoadingUpdateProduct as boolean}
              isLoadingImage={isLoadingUploadProdImage as boolean}
              image={image as string}
              product={product}
              uploadFileHandler={uploadFileHandler}
              register={register}
              value={value as string}
              setValue={
                setValue as React.Dispatch<React.SetStateAction<string>>
              }
            />
          </FormContainer>
        </section>
      </main>
    </AdminLayout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const req = context.req;
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

  const res = await fetch(`${NEXT_URL}/api/products/${context.params?.slug}`, {
    headers: {
      "Content-Type": "application/json",
      cookie: context.req.headers.cookie,
    } as HeadersInit,
  });
  const data = await res.json();

  return {
    props: {
      product: data,
      productId: data.id,
      isLoading: data ? false : true,
    }, // will be passed to the page component as props
  };
}

export default ProductEditScreen;
