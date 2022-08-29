import { createContext, useReducer, useContext, useEffect } from "react";
import { getSession } from "next-auth/react";
import { NEXT_URL } from "../../config";
// utils
import { uploadImage } from "../../lib/upload";
import { UserInfoProps } from "../../lib/types";

interface InitialAuthState {
  loading: boolean;
  success?: boolean;
  error?: any;
  image?: string;
  message?: string;
  categoryOptions?: string[];
  user: UserInfoProps | undefined;
}

const initialState = {
  loading: false,
  success: false,
  error: null,
  image: "",
  message: "",
  categoryOptions: ["customer", "administrator", "superAdmin"],
  user: undefined,
};

export enum ActionType {
  USER_ACTION_REQUEST = "USER_ACTION_REQUEST",
  USER_ACTION_FAIL = "USER_ACTION_FAIL",
  USER_ACTION_RESET = "USER_ACTION_RESET",
  USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS",
  USER_PROFILE_LOAD_SUCCESS = "USER_PROFILE_LOAD_SUCCESS",
  USER_UPDATE_PROFILE_SUCCESS = "USER_UPDATE_PROFILE_SUCCESS",
  USER_DELETE_SUCCESS = "USER_DELETE_SUCCESS",
  USER_EDIT_SUCCESS = "USER_EDIT_SUCCESS",
  USER_REQUEST_PASSWORD_RESET_SUCCESS = "USER_REQUEST_PASSWORD_RESET_SUCCESS",
  USER_RESET_PASSWORD_SUCCESS = "USER_RESET_PASSWORD_SUCCESS",
  USER_EMAIL_VERIFICATION_SUCCESS = "USER_EMAIL_VERIFICATION_SUCCESS",
  USER_IMAGE_UPLOAD_SUCCESS = "USER_IMAGE_UPLOAD_SUCCESS",
}

export const authContext = createContext<{
  state: InitialAuthState;
  dispatch: React.Dispatch<any>;
  registerUser: (
    displayName: string,
    email: string,
    password: string,
    isAdmin?: boolean,
    category?: string
  ) => void;
  createAdmin: (
    displayName: string,
    email: string,
    isAdmin?: boolean,
    category?: string
  ) => void;
  updateUserProfile: (user: UserInfoProps) => void;
  deleteUser: (id: string) => void;
  editUser: (
    id: string,
    image: string,
    displayName: string,
    email: string,
    isAdmin: boolean,
    category?: string
  ) => void;
  uploadUserImage: (base64EncodedImage: string | ArrayBuffer) => void;
  resetPassword: (password: string, token: string) => void;
  requestPasswordReset: (email: string) => void;
  resetUserPassword: (password: string, newPassword: string) => void;
}>({
  state: initialState,
  dispatch: () => null,
  registerUser: () => {},
  createAdmin: () => {},
  updateUserProfile: () => {},
  deleteUser: () => {},
  editUser: () => {},
  uploadUserImage: () => {},
  resetPassword: () => {},
  requestPasswordReset: () => {},
  resetUserPassword: () => {},
});

const { Provider } = authContext;

