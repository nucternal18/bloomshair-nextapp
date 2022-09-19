import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { GetServerSideProps } from "next";

import styles from "../../styles/Home.module.css";

//Components
import Layout from "../../Layout/MainLayout/Layout";
import Button from "../../components/Button";
import Rating from "../../components/Rating";
import ErrorMessage from "../../components/ErrorMessage";

// Server URL
import { NEXT_URL } from "../../config";

// Context
import { useProduct } from "../../context/product/productContext";
import { useCart } from "../../context/cart/cartContext";
import { addToCart, saveQty } from "../../context/cart/cartActions";
import { toast } from "react-toastify";
import { CartItemsProps } from "@lib/types";
import { buildImage } from "@lib/cloudinaryUrl";

function ProductDetails({ product, productId, userInfo }) {
  const url = product.image.substring(61, product.image.lastIndexOf("."));
  const productImageUrl = buildImage(url).toURL();
  const router = useRouter();
  const { state, dispatch } = useCart();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const { createProductReview } = useProduct();

  useEffect(() => {
    setMounted(true);
  }, []);

  // const addToCartHandler = () => {
  //   const items: CartItemsProps = {
  //     product: product._id,
  //     name: product.name,
  //     image: product.image,
  //     price: product.price,
  //     countInStock: product.countInStock,
  //     qty: state.cart.qty,
  //   };

  //   dispatch(addToCart(items));
  // };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProductReview(productId, { rating, comment });
    toast.success("Review created successfully");
  };
  return (
    mounted && (
      <Layout title={product.name}>
        {" "}
        <main className="flex-grow w-full p-2 mx-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 md:p-4">
          <section className="container max-w-screen-lg px-2 pt-6 pb-8 mb-4 rounded shadow-xl md:px-12 md:mx-auto ">
            <div className="flex items-center justify-between mb-6 border-b-2 border-current border-gray-200">
              <div className="p-5">
                <Button
                  type="button"
                  color="dark"
                  onClick={() => router.replace(`${NEXT_URL}/products`)}
                >
                  Go Back
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 mt-2 md:grid-cols-2">
              <div className="w-full rounded-md">
                <Image
                  src={productImageUrl}
                  alt={product.name}
                  width={400}
                  height={400}
                  layout="responsive"
                  objectFit="cover"
                  quality={75}
                  priority
                  className="rounded-md"
                />
              </div>
              <div className="w-full px-4">
                <div>
                  <div className="mb-4">
                    <h1 className="text-4xl font-semibold ">{product.name}</h1>
                  </div>
                  <div className="mb-4">
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <div className="mb-4">
                      <div className="flex flex-row">
                        <span className="mr-2 font-semibold uppercase">
                          Price:
                        </span>
                        <span>
                          <strong>£ {Number(product.price).toFixed(2)}</strong>
                        </span>
                      </div>
                    </div>

                    {!product.name.includes("Nashi") && (
                      <div className="mb-4">
                        <div className="flex flex-row">
                          <span className="mr-1 font-semibold uppercase">
                            Status:
                          </span>
                          <span className="font-semibold uppercase">
                            {product.countInStock > 0
                              ? "In Stock"
                              : "Out of Stock"}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="mb-4">
                      <Button
                        color="dark"
                        type="button"
                        className="snipcart-add-item"
                        data-item-id={product._id}
                        data-item-price={product.price}
                        data-item-url={`/products/${product.slug}`}
                        data-item-image={productImageUrl}
                        data-item-name={product.name}
                        disabled={product.countInStock === 0}
                      >
                        <p className="text-xl font-semibold">
                          {product.countInStock > 0
                            ? "ADD TO CART"
                            : "Contact Us For Details"}
                        </p>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="mb-6 border-b-4 border-current border-gray-200">
                <h1 className="my-2 text-3xl font-semibold md:text-4xl ">
                  Product Description:
                </h1>
              </div>
              <div className={`mt-2 px-2 ${styles.description_text}`}>
                {parse(product.description)}
              </div>
            </div>
            {/* Reviews section */}
            <div className="mb-4">
              <div className="flex flex-col">
                <div className="mb-6 border-b-4 border-current border-gray-200">
                  <h1 className="my-2 text-3xl font-semibold md:text-4xl ">
                    Reviews
                  </h1>
                </div>
                {product.reviews.length === 0 && (
                  <ErrorMessage variant="default">No Reviews</ErrorMessage>
                )}
                <div className="flex flex-col">
                  {product.reviews.map((review) => (
                    <div key={review._id}>
                      <p className="mb-2 text-3xl font-semibold">
                        {review.name}
                      </p>
                      <Rating value={review.rating} />
                      <p className="my-2">
                        {review.createdAt.substring(0, 10)}
                      </p>
                      <p className="text-xl">{review.comment}</p>
                    </div>
                  ))}
                  <div>
                    <div className="mb-6 border-b-4 border-current border-gray-200">
                      <h2 className="my-4 text-2xl font-semibold md:text-3xl ">
                        Review this product
                      </h2>
                    </div>

                    {userInfo && userInfo.isAdmin ? (
                      <div className="flex flex-row py-3 mx-auto text-lg">
                        <p>
                          Please{" "}
                          <strong>
                            <Link href="/login">
                              <a>sign in</a>
                            </Link>
                          </strong>{" "}
                          as a customer to write a review
                        </p>
                      </div>
                    ) : userInfo && userInfo.emailVerified ? (
                      <div>
                        <form
                          onSubmit={submitHandler}
                          className="px-2 pt-6 pb-8 mx-2 mb-4 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 rounded md:w-2/4"
                        >
                          <div className="flex flex-col">
                            <label className="block my-2 text-lg font-bold ">
                              Rating
                            </label>
                            <motion.select
                              variants={{
                                visible: { opacity: 1 },
                                hidden: { opacity: 0 },
                              }}
                              transition={{ duration: 3, ease: "easeInOut" }}
                              className="w-full px-3 py-2 my-2 bg-white border rounded outline-none"
                              value={rating}
                              onChange={(e) =>
                                setRating(Number(e.target.value))
                              }
                            >
                              <option>Select...</option>
                              <option className="py-1" value="1">
                                1 - Poor
                              </option>
                              <option className="py-1" value="2">
                                2 - Fair
                              </option>
                              <option className="py-1" value="3">
                                3 - Good
                              </option>
                              <option className="py-1" value="4">
                                4 - Very Good
                              </option>
                              <option className="py-1" value="5">
                                5 - Excellent
                              </option>
                            </motion.select>
                          </div>
                          <div className="flex flex-col">
                            <label
                              htmlFor="comment"
                              className="block my-2 text-lg font-bold "
                            >
                              Comment
                            </label>
                            <textarea
                              className="w-full px-3 py-2 my-2 leading-tight text-gray-700 border rounded-lg appearance-none focus:outline-none "
                              rows={5}
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                          </div>
                          <Button type="submit" color="dark">
                            Submit
                          </Button>
                        </form>
                      </div>
                    ) : (
                      <div className="flex flex-row py-3 mx-auto text-lg">
                        <p>
                          Please{" "}
                          <strong>
                            <Link href="/auth/signin">
                              <a>sign in</a>
                            </Link>
                          </strong>{" "}
                          to write a review
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    )
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req;
  const session = await getSession({ req });
  const { slug } = context.params;

  if (!session) {
    const productRes = await fetch(`${NEXT_URL}/api/products/${slug}`);
    const productData = await productRes.json();
    return {
      props: {
        product: productData,
        productId: productData.id,
      },
    };
  }

  const [userRes, productRes] = await Promise.all([
    fetch(`${NEXT_URL}/api/users/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: context.req.headers.cookie,
      },
    }),
    fetch(`${NEXT_URL}/api/products/${slug}`),
  ]);

  const [userData, productData] = await Promise.all([
    userRes.json(),
    productRes.json(),
  ]);
  if (!productData) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      product: productData,
      productId: productData.id,
      userInfo: userData,
    }, // will be passed to the page component as props
  };
};

export default ProductDetails;
