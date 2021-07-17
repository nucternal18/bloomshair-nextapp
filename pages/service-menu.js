import Image from 'next/image'
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import BottomPageContainer from '../components/BottomPageContainer';

const url =
  'https://res.cloudinary.com/dtkjg8f0n/image/upload/v1621805398/blooms_hair_products/AdobeStock_290145313_mbpudc.webp';

function ServiceMenu() {
  return (
    <Layout>
      <main className='flex-grow'>
        <section className='relative flex items-center content-center justify-center'>
          <div
            className='relative top-0 w-full h-full bg-center bg-cover '
            style={{ height: '500px' }}>
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
          <div className='absolute mx-auto'>
            <div className='flex flex-wrap items-center justify-center'>
              <motion.div
                className='opacity-75 '
                initial='hidden'
                animate='visible'
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={{ duration: 2.0 }}>
                <h1 className='text-gray-500 text-7xl'>Service & Price Menu</h1>
              </motion.div>
            </div>
          </div>
        </section>
        <div className='w-full bg-white'>
          
          <div className='container px-4 py-6 mx-auto'>
            <h1 className='mb-4 text-3xl text-center sm:text-5xl'>
              Our Hair Services
            </h1>
            <div className='text-justify sm:text-center'>
              <p className='mb-2 font-thin'>
                We’re a talented and passionate bunch here at Blooms hair, even
                if we do say so ourselves, creating styles that work with you
                and your lifestyle. We know hair, we know your hair, and we want
                to help you make the most of it.
              </p>
              <p className='mb-2 font-thin'>
                Our team of experienced stylists ask questions, listen carefully
                to the answers, and provide recommendations tailored to your own
                individual needs. We work hard to keep ahead of the latest hair
                cuts and styles. After consultation with one of our team we then
                create that cut and style that will compliment and enhance your
                looks, so you leave our salon looking and feeling gorgeous every
                time.
              </p>
              <p className='mb-2 font-thin'>
                Call today to book your appointment or for a free consultation.
              </p>
            </div>
            <div className='flex justify-center w-full my-4'>
              <div className='grid w-full grid-cols-3 text-center border'>
                <div className='col-span-3 px-4 py-2 font-bold text-center bg-gray-300'>
                  Gents Hair
                </div>
                <div className='col-span-2 px-4 py-2'>
                  Gents Restyle & Finish
                </div>
                <div className='col-span-1 px-4 py-2'>£35.00</div>
                <div className='col-span-2 px-4 py-2 bg-gray-100'>
                  Gents Wash, Cut & Finish
                </div>
                <div className='col-span-1 px-4 py-2 bg-gray-100'>£30.00</div>
                <div className='col-span-3 px-4 py-2 font-bold text-center bg-gray-300'>
                  Ladies Hair
                </div>
                <div className='col-span-2 px-4 py-2'>Fringe Trim</div>
                <div className='col-span-1 px-4 py-2'>£6.00</div>
                <div className='col-span-2 px-4 py-2 bg-gray-100'>Hair Up</div>
                <div className='col-span-1 px-4 py-2 bg-gray-100'>P.O.T.</div>
                <div className='col-span-2 px-4 py-2'>
                  Wash, Restyle & Finish
                </div>
                <div className='col-span-1 px-4 py-2'>£55.00</div>
                <div className='col-span-2 px-4 py-2 bg-gray-100'>
                  Wash & Blow-Dry from
                </div>
                <div className='col-span-1 px-4 py-2 bg-gray-100'>
                  £30.00 to £33.00
                </div>
                <div className='col-span-2 px-4 py-2'>Wash & Cut</div>
                <div className='col-span-1 px-4 py-2'>£39.00</div>
                <div className='col-span-2 px-4 py-2 bg-gray-100'>
                  Wash, Cut & Finish
                </div>
                <div className='col-span-1 px-4 py-2 bg-gray-100'>£48.00</div>
                <div className='col-span-2 px-4 py-2'>
                  Wedding Hair + Trial run (Bride)
                </div>
                <div className='col-span-1 px-4 py-2'>£195.00</div>
                <div className='col-span-3 px-4 py-2 font-bold text-center bg-gray-300'>
                  Technical
                </div>
                <div className='col-span-2 px-4 py-2'>Bleaching</div>
                <div className='col-span-1 px-4 py-2'>P.O.T.</div>
                <div className='col-span-2 px-4 py-2 bg-gray-100'>
                  Bleaching + Toner
                </div>
                <div className='col-span-1 px-4 py-2 bg-gray-100'>£79.00</div>
                <div className='col-span-2 px-4 py-2'>Colour Correction</div>
                <div className='col-span-1 px-4 py-2'>£110.00</div>
                <div className='col-span-2 px-4 py-2 bg-gray-100'>
                  Dip-Dye/Ombre/Bayalage
                </div>
                <div className='col-span-1 px-4 py-2 bg-gray-100'>£110.00</div>
                <div className='col-span-2 px-4 py-2'>Full Head HiLites</div>
                <div className='col-span-1 px-4 py-2'>£110.00</div>
                <div className='col-span-2 px-4 py-2 bg-gray-100'>
                  Full Head Tint
                </div>
                <div className='col-span-1 px-4 py-2 bg-gray-100'>£60.00</div>
                <div className='col-span-2 px-4 py-2'>Hair Mask Treatment</div>
                <div className='col-span-1 px-4 py-2'>£25.00</div>
                <div className='col-span-2 px-4 py-2 bg-gray-100'>
                  Half Head HiLites
                </div>
                <div className='col-span-1 px-4 py-2 bg-gray-100'>£75.00</div>
                <div className='col-span-2 px-4 py-2'>
                  Semi Permanent Colours
                </div>
                <div className='col-span-1 px-4 py-2'>£60.00</div>
                <div className='col-span-2 px-4 py-2 bg-gray-100'>
                  Tint Regrowth (roots)
                </div>
                <div className='col-span-1 px-4 py-2 bg-gray-100'>£45.00</div>
                <div className='col-span-2 px-4 py-2'>Toner</div>
                <div className='col-span-1 px-4 py-2'>£15.00</div>
                <div className='col-span-2 px-4 py-2 bg-gray-100'>
                  Toner (Half Head)
                </div>
                <div className='col-span-1 px-4 py-2 bg-gray-100'>£20.00</div>
                <div className='col-span-2 px-4 py-2'>Toner (Full Head)</div>
                <div className='col-span-1 px-4 py-2'>£25.00</div>
                <div className='col-span-2 px-4 py-2 bg-gray-100'>
                  T-Section Highlights
                </div>
                <div className='col-span-1 px-4 py-2 bg-gray-100'>£55.00</div>
                <div className='col-span-3 px-4 py-2 font-bold text-center bg-gray-300'>
                  Hair Treatments
                </div>
                <div className='col-span-2 px-4 py-2'>
                  Brazilian Blow-Dry Long/Medium/Short
                </div>
                <div className='col-span-1 py-2 break-words sm:px-4'>
                  £200.00/£150.00/£120.00
                </div>
                <div className='col-span-2 px-4 py-2 bg-gray-100'>Olaplex™</div>
                <div className='col-span-1 px-4 py-2 bg-gray-100'>£30.00</div>
                <div className='col-span-2 px-4 py-2'>Perms and Waves</div>
                <div className='col-span-1 px-4 py-2'>P.O.T.</div>
              </div>
            </div>
            <h3 className='my-4 text-xl text-center'>Terms and Conditions</h3>
            <div className='text-justify sm:text-center'>
              <p className='mb-2 font-thin'>
                Should a cancellation or date change be necessary, we politely
                request 24 hour’s notice.
              </p>
              <p className='mb-2 font-thin'>
                Please note all colour prices are ‘from’. Exact quotes can only
                be given after a consultation with a stylist. After colour
                services, a blow-dry with a stylist starts at £25 and needs to
                be specified when you book your appointment. All colour services
                will otherwise include a quick dry from an experienced
                assistant.
              </p>
              <p className='mb-2 font-thin'>
                To avoid disappointment, punctuality for appointments is greatly
                appreciated.
              </p>
            </div>
          </div>
        </div>
        <BottomPageContainer />
      </main>
    </Layout>
  );
}

export default ServiceMenu;
