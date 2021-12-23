import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { FaPlusCircle } from "react-icons/fa";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

//components
import Spinner from "../../../components/Spinner";
import FormContainer from "../../../components/FormContainer";
import Button from "../../../components/Button";
import AdminLayout from "../../../components/Layout/AdminLayout";
const TextEditor = dynamic(() => import("../../../components/Editor"), {
  ssr: false,
});

//Context
import { useProduct } from "../../../context/product/productContext";

// Server Url
import { getUser } from "../../../lib/getUser";
import { NEXT_URL } from "../../../config";

const ProductEditScreen = (props): JSX.Element => {
  const router = useRouter();
  const { state, uploadProdImage, updateProduct } = useProduct();
  const { loading, image, error, message } = state;
  const [name, setName] = useState(props.product.name);
  const [price, setPrice] = useState(props.product.price);
  const [brand, setBrand] = useState(props.product.brand);
  const [category, setCategory] = useState(props.product.category);
  const [countInStock, setCountInStock] = useState(props.product.countInStock);
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState(props.product.description);

  const ALLOWED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];

  useEffect(() => {
    setMounted(true);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    updateProduct({
      _id: props.productId,
      name,
      price,
      image: image ? image : props.product.image,
      brand,
      category,
      countInStock,
      description: value,
    });
    toast.success(message);
    router.push("/admin/products");
  };

  const uploadFileHandler = async (e) => {
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

  return (
    mounted && (
      <AdminLayout>
        <main className="w-full h-screen p-4 mx-auto overflow-auto bg-gray-200">
          <section className="container px-2 pt-6 pb-8 mx-2 mt-6 mb-4 bg-white rounded shadow-2xl md:mx-auto ">
            <div className="flex items-center justify-between px-4 mb-4 border-b-4 border-current border-gray-200">
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
                <h1 className="p-5 mt-6 text-3xl font-bold md:text-5xl">
                  Edit Product
                </h1>
              </div>
            </div>
            <FormContainer>
              <form
                onSubmit={submitHandler}
                className="w-full px-12 pt-6 pb-8 mx-2 mb-4 bg-white sm:mx-auto"
              >
                <div className="flex flex-col items-center justify-around md:flex-row">
                  <div className="flex flex-col items-center w-full mb-4">
                    {image ? (
                      <Image src={image} alt={name} width={450} height={350} />
                    ) : (
                      <Image
                        src={props.product?.image}
                        alt={name}
                        width={250}
                        height={250}
                      />
                    )}
                    {loading ? (
                      <Spinner className="w-12 h-12" />
                    ) : (
                      <label className="block py-2 my-2 mr-2 text-base font-bold text-gray-700">
                        <FaPlusCircle className="text-4xl" />
                        <input
                          type="file"
                          onChange={uploadFileHandler}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  {error && <div className="justify-center">{error}</div>}
                  <div className="w-full">
                    <div className="flex flex-col w-full mb-4">
                      <label className="block mb-1 mr-2 text-base font-bold text-gray-700">
                        Name
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-500 border rounded shadow-md appearance-none focus:outline-none "
                        type="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></input>
                    </div>
                    <div className="flex flex-col mb-4">
                      <label className="block mb-1 mr-2 text-base font-bold text-gray-700">
                        Price
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-500 border rounded shadow-md appearance-none focus:outline-none "
                        type="number"
                        placeholder="Enter Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      ></input>
                    </div>

                    <div className="flex flex-col mb-4">
                      <label className="block mb-1 mr-2 text-base font-bold text-gray-700">
                        Brand
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-500 border rounded shadow-md appearance-none focus:outline-none "
                        type="text"
                        placeholder="Enter Brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      ></input>
                    </div>
                    <div className="flex flex-col mb-4">
                      <label className="block mb-1 mr-2 text-base font-bold text-gray-700">
                        Category
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-500 border rounded shadow-md appearance-none focus:outline-none "
                        type="text"
                        placeholder="Enter Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      ></input>
                    </div>
                    <div className="flex flex-col mb-4">
                      <label className="block mb-1 mr-2 text-base font-bold text-gray-700">
                        Count In Stock
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-500 border rounded shadow-md appearance-none focus:outline-none "
                        type="text"
                        placeholder="Enter Count In Stock"
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </div>
                <TextEditor value={value} setValue={setValue} />
                <div className="flex items-center justify-center px-4 pt-4 mb-4 border-t-4 border-current border-gray-200">
                  <Button type="submit" color="dark">
                    <p className="text-3xl font-semibold">Update</p>
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

export async function getServerSideProps(context) {
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
    props: { product: data.product, productId: id }, // will be passed to the page component as props
  };
}

export default ProductEditScreen;
