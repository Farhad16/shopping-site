import React, { useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { CircularProgress } from "@mui/material";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "FETCH_ORDER":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "", order: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function OrderDetails() {
  const { query } = useRouter();
  const { id } = query;
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    order: {},
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_ORDER" });
        const { data } = await axios.get(`/api/orders/${id}`);
        console.log({ data });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err });
      }
    };

    if ((id && !order._id) || (order._id && order._id !== id)) {
      fetchOrder();
    }
  }, [id]);

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  return (
    <Layout title="Order Details">
      <h1 className="mb-4 text-xl font-semibold">{`Order ${id}`}</h1>
      {loading ? (
        <CircularProgress className="abosolute left-[50%] bottom-[50%]" />
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card  p-5">
              <h2 className="mb-2 text-lg font-semibold">Shipping Address</h2>
              <div>
                {shippingAddress?.name}, {shippingAddress?.address},{" "}
                {shippingAddress?.city}, {shippingAddress?.postalCode},{" "}
                {shippingAddress?.country}
              </div>
              {isDelivered ? (
                <div className="alert-success">Delivered at {deliveredAt}</div>
              ) : (
                <div className="alert-error">Not delivered</div>
              )}
            </div>

            <div className="card p-5">
              <h2 className="mb-2 text-lg font-semibold">Payment Method</h2>
              <div>{paymentMethod}</div>
              {isPaid ? (
                <div className="alert-success">Paid at {paidAt}</div>
              ) : (
                <div className="alert-error">Not paid</div>
              )}
            </div>

            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg font-semibold">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="    p-5 text-right">Quantity</th>
                    <th className="  p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems?.map((item: any) => (
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
                          {item.name}
                        </Link>
                      </td>
                      <td className=" p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="p-5 text-right">
                        ${item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
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
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

OrderDetails.auth = true;

export default OrderDetails;