const authReducer = (state: InitialAuthState, action: any) => {
  switch (action.type) {
    case ActionType.USER_ACTION_REQUEST:
      return { ...state, loading: true };
    case ActionType.USER_ACTION_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ActionType.USER_ACTION_RESET:
      return { ...state, loading: false, success: false, error: null };
    case ActionType.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case ActionType.USER_PROFILE_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload,
      };
    case ActionType.USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case ActionType.USER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case ActionType.USER_REQUEST_PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case ActionType.USER_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case ActionType.USER_EMAIL_VERIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case ActionType.USER_IMAGE_UPLOAD_SUCCESS:
      return { ...state, loading: false, success: true, image: action.payload };
    case ActionType.USER_EDIT_SUCCESS:
      return { ...state, loading: false, success: true };
    default:
      return state;
  }
};

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        dispatch({
          type: ActionType.USER_PROFILE_LOAD_SUCCESS,
          payload: session.user,
        });
      }
    });
  }, []);

  /**
   * @desc Register a User or admin
   *
   * @param displayName
   * @param email
   * @param password
   */
  const registerUser = async (
    displayName: string,
    email: string,
    password: string
  ) => {
    try {
      dispatch({
        type: ActionType.USER_ACTION_REQUEST,
      });

      const res = await fetch(`${NEXT_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName,
          email,
          password,
          isAdmin: false,
          emailVerified: false,
          category: "customer",
          shippingAddress: {
            address: "",
            city: "",
            postalCode: "",
            country: "",
          },
        }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch({
          type: ActionType.USER_REGISTER_SUCCESS,
          payload: data.message,
        });
      }
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "User registration Unsuccessful. Please try again.";
      dispatch({
        type: ActionType.USER_ACTION_FAIL,
        payload: err,
      });
    }
  };
  const createAdmin = async (
    displayName: string,
    email: string,
    isAdmin?: boolean,
    category?: string
  ) => {
    try {
      dispatch({
        type: ActionType.USER_ACTION_REQUEST,
      });

      const res = await fetch(`${NEXT_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName,
          email,
          isAdmin: isAdmin,
          emailVerified: false,
          category: category,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch({
          type: ActionType.USER_REGISTER_SUCCESS,
          payload: data.message,
        });
      }
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "User registration Unsuccessful. Please try again.";
      dispatch({
        type: ActionType.USER_ACTION_FAIL,
        payload: err,
      });
    }
  };

  /**
   * @desc reset a Users password
   * @param password
   * @param token
   */
  const resetPassword = async (password: string, token: string) => {
    try {
      dispatch({
        type: ActionType.USER_ACTION_REQUEST,
      });

      const res = await fetch(`${NEXT_URL}/api/auth/reset-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch({
          type: ActionType.USER_RESET_PASSWORD_SUCCESS,
          payload: data.message,
        });
      }
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unable to reset password. Please try again.";
      dispatch({
        type: ActionType.USER_ACTION_FAIL,
        payload: err,
      });
    }
  };

  /**
   * @desc reset a Users password
   * @route PUT /api/users/reset-password
   * @param password
   * @param newPassword
   */
  const resetUserPassword = async (password: string, newPassword: string) => {
    try {
      dispatch({
        type: ActionType.USER_ACTION_REQUEST,
      });

      const res = await fetch(`${NEXT_URL}/api/users/reset-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch({
          type: ActionType.USER_RESET_PASSWORD_SUCCESS,
          payload: data.message,
        });
      }
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unable to reset password. Please try again.";
      dispatch({
        type: ActionType.USER_ACTION_FAIL,
        payload: err,
      });
    }
  };

  /**
   * @desc Update current logged in user profile details
   *
   * @param user
   * @returns {Promise<void>}
   */
  const updateUserProfile = async (user: UserInfoProps): Promise<void> => {
    try {
      dispatch({
        type: ActionType.USER_ACTION_REQUEST,
      });

      const res = await fetch(`${NEXT_URL}/api/users/updateUser`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch({
          type: ActionType.USER_UPDATE_PROFILE_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unable to update user details. Please try again.";
      dispatch({
        type: ActionType.USER_ACTION_FAIL,
        payload: err,
      });
    }
  };

  /**
   * @desc Delete User profile from the database
   *
   * @params  an id parameter to identify a single user to be deleted
   */

  const deleteUser = async (id: string): Promise<void> => {
    try {
      dispatch({
        type: ActionType.USER_ACTION_REQUEST,
      });

      const res = await fetch(`${NEXT_URL}/api/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        dispatch({
          type: ActionType.USER_DELETE_SUCCESS,
          payload: data.message,
        });
      }
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unable to delete user. Please try again.";
      dispatch({
        type: ActionType.USER_ACTION_FAIL,
        payload: err,
      });
    }
  };

  /**
   * @desc Admin only. Edit a users profile
   *
   * @param id
   * @param image
   * @param displayName
   * @param email
   * @param isAdmin
   */

  const editUser = async (
    id: string,
    image: string,
    displayName: string,
    email: string,
    isAdmin: boolean,
    category: string
  ) => {
    try {
      dispatch({
        type: ActionType.USER_ACTION_REQUEST,
      });

      const res = await fetch(`${NEXT_URL}/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ displayName, image, email, isAdmin, category }),
      });

      if (res.ok) {
        dispatch({
          type: ActionType.USER_EDIT_SUCCESS,
        });
      }
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Failed to edit user. Please try again.";
      dispatch({
        type: ActionType.USER_ACTION_FAIL,
        payload: err,
      });
    }
  };

  /**
   * @desc request a password reset link
   * @route POST /api/auth/request-reset
   * @access public
   * @param email
   */
  const requestPasswordReset = async (email: string): Promise<void> => {
    try {
      dispatch({
        type: ActionType.USER_ACTION_REQUEST,
      });

      const res = await fetch(`${NEXT_URL}/api/auth/request-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch({
          type: ActionType.USER_REQUEST_PASSWORD_RESET_SUCCESS,
          payload: data.message,
        });
      }
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Password reset request failed. Please try again.";
      dispatch({
        type: ActionType.USER_ACTION_FAIL,
        payload: err,
      });
    }
  };

  /**
   * @desc Upload a base64EncodedImage to cloudinary
   *
   * @param base64EncodedImage
   */
  const uploadUserImage = async (base64EncodedImage: string): Promise<void> => {
    try {
      dispatch({
        type: ActionType.USER_ACTION_REQUEST,
      });
      const data = await uploadImage(base64EncodedImage);
      console.log(
        "🚀 ~ file: AuthContext.tsx ~ line 513 ~ uploadUserImage ~ data",
        data
      );

      if (data) {
        dispatch({ type: ActionType.USER_IMAGE_UPLOAD_SUCCESS, payload: data });
      }
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unable to upload image. Please try again.";
      dispatch({
        type: ActionType.USER_ACTION_FAIL,
        payload: err,
      });
    }
  };

  return (
    <Provider
      value={{
        state,
        dispatch,
        registerUser,
        createAdmin,
        updateUserProfile,
        deleteUser,
        editUser,
        uploadUserImage,
        resetPassword,
        requestPasswordReset,
        resetUserPassword,
      }}
    >
      {children}
    </Provider>
  );
};

const useAuth = () => {
  return useContext(authContext);
};

export { AuthProvider, useAuth };
