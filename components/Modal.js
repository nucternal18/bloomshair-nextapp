import { motion } from 'framer-motion';
import Image from 'next/image';

const Modal = ({ selectedImg, setSelectedImg }) => {
  const handleClick = () => {
    setSelectedImg(null);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='absolute top-0 w-full'
      onClick={handleClick}>
      <motion.div
        initial={{ y: '-100vh' }}
        animate={{ y: 0 }}
        className='top-0 flex justify-center w-full bg-center'>
        <div className='py-20 '>
          <Image
            src={selectedImg}
            alt='enlarged pic'
            width={600}
            height={600}
            className='z-50'
            quality={75}
          />
        </div>
        <span
          id='blackOverlay'
          className='absolute w-screen h-screen bg-black opacity-75'></span>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
