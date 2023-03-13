import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ProductStoreProvider } from "../utls/Product.store";
import { Notification } from "./notification/Notification";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProductStoreProvider>
      <Component {...pageProps} />
      <Notification />
    </ProductStoreProvider>
  );
}
