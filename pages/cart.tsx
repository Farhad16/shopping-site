import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import { ProductEnum, useProductStore } from "../utls/Product.store";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Image from "next/image";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRouter } from "next/router";

const cart = () => {
  const { state, dispatch } = useProductStore();
  const {
    cart: { cartItems },
  } = state;
  const router = useRouter();

  const handleRemoveItem = (item: any) => {
    dispatch({ type: ProductEnum.REMOVE_FROM_CART, payload: item });
  };

  return (
    <Layout title="Shopping cart">
      <h1 className="text-xl mb-4">Shopping cart</h1>
      {!cartItems?.length ? (
        <Link href="/">
          <KeyboardBackspaceIcon /> Go to shopping
        </Link>
      ) : (
        <div className="grid grid-cols-4 md:gap-5">
          <div className="col-span-3">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="p-5 text-left">Item</th>
                  <th className="p-5">Quantity</th>
                  <th className="p-5">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item: any) => (
                  <tr key={item.slug} className="border border-b">
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex flex-row gap-4"
                      >
                        <Image
                          src={item.image}
                          alt={item.slug}
                          width={50}
                          height={50}
                        />
                        <span>{item.name}</span>
                      </Link>
                    </td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-center">${item.price}</td>
                    <td className="text-center">
                      <CancelIcon
                        className="cursor-pointer"
                        onClick={() => handleRemoveItem(item)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal (
                  {cartItems.reduce(
                    (acc: any, curr: any) => acc + curr.quantity,
                    0
                  )}
                  ) : $
                  {cartItems.reduce(
                    (acc: any, curr: any) => acc + curr.quantity * curr.price,
                    0
                  )}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push("login?redirect=/shipping")}
                  className="cart-btn"
                  type="button"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default cart;
