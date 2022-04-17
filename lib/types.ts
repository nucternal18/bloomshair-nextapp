export type IFormData = {
  search?: string;
  price?: number;
  category?: string;
  sortBy?: string;
  serviceName?: string;
  image?: string | ArrayBuffer | null;
  name?: string;
  brand?: string;
  countInStock?: number;
};

export type ServiceProps = {
  _id?: string;
  name?: string;
  price?: number;
  category?: string;
  categoryOptions?: string[];
  createdAt?: string;
  updatedAt?: string;
  sortBy?: string;
  sortByOptions?: string[];
};

export type ReviewProps = {
  rating: number;
  comment: string;
};

export type ProductProps = {
  _id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  category: string;
  countInStock: number;
  description: string;
  rating?: number;
  numReviews?: number;
  slug?: string;
};

export type UserInfoProps = {
  id?: string;
  _id?: string;
  name: string;
  image?: string;
  token?: string;
  isAdmin?: boolean;
  email: string;
  emailVerified?: boolean;
  category?: string;
  shippingAddress?: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
};

export type PaymentResProps = {
  id: string;
  status: string;
  orderId: string;
  update_time: string;
  email_address: string;
};

export type paymentMethodProps = {
  paymentMethod: string;
};
export type ShippingAddressProps = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  deliveryMethod?: string;
};

export type CartItemsProps = {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
};

export type OrderProps = {
  orderItems?: CartItemsProps[];
  user?: {
    name: string;
    email: string;
  };
  shippingAddress?: ShippingAddressProps;
  paymentMethod?: string;
  itemsPrice?: number;
  shippingPrice?: number;
  taxPrice?: number;
  totalPrice?: number;
  isPaid?: boolean;
  paidAt?: Date;
  createdAt?: Date;
  deliveredAt?: Date;
  isDelivered?: boolean;
  _id?: string;
};

export type GalleryProps = {
  _id: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};
