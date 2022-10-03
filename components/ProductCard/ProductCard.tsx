import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Cloudinary } from "@cloudinary/url-gen";

// components
import Rating from "../Rating";
import { Card, CardBody, CardTitle, CardText } from "../Card";
import Button from "../Button";

// redux
import { addToCart, cartSelector } from "features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { CartItemsProps, ProductProps } from "../../lib/types";
import { NEXT_URL } from "@config/index";

interface IProductCard {
  product: ProductProps;
  isAvailable?: boolean;
}

const cld = new Cloudinary({
  cloud: {
    cloudName: "dtkjg8f0n",
  },
  url: {
    secure: true, // force https, set to false to force http
  },
});

const dev = process.env.NODE_ENV !== "production";
const NGROK_URL = "https://07f6-77-100-6-97.eu.ngrok.io";

const ProductCard = ({ product, isAvailable }: IProductCard) => {
  const url = product.image.substring(61, product.image.lastIndexOf("."));
  const productImageUrl = cld.image(url).quality("auto").format("auto").toURL();
  const router = useRouter();

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
  return (
    <Card>
      <Link href={`/products/${product.slug}`}>
        <a>
          <Image
            src={productImageUrl}
            alt={product.name}
            className="rounded-t-lg"
            width={400}
            height={400}
            layout="responsive"
            objectFit="cover"
          />
        </a>
      </Link>
      <CardBody className="px-3">
        <CardTitle className="text-lg truncate">
          <Link href={`/products/${product.slug}`}>
            <a className="font-semibold ">{product.name}</a>
          </Link>
        </CardTitle>
        <div className="flex flex-row items-center justify-between">
          <Rating
            value={product.rating as number}
            text={`${product.numReviews} reviews`}
          />
          <CardText className="text-xl">
            £{Number(product.price).toFixed(2)}
          </CardText>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Button
            type="button"
            color="dark"
            className="rounded-lg"
            onClick={() => {
              router.replace(`${NEXT_URL}/products/${product.slug}`);
            }}
          >
            details
          </Button>
          {isAvailable && product.countInStock > 0 && (
            <Button
              type="button"
              color="dark"
              className="snipcart-add-item rounded-lg"
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
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
