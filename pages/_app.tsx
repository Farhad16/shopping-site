import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ProductStoreProvider } from "../utils/Product.store";
import { Notification } from "./notification/Notification";
import { SessionProvider } from "next-auth/react";
import Auth from "./auth/Auth";
import type { NextComponentType } from "next";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean };
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      <ProductStoreProvider>
        <PayPalScriptProvider
          deferLoading={true}
          options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT || "" }}
        >
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
          <Notification />
        </PayPalScriptProvider>
      </ProductStoreProvider>
    </SessionProvider>
  );
}
