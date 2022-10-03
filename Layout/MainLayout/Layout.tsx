import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";

import Navbar from "../../components/navigation/Navbar/Navbar";
import Footer from "../../components/Footer";
import { defaultSEO } from "next-seo.config";

interface ILayout {
  title?: string;
  description?: string;
  children: React.PropsWithChildren<React.ReactNode>;
}

function Layout({ title, description, children }: ILayout): JSX.Element {
  const router = useRouter();
  return (
    <div
      className="flex flex-col justify-between h-screen"
      aria-label="layout"
      data-testid="layout"
    >
      <Head>
        <title>{title} - Blooms Hair</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="application-name" content="Blooms Hair" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Blooms Hair" />
        <meta name="description" content={description} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${title} | Blooms Hair`} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="Blooms Hair" />
        <meta property="og:url" content="https://bloomshair.co.uk" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <DefaultSeo {...defaultSEO} />
      </Head>
      <Navbar />
      <main
        className={`relative ${router.asPath === "/" ? "mt-0" : "mt-24"} z-0`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Welcome to Blooms Hair",
  description:
    "Hair Salon. We sell great hair care products and provide a good hair service",
  keywords:
    "Hair Care, Shampoo, Conditioner, Nashi Hair Products, hair color, haircuts, blow-dry, coloring",
};

export default Layout;
