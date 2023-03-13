import Link from "next/link";
import React from "react";

const Products = ({ product }: any) => {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="object-contain w-full h-[300px]"
        />
      </Link>

      <div className="flex flex-col justify-center gap-2">
        <Link href={`product/${product?.slug}`}>
          <p className="text-lg">{product.name}</p>
        </Link>
        <p className="mb-2">Brand: {product?.brand}</p>
        <p>${product?.price}</p>
        <button className="cart-btn" type="button">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Products;
