import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import Button from "./Button";
import { ProductProps, UserInfoProps } from "@lib/types";
import ErrorMessage from "./ErrorMessage";
import Rating from "./Rating";

import { useCreateProductReviewMutation } from "../features/products/productApiSlice";
import { toast } from "react-toastify";

interface ProductReviewSectionProps {
  product: ProductProps;
  userInfo: UserInfoProps;
}

const ProductReviewSection = ({
  product,
  userInfo,
}: ProductReviewSectionProps) => {
  const [rating, setRating] = React.useState<number>(0);
  const [comment, setComment] = React.useState<string>("");
  const [createProductReview] = useCreateProductReviewMutation();

  const submitHandler = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const response = await createProductReview({
          slug: product?.slug as string,
          review: {
            rating,
            comment,
          },
        }).unwrap();
        if (response.success)
          toast.success(response.message ?? "Review created successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
      } catch (error: any) {
        toast.error(error.message ?? "Unable to create review", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    },
    [rating, comment]
  );
  return (
    <div>
      <div className="mb-4">
        <div className="flex flex-col">
          <div className="mb-6 border-b-4 border-current border-gray-200">
            <h1 className="my-2 text-3xl font-semibold md:text-4xl ">
              Reviews
            </h1>
          </div>
          {product.reviews?.length === 0 && (
            <ErrorMessage variant="default">No Reviews</ErrorMessage>
          )}
          <div className="flex flex-col">
            {product.reviews?.map((review: any) => (
              <div key={review.id}>
                <p className="mb-2 text-3xl font-semibold">{review.name}</p>
                <Rating value={review.rating} />
                <p className="my-2">{review.createdAt.substring(0, 10)}</p>
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
                        onChange={(e) => setRating(Number(e.target.value))}
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
    </div>
  );
};

export default ProductReviewSection;
