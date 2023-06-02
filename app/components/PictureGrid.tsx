"use client";
import { GalleryProps } from "@lib/types";
import { useState } from "react";
import ImageCard from "./pictures/ImageCard";
import Modal from "./Modal";

export default function PictureGrid({
  pictures,
}: {
  pictures: GalleryProps[];
}) {
  const [selectedImg, setSelectedImg] = useState<string>("");
  return (
    <>
      <div className="grid grid-cols-1 gap-1 my-8 md:grid-cols-3 sm:mx-0">
        {pictures.map((doc: GalleryProps) => (
          <ImageCard
            setSelectedImg={setSelectedImg}
            image={doc.image}
            key={doc.id}
          />
        ))}
      </div>
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </>
  );
}
