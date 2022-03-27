/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, createContext } from "react";

import { NEXT_URL } from "../config";

// utils
import { uploadImage } from "../lib/upload";

interface GalleryInterface {
  createPicture: (imgUrl) => void;
  deletePicture: (id: string) => void;
  uploadGalleryImage: (base64EncodedImage: string | ArrayBuffer) => void;
  requestStatus: string;
  success: boolean;
  loading: boolean;
  error: null;
  uploading: boolean;
  image: { url: string } | null;
  message: null;
}

export const GalleryContext = createContext<GalleryInterface | null>({
  createPicture: () => {},
  deletePicture: () => {},
  uploadGalleryImage: () => {},
  requestStatus: "",
  success: false,
  loading: false,
  error: null,
  uploading: false,
  image: null,
  message: null,
});

const GalleryContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [requestStatus, setRequestStatus] = useState("");

  /**
   *
   * @param imageUrl
   */
  const createPicture = async (imageUrl) => {
    try {
      setLoading(true);

      await fetch(`${NEXT_URL}/api/gallery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      });

      setLoading(false);
      setSuccess(true);
      setRequestStatus("success");
      setMessage("Picture created successfully");
    } catch (error) {
      setLoading(false);
      setRequestStatus("error");
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unable to create order";
      setError(err);
    }
  };

  /**
   *
   * @param id
   */
  const deletePicture = async (id) => {
    try {
      setLoading(true);

      await fetch(`${NEXT_URL}/api/gallery/${id}`, {
        method: "DELETE",
      });

      setLoading(false);
      setSuccess(true);
      setRequestStatus("success");
      setMessage("Picture deleted successfully");
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
   * @param base64EncodedImage
   */
  const uploadGalleryImage = async (base64EncodedImage) => {
    setUploading(true);

    try {
      const data = await uploadImage(base64EncodedImage);
      setRequestStatus("success");
      setMessage("Image uploaded successfully");
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <GalleryContext.Provider
      value={{
        createPicture,
        deletePicture,
        uploadGalleryImage,
        requestStatus,
        message,
        loading,
        success,
        uploading,
        error,
        image,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryContextProvider;
