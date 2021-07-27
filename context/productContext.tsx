import { useState, createContext, useEffect } from "react";

import { NEXT_URL } from "../config";

type ReviewProps = {
  rating: number;
  comment: string;
};

interface IProduct {
  createProductReview: (productId: string, review: ReviewProps) => void;
  requestStatus: string;
  message: string;
  success: boolean;
  loading: boolean;
  error: string | Error | null;
}

export const ProductContext = createContext<IProduct>({
  createProductReview: () => {},
  requestStatus: "",
  message: "",
  success: false,
  loading: false,
  error: null,
});

const ProductContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);
  const [requestStatus, setRequestStatus] = useState("");

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

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

  return (
    <ProductContext.Provider
      value={{
        createProductReview,
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
