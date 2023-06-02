"use client";
import React from "react";
import { usePathname } from "next/navigation";
import styles from "../styles/Home.module.css";

export default function RootLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <main
      className={`relative ${pathname === "/" ? "mt-0" : "mt-20"} z-0 h-screen`}
    >
      {children}
    </main>
  );
}
