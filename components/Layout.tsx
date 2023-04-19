import Head from "next/head";
import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children, title }: any) => {
  return (
    <>
      <Head>
        <title>{title ? title : "E-Shopping"}</title>
        <meta name="description" content="Ecommerce site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between text-black bg-[#ffffff]">
        <header>
          <Navbar />
        </header>
        <main className="flex-1 px-4 md:px-12 py-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          footer
        </footer>
      </div>
    </>
  );
};

export default Layout;
