/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  useState,
  createContext,
  useReducer,
  useContext,
  ReactElement,
} from "react";

import { NEXT_URL } from "../config";

// utils
import { uploadImage } from "../lib/upload";

interface GalleryInterface {
  requestStatus: string;
  success: boolean;
  loading: boolean;
  error: null;
  uploading: boolean;
  image: string | null;
  message: null;
}

const initialGalleryState = {
  requestStatus: "",
  success: false,
  loading: false,
  error: null,
  uploading: false,
  image: null,
  message: null,
};

export enum ActionType {
  GALLERY_ACTION_REQUEST = "GALLERY_ACTION_REQUEST",
  GALLERY_ACTION_FAIL = "GALLERY_ACTION_FAIL",
  GALLERY_CREATE_SUCCESS = "GALLERY_CREATE_SUCCESS",
  GALLERY_DELETE_SUCCESS = "GALLERY_DELETE_SUCCESS",
  GALLERY_UPDATE_SUCCESS = "GALLERY_UPDATE_SUCCESS",
  GALLERY_CREATE_REVIEW_SUCCESS = "GALLERY_CREATE_REVIEW_SUCCESS",
  GALLERY_IMAGE_UPLOAD_REQUEST = "GALLERY_IMAGE_UPLOAD_REQUEST",
  GALLERY_IMAGE_UPLOAD_SUCCESS = "GALLERY_IMAGE_UPLOAD_SUCCESS",
}

export const GalleryContext = createContext<{
  state: GalleryInterface;
  dispatch: React.Dispatch<any>;
  createPicture: (imgUrl: string) => void;
  deletePicture: (id: string) => void;
  uploadGalleryImage: (base64EncodedImage: string | ArrayBuffer) => void;
}>({
  state: initialGalleryState,
  dispatch: () => null,
  createPicture: () => {},
  deletePicture: () => {},
  uploadGalleryImage: () => {},
});

const galleryReducer = (state: GalleryInterface, action: any) => {
  switch (action.type) {
    case ActionType.GALLERY_ACTION_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
        message: null,
      };
    case ActionType.GALLERY_ACTION_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        uploading: false,
        error: action.payload,
        message: null,
      };
    case ActionType.GALLERY_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        uploading: false,
        success: true,
        error: null,
        message: action.payload,
        image: null,
      };
    case ActionType.GALLERY_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        message: action.payload,
      };
    case ActionType.GALLERY_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        message: action.payload,
        image: null,
      };
    case ActionType.GALLERY_IMAGE_UPLOAD_REQUEST:
      return {
        ...state,
        uploading: true,
        success: false,
        error: null,
      };
    case ActionType.GALLERY_IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        uploading: false,
        success: true,
        error: null,
        image: action.payload,
      };
    default:
      return state;
  }
};

const GalleryContextProvider = ({ children }: { children: ReactElement }) => {
  const [state, dispatch] = useReducer(galleryReducer, initialGalleryState);

  /**
   *@description - upload a new picture
   * @param imageUrl
   */
  const createPicture = async (imageUrl: string) => {
    try {
      dispatch({ type: ActionType.GALLERY_ACTION_REQUEST });

      const res = await fetch(`${NEXT_URL}/api/gallery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (res.ok) {
        dispatch({
          type: ActionType.GALLERY_CREATE_SUCCESS,
          payload: "Picture created",
        });
      }
    } catch (error: any) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unable to create order";
      dispatch({ type: ActionType.GALLERY_ACTION_FAIL, payload: err });
    }
  };

  /**
   *
   * @param id
   */
  const deletePicture = async (id: string) => {
    try {
      dispatch({ type: ActionType.GALLERY_ACTION_REQUEST });

      const res = await fetch(`${NEXT_URL}/api/gallery/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        dispatch({
          type: ActionType.GALLERY_DELETE_SUCCESS,
          payload: "Picture deleted",
        });
      }
    } catch (error: any) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unable to delete product";
      dispatch({ type: ActionType.GALLERY_ACTION_FAIL, payload: err });
    }
  };

  /**
   *
   * @param base64EncodedImage
   */
  const uploadGalleryImage = async (
    base64EncodedImage: string | ArrayBuffer
  ) => {
    try {
      dispatch({ type: ActionType.GALLERY_IMAGE_UPLOAD_REQUEST });
      const data = await uploadImage(base64EncodedImage);
      dispatch({
        type: ActionType.GALLERY_IMAGE_UPLOAD_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unable to delete product";
      dispatch({ type: ActionType.GALLERY_ACTION_FAIL, payload: err });
    }
  };
  return (
    <GalleryContext.Provider
      value={{
        state,
        dispatch,
        createPicture,
        deletePicture,
        uploadGalleryImage,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

const useGallery = () => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error("useGallery must be used within a GalleryContextProvider");
  }
  return context;
};

export { GalleryContextProvider, useGallery };
