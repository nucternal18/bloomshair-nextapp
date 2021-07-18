/* eslint-disable react/display-name */
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import SearchBox from '../SearchBox';

const navLink = [
  {
    id: 8,
    link: '/account/register',
    title: 'Login',
  },
  {
    id: 9,
    link: '/account/register',
    title: 'Register',
  },
];

const ProductsNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const ref = useRef();
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        if (!isOpen) return;
        toggle(false);
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, ref]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`absolute top-0 z-50 flex flex-wrap items-center justify-between w-full px-2 py-2 md:bg-gray-500  navbar-expand-lg`}>
      <div className='container px-4 mx-auto text-3xl font-light text-gray-200 md:relative md:flex md:items-center sm:px-1 md:px-0 md:flex-row md:justify-between'>
        <button
          type='button'
          aria-expanded='false'
          aria-disabled={isOpen}
          disabled={isOpen}
          aria-label='Toggle navigation'
          className='items-center block float-right py-2 text-4xl lg:hidden focus:outline-none focus:shadow-none'
          onClick={toggle}>
          &#8801;
        </button>
        <div className={position.center}>
          <SearchBox />
        </div>
        <ul className={position.right}>
          {navLink.map((link) => (
            <li
              key={link.id}
              className='px-1 m-0 text-base list-none sm:text-xs md:text-sm text-md'>
              <Link href={link.link}>
                <a
                  className='flex md:block ml-4 mb-4 lg:ml-0 lg:mb-0 cursor-pointer py-1.5 lg:py-1 px-2 lg:px-1 text-gray-200 hover:text-gray-400 text-lg font-medium list-none'
                  style={{
                    color: router.asPath === link.link ? 'orange' : '',
                  }}>
                  {link.title}
                </a>
              </Link>
            </li>
          ))}
          <li>View basket</li>
        </ul>
      </div>
      <aside
        className={
          isOpen
            ? `${classNames.default} ${classNames.enabled}`
            : `${classNames.default} ${classNames.disabled}`
        }
        ref={ref}>
        <button
          aria-label='Close'
          className='absolute text-3xl text-white cursor-pointer top-1 focus:outline-none right-3'
          onClick={toggle}>
          &times;
        </button>
        <div className='mt-12'>
          {' '}
          {navLink.map((link) => (
            <li
              key={link.id}
              className='px-1 m-0 text-base list-none sm:text-xs md:text-sm text-md'>
              <Link href={link.link}>
                <a
                  className='flex md:block ml-4 mb-4 lg:ml-0 lg:mb-0 cursor-pointer py-1.5 lg:py-1 px-2 lg:px-1 text-gray-200 hover:text-gray-400 text-lg font-medium list-none'
                  style={{
                    color: router.asPath === link.link ? 'orange' : '',
                  }}>
                  {link.title}
                </a>
              </Link>
            </li>
          ))}
        </div>
      </aside>
    </nav>
  );
};

const position = {
  left: 'hidden  pl-0 mb-0 mr-auto lg:flex md:pl-0 md:mb-0',
  right: 'hidden  pl-0 mb-0 ml-auto lg:flex md:pl-0 md:mb-0',
  center: 'hidden  pl-0 mb-0 ml-auto lg:flex md:pl-0 md:mb-0 md:mx-auto ',
  default: 'hidden  pl-0 mb-0 mr-auto lg:flex md:pl-0 md:mb-0',
};

const classNames = {
  default: `lg:hidden flex h-screen fixed z-20 top-0 right-0 transition-all ease duration-200`,
  enabled: `w-7/12 md:w-60 bg-gray-800 text-white overflow-x-hidden opacity-75`,
  disabled: `w-0  bg-gray-800 text-white overflow-x-hidden`,
};

export default ProductsNavbar;
