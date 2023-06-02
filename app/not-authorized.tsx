"use client";

import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";

import Button from "./components/Button";

function NotAuthorized() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      redirect("/");
    }, 5000);
  }, []);
  return (
    <section className="h-screen text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="flex flex-col items-center mt-20">
        <Image
          src={"/bloomslogo512x512.png"}
          alt="blooms hair logo"
          width={300}
          height={300}
        />
        <h1 className="my-5 text-6xl">Whoops!</h1>
        <h2 className="mb-5 text-4xl text-gray-500 text-center">
          Not authorized to access this page. Login as an administrator or go
          back to the home page.
        </h2>
        <div className="flex justify-center">
          <Button type="button" color="dark" onClick={() => router.back()}>
            GO BACK
          </Button>
        </div>
      </div>
    </section>
  );
}

export default NotAuthorized;
