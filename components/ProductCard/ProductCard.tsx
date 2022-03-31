import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Rating from "../Rating";
import { Card, CardBody, CardTitle, CardText } from "../Card";
import Button from "../Button";
import { CartItemsProps } from "../../context/cart/cartState";
import { useCart } from "../../context/cart/cartContext";
import { addToCart } from "../../context/cart/cartActions";
import { ProductProps } from "../../lib/types";

interface IProductCard {
  product: ProductProps;
  isAvailable?: boolean;
}

const ProductCard = ({ product, isAvailable }: IProductCard) => {
  const router = useRouter();
  const { state, dispatch } = useCart();
  const addToCartHandler = () => {
    const items: CartItemsProps = {
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty: state.cart.qty,
    };

    dispatch(addToCart(items));
  };
  return (
    <Card>
      <Link href={`/products/${product._id}`}>
        <a>
          <Image
            src={product.image}
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
          <Link href={`/products/${product._id}`}>
            <a className="font-semibold ">{product.name}</a>
          </Link>
        </CardTitle>
        <div className="flex flex-row items-center justify-between">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
          <CardText className="text-xl">£{product.price.toFixed(2)}</CardText>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Button
            type="button"
            color="dark"
            className="rounded-lg"
            onClick={() => {
              router.push(`/products/${product._id}`);
            }}
          >
            details
          </Button>
          {isAvailable && product.countInStock > 0 && (
            <Button
              type="button"
              color="dark"
              className="rounded-lg"
              disabled={product.countInStock === 0}
              onClick={addToCartHandler}
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
