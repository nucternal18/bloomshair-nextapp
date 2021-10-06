import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

import Navbar from "../navigation/Navbar";
import Footer from "../Footer";

interface ILayout {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

function Layout({ title, description, children }: ILayout): JSX.Element {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-between h-screen">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="og:title" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <main className={`relative ${router.asPath === "/" ? "mt-0" : "mt-20"}`}>
        {children}
      </main>
      <ToastContainer autoClose={4000} />
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Welcome to Blooms Hair | Online Shop",
  description:
    "Hair Salon. We sell great hair care products and provide a good hair service",
  keywords:
    "Hair Care, Shampoo, Conditioner, Nashi Hair Products, hair color, haircuts, blow-dry, coloring",
};

export default Layout;
