import { useState } from "react";
import { GetServerSideProps } from "next";

// Components
import Layout from "../components/Layout/Layout";
import ImageCard from "../components/pictures/ImageCard";
import Modal from "../components/Modal";
// Server Url
import { NEXT_URL } from "../config";

function Gallery(props): JSX.Element {
  const [selectedImg, setSelectedImg] = useState(null);
  return (
    <Layout
      title="Blooms Hair - Gallery"
      description="Pictures of hair color and cut"
    >
      <section className="flex w-full h-screen overflow-scroll bg-white md:px-0">
        <div className="container max-w-screen-lg px-2 mx-auto">
          <div className="flex items-center justify-between mb-4 border-b-2 border-current border-gray-200">
            <h1 className="px-1 py-5 mt-6 text-5xl font-thin uppercase">
              Gallery
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-1 my-8 md:grid-cols-3 sm:mx-0">
            {props.pictures.map((doc) => (
              <ImageCard
                setSelectedImg={setSelectedImg}
                image={doc.image}
                key={doc._id}
              />
            ))}
          </div>
        </div>
        {selectedImg && (
          <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
        )}
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${NEXT_URL}/api/gallery`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { pictures: data }, // will be passed to the page component as props
  };
};

export default Gallery;
