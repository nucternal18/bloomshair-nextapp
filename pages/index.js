import Image from 'next/image';
import { motion } from 'framer-motion';

// components
import Layout from '../components/Layout';

const url =
  'https://res.cloudinary.com/dtkjg8f0n/image/upload/v1621805386/blooms_hair_products/AdobeStock_53052353_xwep1d.jpg';

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Home() {
  return (
    <Layout>
      <main>
        <section className='relative flex items-center content-center justify-center h-screen pt-16 pb-32'>
          <div className='absolute top-0 w-full h-full bg-center bg-cover'>
            <Image
              src={url}
              alt='home background image'
              layout='fill'
              objectFit='cover'
              quality={100}
            />
            <span
              id='blackOverlay'
              className='absolute w-full h-full bg-black opacity-75'></span>
          </div>
          <div className='container relative mx-auto'>
            <div className='flex flex-wrap items-center justify-center'>
              <motion.div
                className='opacity-75'
                initial='hidden'
                animate='visible'
                variants={variants}
                transition={{ duration: 2.0 }}>
                <p className='text-gray-700 text-7xl'>Welcome to Blooms Hair</p>
              </motion.div>
            </div>
          </div>
        </section>
        <section className=''>{/* <HomepageContainer /> */}</section>
      </main>
    </Layout>
  );
}
