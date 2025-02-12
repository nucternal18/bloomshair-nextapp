"use client";
import { useEffect } from "react";
import { useRouter, redirect } from "next/navigation";
import Image from "next/image";
import Button from "../app/components/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    setTimeout(() => {
      redirect("/");
    }, 5000);
  }, [error]);

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
        <h2 className="mb-5 text-4xl text-gray-500">
          This page or item does not exist.
        </h2>
        <div className="flex justify-center">
          <Button type="button" color="dark" onClick={() => reset()}>
            Try again
          </Button>
        </div>
        <div className="flex justify-center">
          <Button type="button" color="dark" onClick={() => router.back()}>
            GO BACK
          </Button>
        </div>
      </div>
    </section>
  );
}
