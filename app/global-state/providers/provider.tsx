import React from "react";
import MantineRootProvider from "./mantine-provider";
import RTKProvider from "./rtk-provider";
import NextAuthProvider from "./nextauth-provider";
import NextThemeProvider from "./theme-provider";
import { ToastContainer } from "react-toastify";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RTKProvider>
        <NextAuthProvider>
          <NextThemeProvider>
            <MantineRootProvider>{children}</MantineRootProvider>
          </NextThemeProvider>
        </NextAuthProvider>
      </RTKProvider>
      <ToastContainer />
    </>
  );
}
