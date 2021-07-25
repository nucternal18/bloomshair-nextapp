import { motion } from 'framer-motion';
import Image from 'next/image';

const ImageCards = ({ image, setSelectedImg }) => {
  return (
    <motion.div
      layout
      whileHover={{ opacity: 1 }}
      onClick={() => setSelectedImg(image)}
      className='mb-2 rounded shadow-md md:shadow-2xl md:mb-0 '
      style={{width: '400'}}
      >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}>
        <Image src={image} alt='' width={400} height={400} layout='responsive' objectFit='cover' />
      </motion.div>
    </motion.div>
  );
};

export default ImageCards;
