import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { ProductEnum, useProductContext } from "../../utils/Product.store";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import { CircularProgress, IconButton } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

function PlaceOrder() {
  const { dispatch, state } = useProductContext();
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const router = useRouter();

  const getRoundValue = (num: any) =>
    Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = getRoundValue(
    cartItems.reduce((a: any, c: any) => a + c.quantity * c.price, 0)
  ); // 123.4567 => 123.46

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = getRoundValue(itemsPrice * 0.15);
  const totalPrice = getRoundValue(itemsPrice + shippingPrice + taxPrice);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const hanldePlaceOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/place_order", {
        orderItems: cartItems,
        shippingAddress,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        paymentMethod,
      });
      setLoading(false);
      dispatch({ type: ProductEnum.CART_CLEAR });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data?._id}`);
    } catch (err: any) {
      toast.error(err.message, {
        position: "bottom-left",
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <h1 className="mb-4 text-xl font-semibold">Place Order</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2 className="mb-2 text-lg font-semibold">Shipping Address</h2>
              <div className="flex justify-between flex-row">
                <div>
                  {shippingAddress.name}, {shippingAddress.address},{" "}
                  {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                  {shippingAddress.country}
                </div>
                <Link href="/shipping">
                  <IconButton>
                    <EditIcon className="text-blue-500" />
                  </IconButton>
                </Link>
              </div>
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg font-semibold">Payment Method</h2>
              <div className="flex justify-between flex-row">
                <span>{paymentMethod}</span>
                <Link href="/payment">
                  <IconButton>
                    <EditIcon className="text-blue-500" />
                  </IconButton>
                </Link>
              </div>
            </div>
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg font-semibold">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item: any) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                            }}
                          ></Image>
                          <p className="ml-2"> {item.name}</p>
                        </Link>
                      </td>
                      <td className="p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="p-5 text-right">
                        ${item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="col-span-4 text-right" colSpan={4}>
                      <Link href="/cart">
                        <IconButton>
                          <EditIcon className="text-blue-500" />
                        </IconButton>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg font-semibold">Order Summary</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Tax</div>
                    <div>${taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total</div>
                    <div>${totalPrice}</div>
                  </div>
                </li>
                <li>
                  <button
                    disabled={loading}
                    onClick={hanldePlaceOrder}
                    className="cart-btn w-full"
                  >
                    {loading ? (
                      <CircularProgress size={20} className="text-white" />
                    ) : (
                      "Place Order"
                    )}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className="mt-6 flex">
        <button
          onClick={() => router.back()}
          type="button"
          className="default-btn"
        >
          Back
        </button>
      </div>
    </Layout>
  );
}

PlaceOrder.auth = true;
export default PlaceOrder;
