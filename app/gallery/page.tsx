"use client";
import { Suspense } from "react";

// Components
import PictureGrid from "@components/PictureGrid";
import { GalleryProps } from "@lib/types";

// title="Gallery" description="Pictures of hair color and cut"

// async function getPictures() {
//   const res = await fetch(`${NEXT_URL}/api/pictures`);

//   if (!res.ok) {
//     throw new Error(res.statusText);
//   }
//   const data = await res.json();
//   return data;
// }

export default async function Gallery() {
  // const pictures = await getPictures();

  return (
    <section className="flex w-full text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 overflow-y-auto md:px-0">
      <div className="container max-w-screen-lg px-2 mx-auto">
        <div className="flex items-center justify-between mb-4 border-b-2 border-current border-gray-200">
          <h1 className="px-1 py-5 mt-6 text-5xl font-thin uppercase">
            Gallery
          </h1>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          {/* <PictureGrid pictures={pictures} /> */}
        </Suspense>
      </div>
    </section>
  );
}
