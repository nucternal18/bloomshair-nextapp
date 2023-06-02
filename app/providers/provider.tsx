"use client";
import React from "react";
import MantineRootProvider from "./mantine-provider";
import NextThemeProvider from "./theme-provider";
import { ToastContainer } from "react-toastify";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextThemeProvider>
        <MantineRootProvider>{children}</MantineRootProvider>
      </NextThemeProvider>
      <ToastContainer />
    </>
  );
}
