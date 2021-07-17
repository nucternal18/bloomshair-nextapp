import { useState } from 'react';
import Layout from '../components/Layout';
import ImageCard from '../components/pictures/ImageCard';
import Modal from '../components/Modal';
// Server Url
import { SERVER_URL } from '../config';

function Gallery(props) {
  const [selectedImg, setSelectedImg] = useState(null);
  return (
    <Layout>
      <section className='flex w-full h-screen overflow-scroll bg-white'>
        <div className='container mx-auto'>
          <div className='flex items-center justify-between px-4 mb-4 border-b-4 border-current border-gray-200'>
            <h1 className='p-5 mt-6 text-5xl font-bold'>Gallery</h1>
          </div>
          <div className='grid grid-cols-1 gap-2 mx-4 my-8 sm:grid-cols-3 sm:mx-0'>
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

export async function getServerSideProps(context) {
  const res = await fetch(`${SERVER_URL}/api/gallery`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { pictures: data }, // will be passed to the page component as props
  };
}

export default Gallery;
