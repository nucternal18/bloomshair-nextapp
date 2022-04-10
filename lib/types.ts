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
