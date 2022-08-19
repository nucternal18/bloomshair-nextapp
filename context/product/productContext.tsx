/* eslint-disable @typescript-eslint/no-misused-promises */
import { createContext, useReducer, useContext } from "react";
import { NEXT_URL } from "../../config";
import { uploadImage } from "../../lib/upload";
import { ProductProps, ReviewProps } from "../../lib/types";

interface IProduct {
  requestStatus?: string;
  message?: string;
  success?: boolean;
  loading?: boolean;
  error?: string | Error | null;
  image?: string;
  uploading?: boolean;
  page?: number;
}

export enum ActionType {
  PRODUCT_ACTION_REQUEST = "PRODUCT_ACTION_REQUEST",
  PRODUCT_ACTION_FAIL = "PRODUCT_ACTION_FAIL",
  PRODUCT_CREATE_SUCCESS = "PRODUCT_CREATE_SUCCESS",
  PRODUCT_DELETE_SUCCESS = "PRODUCT_DELETE_SUCCESS",
  PRODUCT_UPDATE_SUCCESS = "PRODUCT_UPDATE_SUCCESS",
  PRODUCT_CREATE_REVIEW_SUCCESS = "PRODUCT_CREATE_REVIEW_SUCCESS",
  PRODUCT_IMAGE_UPLOAD_SUCCESS = "PRODUCT_IMAGE_UPLOAD_SUCCESS",
  CHANGE_PAGE = "CHANGE_PAGE",
  PRODUCT_ACTION_RESET = "PRODUCT_ACTION_RESET",
}

const initialState = {
  requestStatus: "",
  message: "",
  success: false,
  loading: false,
  error: null,
  image: "",
  uploading: false,
  page: 1,
};

export const ProductContext = createContext<{
  state: IProduct;
  dispatch: React.Dispatch<any>;
  createProduct: () => void | Promise<void>;
  createProductReview: (
    productSlug: string,
    review: ReviewProps
  ) => void | Promise<void>;
  deleteProduct: (productSlug: string, id: string) => void | Promise<void>;
  updateProduct: (props: ProductProps) => void | Promise<void>;
  uploadProdImage: (
    base64EncodedImage: string | ArrayBuffer
  ) => void | Promise<void>;
}>({
  state: initialState,
  dispatch: () => null,
  createProductReview: () => {},
  createProduct: () => {},
  deleteProduct: () => {},
  updateProduct: () => {},
  uploadProdImage: () => {},
});

export const productReducer = (state, action) => {
  switch (action.type) {
    case ActionType.PRODUCT_ACTION_REQUEST:
      return { ...state, loading: true };
    case ActionType.PRODUCT_ACTION_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ActionType.PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case ActionType.PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };
    case ActionType.PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case ActionType.PRODUCT_CREATE_REVIEW_SUCCESS:
      return { ...state, loading: false, success: true };
    case ActionType.PRODUCT_IMAGE_UPLOAD_SUCCESS:
      return { ...state, loading: false, success: true, image: action.payload };
    case ActionType.CHANGE_PAGE:
      return { ...state, page: action.payload.page };
    case ActionType.PRODUCT_ACTION_RESET:
      return { ...state, loading: false, success: false, error: null };
    default:
      return state;
  }
};

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  /**
   * Create a single product
   */
  const createProduct = async () => {
    try {
      dispatch({
        type: ActionType.PRODUCT_ACTION_REQUEST,
      });

      const response = await fetch(`${NEXT_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({
          type: ActionType.PRODUCT_CREATE_SUCCESS,
          payload: data.message,
        });
      }
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unable to create product";
      dispatch({
        type: ActionType.PRODUCT_ACTION_FAIL,
        payload: err,
      });
    }
  };

  /**
   * @desc update product details
   * @param _id
   *  @param name
   * @param description
   * @param price
   * @param image
   * @param brand
   * @param category
   * @param countInStock
   *
   */
  const updateProduct = async ({
    _id,
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
    slug,
  }) => {
    try {
      dispatch({
        type: ActionType.PRODUCT_ACTION_REQUEST,
      });

      const res = await fetch(`${NEXT_URL}/api/products/${slug}/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          image,
          brand,
          category,
          countInStock,
          description,
        }),
      });

      if (res.ok) {
        dispatch({
          type: ActionType.PRODUCT_UPDATE_SUCCESS,
          payload: "Product updated successfully",
        });
      }
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unable to update product";
      dispatch({
        type: ActionType.PRODUCT_ACTION_FAIL,
        payload: err,
      });
    }
  };

  /**
   * @desc delete a single product from database
   * @param id
   */
  const deleteProduct = async (productSlug: string, id: string) => {
    try {
      dispatch({
        type: ActionType.PRODUCT_ACTION_REQUEST,
      });

      const res = await fetch(`${NEXT_URL}/api/products/${productSlug}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        dispatch({
          type: ActionType.PRODUCT_DELETE_SUCCESS,
        });
      }
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unable to delete product";
      dispatch({
        type: ActionType.PRODUCT_ACTION_FAIL,
        payload: err,
      });
    }
  };

  /**
   *
   * @param productId
   * @param review
   */
  const createProductReview = async (
    productSlug: string,
    review: ReviewProps
  ) => {
    try {
      dispatch({
        type: ActionType.PRODUCT_ACTION_REQUEST,
      });
      await fetch(`${NEXT_URL}/api/products/${productSlug}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review }),
      });
      dispatch({
        type: ActionType.PRODUCT_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ActionType.PRODUCT_ACTION_FAIL,
        payload: err,
      });
    }
  };

  /**
   * @desc Upload a base64EncodedImage to cloudinary
   * @param base64EncodedImage
   */
  const uploadProdImage = async (base64EncodedImage: string): Promise<void> => {
    try {
      dispatch({
        type: ActionType.PRODUCT_ACTION_REQUEST,
      });
      const data = await uploadImage(base64EncodedImage);

      if (data) {
        dispatch({
          type: ActionType.PRODUCT_IMAGE_UPLOAD_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unable to upload image. Please try again.";
      dispatch({
        type: ActionType.PRODUCT_ACTION_FAIL,
        payload: err,
      });
    }
  };

  return (
    <ProductContext.Provider
      value={{
        state,
        dispatch,
        createProductReview,
        createProduct,
        deleteProduct,
        updateProduct,
        uploadProdImage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => {
  return useContext(ProductContext);
};

export { ProductContextProvider, useProduct };
