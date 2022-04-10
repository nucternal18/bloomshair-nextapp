import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { FaPlusCircle } from "react-icons/fa";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";

//components
import Spinner from "../../../components/Spinner";
import FormContainer from "../../../components/FormContainer";
import Button from "../../../components/Button";
import AdminLayout from "../../../components/Layout/AdminLayout/AdminLayout";
const TextEditor = dynamic(() => import("../../../components/Editor"), {
  ssr: false,
});
import FormRowInput from "../../../components/Forms/FormComponents/FormRowInput";

//Context
import { useProduct } from "../../../context/product/productContext";

// Server Url
import { getUser } from "../../../lib/getUser";
import { NEXT_URL } from "../../../config";
import { GetServerSidePropsContext } from "next";
import { IFormData } from "../../../lib/types";

const ProductEditScreen = ({ product, productId, isLoading }): JSX.Element => {
  const router = useRouter();
  const { state, uploadProdImage, updateProduct } = useProduct();
  const { loading, image, error } = state;
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState(product.description);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<IFormData>>({
    defaultValues: {
      name: product.name,
      price: product.price,
      brand: product.brand,
      category: product.category,
      countInStock: product.countInStock,
    },
  });

  const ALLOWED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];

  useEffect(() => {
    setMounted(true);
  }, []);

  const submitHandler: SubmitHandler<Partial<IFormData>> = (data) => {
    updateProduct({
      _id: productId,
      name: data.name,
      price: data.price,
      image: image ? image : product.image,
      brand: data.brand,
      category: data.category,
      countInStock: data.countInStock,
      description: value,
    });
    router.replace("/admin/products");
  };

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (ALLOWED_FORMATS.includes(file.type)) reader.readAsDataURL(file);
    reader.onloadend = async () => {
      uploadProdImage(reader.result);
    };
    reader.onerror = () => {
      toast.error("something went wrong!");
    };
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <main className="w-full h-screen p-4 mx-auto overflow-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-center">
            <Spinner message="Loading Product Details..." />
          </div>
        </main>
      </AdminLayout>
    );
  }

  return (
    mounted && (
      <AdminLayout>
        <main className="w-full h-screen p-4 mx-auto overflow-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
          <section className="container px-2 pt-6 pb-8 mx-2 mt-6 mb-4 rounded shadow-2xl md:mx-auto ">
            <div className="flex items-center justify-between px-4 mb-4 border-b-2 border-current border-gray-200">
              <div className="mt-6">
                <Button
                  color="dark"
                  type="button"
                  onClick={() => router.back()}
                >
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
              <form
                onSubmit={handleSubmit(submitHandler)}
                className="w-full px-12 pt-6 pb-8 mx-2 mb-4  sm:mx-auto"
              >
                <div className="flex flex-col items-center justify-around md:flex-row">
                  {loading ? (
                    <Spinner message="loading..." />
                  ) : (
                    <div className="flex flex-col items-center w-full mb-2">
                      {image ? (
                        <Image
                          src={image}
                          alt={product?.name}
                          width={450}
                          height={350}
                        />
                      ) : (
                        <Image
                          src={product?.image}
                          alt={product?.name}
                          width={250}
                          height={250}
                        />
                      )}
                      <label className="block py-2 my-2 mr-2 text-base font-bold ">
                        <FaPlusCircle
                          fontSize={21}
                          className="text-4xl cursor-pointer"
                        />
                        <input
                          type="file"
                          onChange={uploadFileHandler}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                  {error && <div className="justify-center">{error}</div>}
                  <div className="w-full">
                    <div className="flex flex-col w-full mb-2">
                      <FormRowInput
                        type={"name"}
                        title={"Name"}
                        errors={errors}
                        inputType={"text"}
                        {...register("name")}
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <FormRowInput
                        type={"price"}
                        title={"Price"}
                        errors={errors}
                        inputType={"text"}
                        {...register("price")}
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <FormRowInput
                        type={"brand"}
                        title={"Brand"}
                        errors={errors}
                        inputType={"text"}
                        {...register("brand")}
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <FormRowInput
                        type={"category"}
                        title={"Category"}
                        errors={errors}
                        inputType={"text"}
                        {...register("category")}
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <FormRowInput
                        type={"countInStock"}
                        title={"Count In Stock"}
                        errors={errors}
                        inputType={"number"}
                        {...register("countInStock")}
                      />
                    </div>
                  </div>
                </div>
                <TextEditor value={value} setValue={setValue} />
                <div className="flex items-center justify-center px-4 pt-4 my-4 border-t-2 border-current border-gray-200">
                  <Button type="submit" color="dark">
                    <span className="text-2xl font-thin font-mono">Update</span>
                  </Button>
                </div>
              </form>
            </FormContainer>
          </section>
        </main>
      </AdminLayout>
    )
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params;
  const req = context.req;
  const session = await getSession({ req });

  if (!session) {
    // If no token is present redirect user to the login page
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }
  const userData = await getUser(req);

  if (!userData?.isAdmin) {
    return {
      redirect: {
        destination: "/not-authorized",
        permanent: false,
      },
    };
  }

  const res = await fetch(`${NEXT_URL}/api/products/${id}`);
  const data = await res.json();

  return {
    props: {
      product: data.product,
      productId: id,
      isLoading: data.product ? false : true,
    }, // will be passed to the page component as props
  };
}

export default ProductEditScreen;
