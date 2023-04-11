import React from "react";
import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";
import Layout from "../../components/Layout";

const CartItems = dynamic(() => import("./CartItems"), {
  ssr: false,
  loading({ isLoading }) {
    if (isLoading)
      return (
        <Layout>
          <CircularProgress className="absolute top-[50%] right-[50%]" />
        </Layout>
      );
    return null;
  },
});

const Cart = () => {
  return <CartItems />;
};
export default Cart;
