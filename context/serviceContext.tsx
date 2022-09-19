import {
  useState,
  createContext,
  useReducer,
  useContext,
  ReactElement,
} from "react";

import { NEXT_URL } from "../config";
import { ServiceCategory, ServiceProps } from "../lib/types";

export interface IServiceState {
  service: ServiceProps;
  isLoading: boolean;
  error: string;
  success: boolean;
  message: string;
  isError: boolean;
}

export const initialServiceState: IServiceState = {
  service: {
    id: "",
    name: "",
    price: 0,
    category: ServiceCategory.Gents_Hair,
    categoryOptions: [
      "Gents Hair",
      "Ladies Hair",
      "Technical",
      "Hair Treatments",
    ],
    sortBy: "latest",
    sortByOptions: ["latest", "oldest"],
  },
  isLoading: true,
  error: "",
  success: false,
  message: "",
  isError: false,
};

export enum ServiceActionTypes {
  ACTION_REQUEST = "ACTION_REQUEST",
  ACTION_FAILURE = "ACTION_FAILURE",
  ADD_SERVICE = "ADD_SERVICE",
  UPDATE_SERVICE = "UPDATE_SERVICE",
  DELETE_SERVICE = "DELETE_SERVICE",
  FETCH_SERVICE_ITEM = "FETCH_SERVICE_ITEM",
}

// ***** Create Context *****
const ServiceContext = createContext<{
  state: IServiceState;
  dispatch: React.Dispatch<any>;
  createService: (service: ServiceProps, cookie: string) => void;
  updateServiceItem: (service: ServiceProps, cookie: string) => void;
  fetchServiceItem: (data: ServiceProps) => void;
  deleteServiceItem: (id: string, cookie: string) => void;
}>({
  state: initialServiceState,
  dispatch: () => null,
  createService: () => null,
  updateServiceItem: () => null,
  fetchServiceItem: () => null,
  deleteServiceItem: () => null,
});

// ***** Reducer *****
const serviceReducer = (state: IServiceState, action: any) => {
  switch (action.type) {
    case ServiceActionTypes.ACTION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ServiceActionTypes.ACTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isError: true,
      };
    case ServiceActionTypes.ADD_SERVICE:
      return {
        ...state,
        isLoading: false,
        success: true,
        message: action.payload,
      };
    case ServiceActionTypes.UPDATE_SERVICE:
      return {
        ...state,
        isLoading: false,
        success: true,
        message: action.payload,
      };
    case ServiceActionTypes.DELETE_SERVICE:
      return {
        ...state,
        isLoading: false,
        success: true,
        message: action.payload,
      };
    case ServiceActionTypes.FETCH_SERVICE_ITEM:
      return {
        ...state,
        isLoading: false,
        service: {
          categoryOptions: initialServiceState?.service?.categoryOptions,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

// ***** Provider *****
export const ServiceProvider = ({ children }: { children: ReactElement }) => {
  const [state, dispatch] = useReducer(serviceReducer, initialServiceState);

  // ***** Fetch Service Item *****
  /**
   *
   * @param data
   */
  const fetchServiceItem = async (data: ServiceProps) => {
    dispatch({ type: ServiceActionTypes.FETCH_SERVICE_ITEM, payload: data });
  };

  // ***** ADD SERVICE *****
  /**
   *
   * @param service
   * @param cookie
   */
  const createService = async (service: ServiceProps, cookie: string) => {
    try {
      dispatch({ type: ServiceActionTypes.ACTION_REQUEST });
      const response = await fetch(`${NEXT_URL}/api/hair-services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: cookie,
        },
        body: JSON.stringify({ service }),
      });
      const data = await response.json();
      if (data.error) {
        dispatch({
          type: ServiceActionTypes.ACTION_FAILURE,
          payload: data.error,
        });
      }
      dispatch({
        type: ServiceActionTypes.ADD_SERVICE,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ServiceActionTypes.ACTION_FAILURE,
        payload: error.message,
      });
    }
  };

  // ***** UPDATE SERVICE *****
  /**
   *
   * @param service
   * @param cookie
   */
  const updateServiceItem = async (service: ServiceProps, cookie: string) => {
    try {
      dispatch({ type: ServiceActionTypes.ACTION_REQUEST });
      const response = await fetch(
        `${NEXT_URL}/api/hair-services/${service.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            cookie: cookie,
          },
          body: JSON.stringify({ service }),
        }
      );
      const data = await response.json();
      if (data.error) {
        dispatch({
          type: ServiceActionTypes.ACTION_FAILURE,
          payload: data.error,
        });
      }
      dispatch({
        type: ServiceActionTypes.UPDATE_SERVICE,
        payload: data.message,
      });
    } catch (error: any) {
      dispatch({
        type: ServiceActionTypes.ACTION_FAILURE,
        payload: error.message,
      });
    }
  };

  // ***** DELETE SERVICE ITEM *****
  const deleteServiceItem = async (id: string, cookie: string) => {
    try {
      dispatch({ type: ServiceActionTypes.ACTION_REQUEST });
      const response = await fetch(`${NEXT_URL}/api/hair-services/${id}`, {
        method: "DELETE",
        headers: {
          cookie: cookie,
        },
      });
      const data = await response.json();
      if (data.error) {
        dispatch({
          type: ServiceActionTypes.ACTION_FAILURE,
          payload: data.error,
        });
      }
      dispatch({
        type: ServiceActionTypes.DELETE_SERVICE,
        payload: data.message,
      });
    } catch (error: any) {
      dispatch({
        type: ServiceActionTypes.ACTION_FAILURE,
        payload: error.message,
      });
    }
  };

  return (
    <ServiceContext.Provider
      value={{
        state,
        dispatch,
        createService,
        updateServiceItem,
        fetchServiceItem,
        deleteServiceItem,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  return useContext(ServiceContext);
};
