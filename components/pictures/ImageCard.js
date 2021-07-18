import { motion } from 'framer-motion';
import Image from 'next/image';

const ImageCards = ({ image, setSelectedImg }) => {
  return (
    <motion.div
      layout
      whileHover={{ opacity: 1 }}
      onClick={() => setSelectedImg(image)}
      className='rounded shadow-2xl'
      style={{ height: '400px', width: '400px'}}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}>
        <Image src={image} alt='' width={400} height={400} className='rounded' objectFit='cover' />
      </motion.div>
    </motion.div>
  );
};

export default ImageCards;
