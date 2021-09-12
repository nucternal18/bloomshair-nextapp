import Link from "next/link";
import Image from "next/image";
import Rating from "./Rating";
import { Card, CardBody, CardTitle, CardText } from "./Card";

const Product = ({ product }) => {
  return (
    <Card>
      <Link href={`/products/${product._id}`}>
        <a>
          <Image
            src={product.image}
            alt={product.name}
            className="rounded"
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
        <div>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>
        <CardText className="text-xl">£{product.price.toFixed(2)}</CardText>
      </CardBody>
    </Card>
  );
};

export default Product;
