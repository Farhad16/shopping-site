import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import { data } from "../../utls/staticData";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Image from "next/image";
import Link from "next/link";
import { ProductEnum, useProductStore } from "../../utls/Product.store";
import { IProduct } from "./interfaces/product.interface";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { query } = useRouter();
  const router = useRouter();
  const { slug } = query;
  const product = data?.products.find((pro: IProduct) => pro.slug === slug);
  const { state, dispatch } = useProductStore();

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    const existItem = state?.cart?.cartItems.find(
      (item: any) => item.slug === product?.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (quantity > product.stock) {
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
            layout="responsive"
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
              className="cart-btn"
              type="button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
