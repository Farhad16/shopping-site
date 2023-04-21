import { useRouter } from "next/navigation";
import React from "react";
import Layout from "../../components/Layout";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Image from "next/image";
import Link from "next/link";
import { ProductEnum, useProductContext } from "../../utils/Product.store";
import { toast } from "react-toastify";
import db from "../../utils/db";
import Product from "../../models/Product";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function ProductDetails({ product }: any) {
  const router = useRouter();
  const { state, dispatch } = useProductContext();
  const [loading, setLoading] = React.useState(false);

  if (!product)
    return <Layout title="Product not found">Product not found</Layout>;

  const handleAddToCart = async () => {
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
    router.push("/cart");
  };

  return (
    <Layout title={product?.name}>
      <div className="mb-2">
        <Link href="/">
          <KeyboardBackspaceIcon /> Back to product
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-4 gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.slug}
            width={640}
            height={640}
          />
        </div>
        <div>
          <p>{product?.name}</p>
          <p>{product?.brand}</p>
          <p>Category: {product?.category}</p>
          <p>
            {product?.rating} of {product?.numReviews}
          </p>
          <p>{product?.description}</p>
        </div>
        <div>
          <div className="card">
            <div className="flex justify-between">
              <span>Price</span>
              <span>${product?.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Status</span>
              <span>{product?.stock ? "In stock" : "Unavailable"}</span>
            </div>
            <button
              className="cart-btn w-full"
              type="button"
              onClick={handleAddToCart}
            >
              {loading ? (
                <CircularProgress size="20px" className="text-white" />
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product?.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToString(product) : null,
    },
  };
}
