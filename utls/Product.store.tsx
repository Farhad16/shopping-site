import { createContext, useReducer, useContext } from "react";
import Cookies from "js-cookie";

export enum ProductEnum {
  ADD_TO_CART = "add_to_cart",
  REMOVE_FROM_CART = "remove_from_cart",
}

export const ProductStore = createContext({} as any);

export function useProductStore() {
  return useContext(ProductStore);
}

const initialState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart") || "")
    : { cartItems: [] },
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
