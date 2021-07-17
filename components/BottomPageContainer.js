import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaGoogle } from 'react-icons/fa';

import Button from './Button';

function BottomPageContainer() {
  return (
    <>
      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
        {/* Book Online */}
        <div
          className='flex flex-col items-center justify-center w-full h-48'
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dtkjg8f0n/image/upload/v1621805390/blooms_hair_products/AdobeStock_278832769_qrecru.webp)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '400px',
          }}>
          <p className='text-4xl font-bold text-center text-white'>
            Book Online
          </p>
          <div>
            <Button color='primary'>
              <Link href='/book-online'>
                <a>See More</a>
              </Link>
            </Button>
          </div>
        </div>
        {/* Service menu */}
        <div
          className='flex flex-col items-center justify-center w-full h-48 '
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dtkjg8f0n/image/upload/v1621805395/blooms_hair_products/AdobeStock_192477796_vtn3n4.webp)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '400px',
          }}>
          <p className='text-4xl font-bold text-center text-white'>
            Service Menu
          </p>
          <div>
            <Button color='primary'>
              <Link href='/service-menu'>
                <a>See More</a>
              </Link>
            </Button>
          </div>
        </div>

        {/* Contact */}
        <div
          className='flex flex-col items-center justify-center w-full h-48'
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dtkjg8f0n/image/upload/v1621805383/blooms_hair_products/AdobeStock_208497707_gpctl8.webp)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '400px',
          }}>
          <p className='text-4xl font-bold text-center text-white'>
            Contact Blooms
          </p>
          <div>
            <Button color='primary'>
              <Link href='/contact-us'>
                <a>Contact Now</a>
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section
        className='flex items-center justify-center w-full h-full font-bold text-center text-gray-100 bg-blend-darken'
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dtkjg8f0n/image/upload/v1626474377/blooms_hair_products/lauren-fleischmann-akfxOADwNhk-unsplash_fcmoqo.webp)`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '500px',
        }}>
        <motion.div
          className='z-50 opacity-75'
          initial='hidden'
          animate='visible'
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 2.0 }}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <h2 className='text-5xl'>Let's Get Social</h2>
          <p className='text-xl text-gray-700 '>
            Keep up to date with Blooms Hair on our social media channels
          </p>
          <ul className='flex justify-center '>
            <li className='px-1 py-2 m-1 hover:text-blue-500'>
              <a href='https://www.facebook.com/bloomshair'>
                <FaFacebook className='text-4xl ' />
              </a>
            </li>
            <li className='px-1 py-2 m-1 hover:text-blue-500'>
              <a href='https://www.instagram.com/blooms_hair/'>
                <FaInstagram className='text-4xl ' />
              </a>
            </li>
            <li className='px-1 py-2 m-1 hover:text-blue-500'>
              <a href='https://www.google.com/maps/place/Blooms+Hair/@51.526503,-0.0994912,15z/data=!4m5!3m4!1s0x0:0x7abe1309f8f21d14!8m2!3d51.526503!4d-0.0994912'>
                <FaGoogle className='text-4xl ' />
              </a>
            </li>
          </ul>
        </motion.div>
      </section>
    </>
  );
}

export default BottomPageContainer;
