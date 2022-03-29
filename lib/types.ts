export type IFormData = {
  search: string;
  price: number;
  category: string;
  sortBy?: string;
  serviceName?: string;
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
