import { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBox = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/products/search?keyword=${keyword}`);
    setKeyword('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='flex '>
        <input
          type='text'
          name='q'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Products...'
          className='w-64 p-2 border-2 border-black border-opacity-50 rounded focus:outline-none'></input>
      </div>
    </form>
  );
};

export default SearchBox;
