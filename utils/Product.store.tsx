import { createContext, useReducer, useContext } from "react";
import Cookies from "js-cookie";

export enum ProductEnum {
  ADD_TO_CART = "add_to_cart",
  REMOVE_FROM_CART = "remove_from_cart",
  CART_RESET = "reset_cart",
  SAVE_SHIPPING_ADDRESS = "save_shipping_address",
  SAVE_PAYMENT_METHOD = "save_payment_method",
}

export const ProductStore = createContext({} as any);

export function useProductContext() {
  return useContext(ProductStore);
}

const initialState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart") || "")
    : { cartItems: [], shippingAddress: {}, paymentMethod: "" },
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case ProductEnum.ADD_TO_CART: {
      const newItem = action.payload;
      const itemExist = state.cart.cartItems.find(
        (item: any) => item.slug === newItem.slug
      );
      const cartItems = itemExist
        ? state.cart.cartItems.map((item: any) =>
            item.name === newItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case ProductEnum.REMOVE_FROM_CART: {
      const removeItem = action.payload;
      const cartItems = state.cart.cartItems.filter(
        (item: any) => item.slug !== removeItem.slug
      );
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case ProductEnum.CART_RESET: {
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: "",
        },
      };
    }
    case ProductEnum.SAVE_SHIPPING_ADDRESS: {
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };
    }
    case ProductEnum.SAVE_PAYMENT_METHOD: {
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };
    }
    default:
      return state;
  }
}

export const ProductStoreProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ProductStore.Provider value={{ state, dispatch }}>
      {children}
    </ProductStore.Provider>
  );
};
