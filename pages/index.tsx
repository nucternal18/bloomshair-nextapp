import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

// components
import Layout from '../components/Layout';
import Button from '../components/Button';
import BottomPageContainer from '../components/BottomPageContainer'

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
              quality={75}
            />
            <span
              id='blackOverlay'
              className='absolute w-full h-full bg-black opacity-75'></span>
          </div>
          <div className='container relative mx-auto'>
            <div className='flex flex-wrap items-center justify-center '>
              <motion.div
                className='flex flex-col items-center opacity-75'
                initial='hidden'
                animate='visible'
                variants={variants}
                transition={{ duration: 2.0 }}>
                <p className='mb-4 text-3xl font-semibold text-gray-300 md:text-5xl lg:text-7xl'>
                  Welcome to Blooms Hair
                </p>
                <Button color='yellow'>
                  <Link href='/book-online'>
                    <a>Book Now!</a>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
        <section className=''>
          <div className='grid grid-cols-1 sm:grid-cols-2 '>
            <div className='flex flex-col items-center justify-center px-8 py-4 text-center bg-black'>
              <motion.div
                initial='hidden'
                animate='visible'
                variants={variants}
                transition={{ duration: 2.0 }}>
                <p className='mb-4 text-3xl font-thin text-white'>
                  WE REOPEN ON THE 12TH APRIL
                </p>
                <p className='mb-4 text-3xl font-thin text-white'>
                  KEEPING YOU & OUR TEAM SAFE
                </p>
                <Button color='primary'>
                  <Link href='/book-online'>
                    <a>Book Now!</a>
                  </Link>
                </Button>
              </motion.div>
            </div>
            <div
              className='flex flex-col items-center justify-center w-full '
              style={{
                backgroundImage: `url('https://res.cloudinary.com/dtkjg8f0n/image/upload/v1626471844/blooms_hair_products/george-bohunicky-qJKT2rMU0VU-unsplash_shgcmp.webp')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '450px',
              }}>
              <p className='text-4xl font-bold text-center text-white'>
                About Blooms
              </p>
              <div>
                <Button color='primary'>
                  <Link href='/about'>
                    <a>See More</a>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <BottomPageContainer />
      </main>
    </Layout>
  );
}
