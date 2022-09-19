import {
  AnyAction,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { productApiSlice } from "app/api/apiSlice";
import { setImage, setError } from "features/products/productSlice";
import { ProductProps, ReviewProps } from "@lib/types";

export const productAdapter = createEntityAdapter<ProductProps>({});

export const productApi = productApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      { products: ProductProps[]; pages: number; page: number },
      { page: number; keyword?: string }
    >({
      query: ({ page, keyword }) => ({
        url: `/products?page=${page || 1}&keyword=${keyword || ""}`,
        validateStatus: (response: any, result: any) => {
          return response.status === 201 && !result.isError;
        },
      }),
      providesTags: (result, error, arg) =>
        result
          ? result.products.map((product) => ({
              type: "Product",
              id: product.id,
            }))
          : [{ type: "Product", id: "LIST" }],
    }),
    createProduct: builder.mutation<
      { success: boolean; message: string },
      ProductProps
    >({
      query: (product) => ({
        url: `/products`,
        method: "POST",
        body: { ...product },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg?.id },
      ],
    }),
    updateProduct: builder.mutation<
      { success: boolean; message: string },
      ProductProps
    >({
      query: (product) => ({
        url: `/products/${product.slug}/update/${product.id}`,
        method: "PUT",
        body: { ...product },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg?.id },
      ],
    }),
    deleteProduct: builder.mutation<
      { success: boolean; message: boolean },
      { slug: string; id: string }
    >({
      query: ({ slug, id }) => ({
        url: `/products/${slug}/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg?.id },
      ],
    }),
    createProductReview: builder.mutation<
      { success: boolean; message: string },
      { slug: string; review: ReviewProps }
    >({
      query: ({ slug, review }) => ({
        url: `/products/${slug}/review`,
        method: "POST",
        body: { ...review },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: "List" },
      ],
    }),
    uploadProdImage: builder.mutation<
      { image: string },
      string | ArrayBuffer | null
    >({
      query: (base64EncodedImage) => ({
        url: `/upload`,
        method: "POST",
        body: { data: base64EncodedImage },
      }),
      invalidatesTags: [{ type: "Product", id: "List" }],
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setImage(data.image));
        } catch (error: any) {
          if (error.response) {
            dispatch(setError(error.response.data.message));
          } else {
            dispatch(setError(error.message));
          }
          console.log(error);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateProductReviewMutation,
  useUploadProdImageMutation,
} = productApi;
