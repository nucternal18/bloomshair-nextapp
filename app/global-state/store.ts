import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {
  Action,
  AnyAction,
  configureStore,
  ThunkAction,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import {
  userApiSlice,
  productApiSlice,
  galleryApiSlice,
  hairServiceApiSlice,
  orderApiSlice,
} from "./api/apiSlice";
import userReducer from "./features/users/userSlice";
import productReducer from "@app/features/products/productSlice";
import hairServiceReducer from "@app/features/hairServices/hairServiceSlice";
import galleryReducer from "@app/features/gallery/gallerySlice";
import cartReducer from "@app/features/cart/cartSlice";
import orderReducer from "@app/features/orders/orderSlice";

const reducers = {
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [productApiSlice.reducerPath]: productApiSlice.reducer,
  [galleryApiSlice.reducerPath]: galleryApiSlice.reducer,
  [hairServiceApiSlice.reducerPath]: hairServiceApiSlice.reducer,
  [orderApiSlice.reducerPath]: orderApiSlice.reducer,
  user: userReducer,
  product: productReducer,
  hairService: hairServiceReducer,
  gallery: galleryReducer,
  cart: cartReducer,
  order: orderReducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer<any, AnyAction> = (
  state,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply data from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userApiSlice.middleware,
      productApiSlice.middleware,
      galleryApiSlice.middleware,
      hairServiceApiSlice.middleware,
      orderApiSlice.middleware,
    ]),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

const makeStore = () => store;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
