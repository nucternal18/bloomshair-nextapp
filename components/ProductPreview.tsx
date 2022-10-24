import React from "react";
import Image from "next/image";
import parse from "html-react-parser";
import Link from "next/link";

import Button from "./Button";
import Rating from "./Rating";
import { ProductProps } from "@lib/types";

import styles from "styles/Home.module.css";

interface IProductPreviewProps {
  product: ProductProps;
  productImageUrl: string;
}

const dev = process.env.NODE_ENV !== "production";
const NGROK_URL = "https://174a-77-100-6-97.eu.ngrok.io";

const ProductPreview = ({ product, productImageUrl }: IProductPreviewProps) => {
  return (
    <>
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
                value={product.rating as number}
                text={`${product.numReviews} reviews`}
              />
            </div>
          </div>
          <div>
            <div>
              <div className="mb-4">
                <div className="flex flex-row">
                  <span className="mr-2 font-semibold uppercase">Price:</span>
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
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              )}

              <div className="mb-4">
                {product.countInStock > 0 ? (
                  <Button
                    color="dark"
                    type="button"
                    className="snipcart-add-item"
                    data-item-id={product.id}
                    data-item-price={product.price}
                    data-item-url={
                      dev
                        ? `${NGROK_URL}/api/products/${product.slug}`
                        : `/api/products/${product.slug}`
                    }
                    data-item-description={product.description}
                    data-item-image={productImageUrl}
                    data-item-name={product.name}
                    data-item-weight={product.weight}
                    disabled={!!(product.countInStock === 0)}
                  >
                    <p className="text-xl font-semibold">ADD TO CART</p>
                  </Button>
                ) : (
                  <div className="focus:outline-none shadow rounded px-4 py-2 font-medium transition flex items-center justify-center border dark:border-none text-gray-200 bg-black">
                    <Link href="/contact-us">
                      <a className="text-xl font-semibold">
                        Contact Us For Details
                      </a>
                    </Link>
                  </div>
                )}
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
          {parse(product.description as string)}
        </div>
      </div>
    </>
  );
};

export default ProductPreview;
