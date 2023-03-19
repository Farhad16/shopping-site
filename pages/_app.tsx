import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ProductStoreProvider } from "../utls/Product.store";
import { Notification } from "./notification/Notification";
import { SessionProvider } from "next-auth/react";
import Auth from "./auth/Auth";
import type { NextComponentType } from "next";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      <ProductStoreProvider>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
        <Notification />
      </ProductStoreProvider>
    </SessionProvider>
  );
}
