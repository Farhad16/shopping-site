import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ProductStoreProvider } from "../utls/Product.store";
import { Notification } from "./notification/Notification";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ProductStoreProvider>
        <Component {...pageProps} />
        <Notification />
      </ProductStoreProvider>
    </SessionProvider>
  );
}
