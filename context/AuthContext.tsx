import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { NEXT_URL } from "../config";

type UserInfoProps = {
  id: string;
  name: string;
  image: string;
  token?: string;
  isAdmin?: boolean;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
};

interface AuthContextProps {
  loading: boolean;
  success: boolean;
  error: any;
  requestStatus: string;
  image: string;
  uploading: boolean;
  message: string;
  uploadImage?: (base64EncodedImage: string | ArrayBuffer) => void;
  login?: (email: string, password: string) => void;
  register?: (
    displayName: string,
    email: string,
    password: string,
    isAdmin?: boolean
  ) => void;
  updateUserProfile?: (user: UserInfoProps) => void;
  logout?: () => void;
  setMessage?: (message: string) => void;
  setRequestStatus?: (requestStatus: string) => void;
  setError?: (error: string | Error | null) => void;
  checkUserLoggedIn?: () => Promise<{ user?: UserInfoProps | null }>;
}

export const authContext = createContext<AuthContextProps | null>({
  loading: false,
  success: false,
  error: null,
  requestStatus: "",
  image: "",
  uploading: false,
  message: "",
  uploadImage: () => {},
  login: () => {},
  register: () => {},
  updateUserProfile: () => {},
  logout: () => {},
  setMessage: () => {},
  setRequestStatus: () => {},
  setError: () => {},
  checkUserLoggedIn: () => null,
});

const { Provider } = authContext;

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [requestStatus, setRequestStatus] = useState("");
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  // Login User
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);

      const res = await fetch(`${NEXT_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const user = await res.json();

      if (res.ok) {
        setLoading(false);

        router.push("/");
      } else {
        setRequestStatus("error");
        setMessage(
          "Unable to login. Please check your login credentials and try again"
        );
        setError(user.message);
        setError(null);
      }
    } catch (error) {
      setRequestStatus("error");
      setMessage(
        "Unable to login. Please check your login credentials and try again"
      );
      setLoading(false);
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Login Unsuccessful. Please try again.";
      setError(err);
    }
  };

  // Register User
  const register = async (
    displayName: string,
    email: string,
    password: string,
    isAdmin: boolean
  ): Promise<void> => {
    try {
      setLoading(true);

      const res = await fetch(`${NEXT_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName,
          email,
          password,
          isAdmin,
        }),
      });

      if (res.ok) {
        setLoading(false);
        setRequestStatus("success");
        setMessage("User registered successfully");
        router.push("/account/login");
      } else {
        setRequestStatus("error");
        setMessage("Unable to register user");
        setError(null);
      }
    } catch (error) {
      setLoading(false);
      setRequestStatus("error");
      setMessage("Unable to register user");
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "User registration Unsuccessful. Please try again.";
      setError(err);
    }
  };

  // Check if user is logged in
  const checkUserLoggedIn = async (): Promise<{
    user?: UserInfoProps;
  } | null> => {
    const res = await fetch(`${NEXT_URL}/api/users/user`);
    const user = await res.json();

    if (res.ok) {
      return user;
    }
  };

  // Update User details
  const updateUserProfile = async (user: UserInfoProps): Promise<void> => {
    try {
      setLoading(true);

      const res = await fetch(`${NEXT_URL}/api/users/updateUser`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });

      const data = await res.json();

      if (res.ok) {
        setLoading(false);
        setRequestStatus("success");
        setMessage("Profile updated successfully");
      } else {
        setRequestStatus("error");
        setMessage("Unable to update user profile");
        setError(data.message);
        setError(null);
      }
    } catch (error) {
      setLoading(false);
      setMessage("Unable to update user profile");
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Unable to update user details. Please try again.";
      setError(err);
    }
  };

  const uploadImage = async (base64EncodedImage: string): Promise<void> => {
    setUploading(true);

    try {
      const response = await fetch(`${NEXT_URL}/api/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: base64EncodedImage }),
      });
      const data = await response.json();
      setRequestStatus("success");
      setImage(data.url);
      setMessage("Image uploaded successfully");
      setUploading(false);
    } catch (error) {
      setRequestStatus("error");
      setMessage("Failed to upload image");
      console.error(error);
    }
  };

  // Logout User clear state and cookies
  const logout = async (): Promise<void> => {
    const res = await fetch(`${NEXT_URL}/api/auth/logout`, {
      method: "POST",
    });
    if (res.ok) {
      setLoading(false);
      setSuccess(false);
      setError(null);
      router.push("/");
    }
  };
  return (
    <Provider
      value={{
        loading,
        success,
        error,
        requestStatus,
        image,
        uploading,
        message,
        uploadImage,
        login,
        register,
        updateUserProfile,
        logout,
        setMessage,
        setRequestStatus,
        setError,
        checkUserLoggedIn,
      }}
    >
      {children}
    </Provider>
  );
};

export default AuthProvider;
