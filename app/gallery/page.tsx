"use client";
import { useState } from "react";

// Components
import ImageCard from "../components/pictures/ImageCard";
import Modal from "../components/Modal";
// Server Url
import { NEXT_URL } from "../../config";
import { GalleryProps } from "@lib/types";

// title="Gallery" description="Pictures of hair color and cut"

async function getPictures(): Promise<GalleryProps[]> {
  const res = await fetch(`${NEXT_URL}/api/gallery`);
  const data = await res.json();
  return data;
}

export default async function Gallery() {
  const pictures = await getPictures();
  const [selectedImg, setSelectedImg] = useState<string>("");
  return (
    <section className="flex w-full text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 overflow-y-auto md:px-0">
      <div className="container max-w-screen-lg px-2 mx-auto">
        <div className="flex items-center justify-between mb-4 border-b-2 border-current border-gray-200">
          <h1 className="px-1 py-5 mt-6 text-5xl font-thin uppercase">
            Gallery
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-1 my-8 md:grid-cols-3 sm:mx-0">
          {pictures.map((doc: GalleryProps) => (
            <ImageCard
              setSelectedImg={setSelectedImg}
              image={doc.image}
              key={doc.id}
            />
          ))}
        </div>
      </div>
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </section>
  );
}
