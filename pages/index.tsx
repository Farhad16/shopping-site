import React from "react";
import Layout from "../components/Layout";
import Products from "../components/Products";
import db from "../utils/db";
import Product from "../models/Product";
import { useProductContext } from "../utils/Product.store";
import { toast } from "react-toastify";
import { ProductEnum } from "../utils/Product.store";
import axios from "axios";

export default function Home({ products }: any) {
  const { state, dispatch } = useProductContext();
  const [loading, setLoading] = React.useState(false);

  const handleAddToCart = async (product: any) => {
    setLoading(true);
    const existItem = state?.cart?.cartItems.find(
      (item: any) => item.slug === product?.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.stock < quantity) {
      toast.error("Product is out of stock", {
        position: "bottom-left",
        theme: "colored",
      });
      return;
    }

    dispatch({
      type: ProductEnum.ADD_TO_CART,
      payload: { ...product, quantity: quantity },
    });

    toast.success("Product added in the cart", {
      position: "bottom-left",
      theme: "colored",
    });
    setLoading(false);
  };

  return (
    <Layout title="Home page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product: any) => (
          <Products
            key={product.name}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db?.connect();
  const products = await Product?.find().lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToString),
    },
  };
}
