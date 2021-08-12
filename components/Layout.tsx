import React from "react";
import Head from "next/head";
import Navbar from "./navigation/Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";

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
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Welcome to Blooms Hair | Online Shop",
  description: "We sell great hair care products",
  keywords: "Hair Care, Shampoo, Conditioner, Nashi Hair Products",
};

export default Layout;
