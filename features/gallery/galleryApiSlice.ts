import { createEntityAdapter } from "@reduxjs/toolkit";
import { galleryApiSlice } from "app/api/apiSlice";
import { GalleryProps } from "@lib/types";
import { setImage, setError } from "./gallerySlice";

export const galleryAdapter = createEntityAdapter<GalleryProps>({});

export const galleryApi = galleryApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getImages: builder.query<GalleryProps[], void>({
      query: () => `/gallery`,
      providesTags: (result) =>
        result
          ? result.map((image) => ({
              type: "Gallery" as const,
              id: image.id,
            }))
          : ["Gallery"],
    }),
    addImage: builder.mutation<{ success: boolean; message: string }, string>({
      query: (image) => ({
        url: `/gallery`,
        method: "POST",
        body: { image },
      }),
      invalidatesTags: ["Gallery"],
    }),
    deleteImage: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/gallery/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Gallery"],
    }),
    uploadGalleryImage: builder.mutation<
      { image: string },
      string | ArrayBuffer | null
    >({
      query: (base64EncodedImage) => ({
        url: `/upload`,
        method: "POST",
        body: { data: base64EncodedImage },
      }),
      invalidatesTags: ["Gallery"],
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setImage(data.image));
        } catch (error: any) {
          if (error.response) {
            dispatch(
              setError({
                name: "UPLOAD_ERROR",
                success: false,
                message: error.response.data.message,
              })
            );
          } else {
            dispatch(
              setError({
                name: "UPLOAD_ERROR",
                success: false,
                message: error.message,
              })
            );
          }
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetImagesQuery,
  useAddImageMutation,
  useDeleteImageMutation,
  useUploadGalleryImageMutation,
} = galleryApi;
