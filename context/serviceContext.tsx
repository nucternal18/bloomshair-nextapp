import { useState, createContext, useReducer, useContext } from "react";

import { NEXT_URL } from "../config";

type ServiceProps = {
  _id?: string;
  name?: string;
  price?: number;
  category?: string;
  categoryOptions?: string[];
  createdAt?: string;
};

export interface IServiceState {
  service: ServiceProps;
  isLoading: boolean;
  error: string;
  success: boolean;
  message: string;
  isError: boolean;
}

export const initialState: IServiceState = {
  service: {
    _id: "",
    name: "",
    price: 0,
    category: "Gents Hair",
    categoryOptions: [
      "Gents Hair",
      "Ladies Hair",
      "Technical",
      "Hair Treatments",
    ],
  },
  isLoading: false,
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
}

const ServiceContext = createContext<{
  state: IServiceState;
  dispatch: React.Dispatch<any>;
  createService: (service: ServiceProps, cookie: string) => void;
}>({ state: initialState, dispatch: () => null, createService: () => null });

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
    default:
      return state;
  }
};

export const ServiceProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(serviceReducer, initialState);

  const createService = async (service: ServiceProps, cookie: string) => {
    try {
      const response = await fetch(`${NEXT_URL}/api/hair-services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
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
    } catch (error) {
      dispatch({
        type: ServiceActionTypes.ACTION_FAILURE,
        payload: error.message,
      });
    }
  };

  return (
    <ServiceContext.Provider value={{ state, dispatch, createService }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  return useContext(ServiceContext);
};
