import { useState, createContext, useEffect } from "react";

import { NEXT_URL } from "../../config";
import { uploadImage } from "../../lib/upload";

type ReviewProps = {
  rating: number;
  comment: string;
};

type ProductProps = {
  _id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  category: string;
  countInStock: number;
  description: string;
};

interface IProduct {
  createProduct: () => void;
  createProductReview: (productId: string, review: ReviewProps) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (props: ProductProps) => void;
  uploadProdImage: (base64EncodedImage: string | ArrayBuffer) => void;
  requestStatus: string;
  message: string;
  success: boolean;
  loading: boolean;
  error: string | Error | null;
  image: string;
  uploading: boolean;
}

export const ProductContext = createContext<IProduct>({
  createProductReview: () => {},
  createProduct: () => {},
  deleteProduct: () => {},
  updateProduct: () => {},
  uploadProdImage: () => {},
  requestStatus: "",
  message: "",
  success: false,
  loading: false,
  error: null,
  image: "",
  uploading: false,
});

const ProductContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);
  const [requestStatus, setRequestStatus] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  /**
   * Create a single product
   */
  const createProduct = async () => {
    try {
      setLoading(false);

      const response = await fetch(`${NEXT_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setLoading(false);
        setRequestStatus("success");
        setMessage("Product created successfully");
        setSuccess(true);
      } else {
        setLoading(false);
        setRequestStatus("error");
        setMessage("Unable to create product");
      }
    } catch (error) {
      setLoading(false);
      setRequestStatus("error");
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unable to create product";
      setError(err);
    }
  };

  /**
   *
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
  }) => {
    try {
      setLoading(true);

      await fetch(`${NEXT_URL}/api/products/${_id}`, {
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

      setLoading(false);
      setSuccess(true);
      setRequestStatus("success");
      setMessage("Product updated successfully");
    } catch (error) {
      setLoading(false);
      setRequestStatus("error");
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unable to update product";
      setError(err);
    }
  };

  /**
   *
   * @param id
   */
  const deleteProduct = async (id) => {
    try {
      setLoading(true);

      await fetch(`${NEXT_URL}/api/products/${id}`, {
        method: "DELETE",
      });

      setLoading(false);
      setSuccess(true);
      setRequestStatus("success");
      setMessage("Product deleted successfully");
    } catch (error) {
      setLoading(false);
      setRequestStatus("error");
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unable to delete product";
      setError(err);
    }
  };

  /**
   *
   * @param productId
   * @param review
   */
  const createProductReview = async (productId, review): Promise<void> => {
    try {
      setLoading(true);
      await fetch(`${NEXT_URL}/api/products/${productId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review }),
      });
      setLoading(false);
      setRequestStatus("success");
      setMessage("Product review created successfully");
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setRequestStatus("error");
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  /**
   * @desc Upload a base64EncodedImage to cloudinary
   * @param base64EncodedImage
   */
  const uploadProdImage = async (base64EncodedImage: string): Promise<void> => {
    setUploading(true);
    try {
      const data = await uploadImage(base64EncodedImage);
      setRequestStatus("success");
      setImage(data);
      setMessage("Image uploaded successfully");
      setUploading(false);
    } catch (error) {
      setRequestStatus("error");
      setMessage("Failed to upload image");
      console.error(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        createProductReview,
        createProduct,
        deleteProduct,
        updateProduct,
        uploadProdImage,
        uploading,
        image,
        requestStatus,
        message,
        success,
        loading,
        error,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
