/* eslint-disable react/display-name */
import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaUser } from 'react-icons/fa';
import { getSession } from 'next-auth/client';

// context
import { AuthContext } from '../../context/AuthContext';

const navLink = [
  {
    id: 1,
    link: '/',
    title: 'HOME',
  },
  {
    id: 2,
    link: '/about',
    title: 'ABOUT US',
  },
  {
    id: 3,
    link: '/service-menu',
    title: 'SERVICE MENU',
  },
  {
    id: 4,
    link: '/gallery',
    title: 'GALLERY',
  },
  {
    id: 5,
    link: '/products',
    title: 'PRODUCTS',
  },
  {
    id: 6,
    link: '/contact-us',
    title: 'CONTACT US',
  },
  {
    id: 7,
    link: '/book-online',
    title: 'BOOK ONLINE',
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  console.log(loadedSession, isLoading);

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

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setIsLoading(false);
        setLoadedSession(session);
      }
    });
  }, []);

  const logoutHandler = () => {
    signOut();
  };

  return (
    <nav
      className={`absolute top-0 z-50 flex flex-wrap items-center justify-between w-full px-2 py-2 ${
        router.asPath === '/' ? 'bg-transparent' : 'bg-gray-900'
      }  navbar-expand-lg`}>
      <div className='container px-4 mx-auto text-3xl font-light text-gray-500 md:relative md:flex md:items-center sm:px-1 md:px-0 md:flex-row md:justify-between'>
        <Link href={'/'}>
          <a className='inline-block p-0 m-0 mr-4 text-2xl font-bold cursor-pointer '>
            <Image
              src={'/logo.svg'}
              alt='blooms hair logo'
              height={60}
              width={200}
              className='text-gray-500'
            />
          </a>
        </Link>
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
        <ul className={position.right}>
          {navLink.map((link) => (
            <li
              key={link.id}
              className='flex px-1 m-0 text-base list-none sm:text-xs md:text-sm text-md'>
              <Link href={link.link}>
                <a
                  className='flex items-center md:block ml-4 mb-4 lg:ml-0 lg:mb-0 cursor-pointer py-1.5 lg:py-1 px-2 lg:px-1 text-gray-200 hover:text-gray-400 text-md font-medium list-none uppercase'
                  style={{
                    color: router.asPath === link.link ? 'orange' : '',
                  }}>
                  {link.title}
                </a>
              </Link>
            </li>
          ))}
          {loadedSession && (
            <li className='px-1 m-0 text-base list-none sm:text-xs md:text-sm text-md'>
              <button
                className='flex items-center p-1 border-2 border-yellow-500 rounded-full'
                onClick={() => setDropdownOpen(!dropdownOpen)}>
                <Image
                  src={loadedSession.user.image}
                  alt={loadedSession.user.name}
                  width={30}
                  height={30}
                />
              </button>
              <div
                className={
                  dropdownOpen
                    ? 'absolute right-0 z-20 w-32 mt-2 overflow-hidden bg-gray-900 rounded-md shadow-xl'
                    : 'hidden'
                }>
                <Link href={'/account/profile'}>
                  <a
                    className='block px-4 py-2 font-medium text-gray-200 uppercase list-none cursor-pointer hover:text-yellow-400 text-md'
                    style={{
                      color: router.asPath === '/account/login' ? 'orange' : '',
                    }}>
                    Profile
                  </a>
                </Link>
                <button
                  className='block px-4 py-2 text-lg text-gray-200 hover:text-yellow-500'
                  onClick={logoutHandler}>
                  Logout
                </button>
              </div>
            </li>
          )}
          {!loadedSession && !isLoading && (
            <li className='px-1 m-0 text-base list-none sm:text-xs md:text-sm text-md'>
              <button className='flex items-center'>
                <FaUser className='text-gray-200 ' />
                <Link href={'/account/login'}>
                  <a
                    className='flex items-center md:block ml-4 mb-4 lg:ml-0 lg:mb-0 cursor-pointer py-1.5 lg:py-1 px-2 lg:px-1 text-gray-200 hover:text-gray-400 text-md font-medium list-none uppercase'
                    style={{
                      color: router.asPath === '/account/login' ? 'orange' : '',
                    }}>
                    Sign In
                  </a>
                </Link>
              </button>
            </li>
          )}
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
          <ul>
            {navLink.map((link) => (
              <li
                key={link.id}
                className='flex px-1 m-0 text-base list-none sm:text-xs md:text-sm text-md'>
                <Link href={link.link}>
                  <a
                    className='flex items-center  ml-4 mb-4 cursor-pointer py-1.5  px-2  text-gray-200 hover:text-gray-400 text-lg font-medium list-none uppercase'
                    style={{
                      color: router.asPath === link.link ? 'orange' : '',
                    }}>
                    {link.title}
                  </a>
                </Link>
              </li>
            ))}
            {loadedSession && (
              <>
                <li className='px-1 m-0 text-base list-none text-md'>
                  <Link href={'/account/profile'}>
                    <a
                      className='flex items-center  ml-4 mb-4 cursor-pointer py-1.5  px-2  text-gray-200 hover:text-gray-400 text-lg font-medium list-none uppercase'
                      style={{
                        color:
                          router.asPath === '/account/login' ? 'orange' : '',
                      }}>
                      Profile
                    </a>
                  </Link>
                </li>
                <li className='px-1 m-0 text-base list-none text-md'>
                  <button
                    className='flex items-center  ml-4 mb-4 cursor-pointer py-1.5  px-2  text-gray-200 hover:text-gray-400 text-lg font-medium list-none uppercase'
                    onClick={logoutHandler}>
                    Logout
                  </button>
                </li>
              </>
            )}
            {!loadedSession && !isLoading && (
              <li className='flex items-center px-1 m-0 text-base list-none text-md'>
                <button className='flex items-center'>
                  <FaUser className='mb-1 ml-5 mr-1 text-gray-200 ' />
                  <Link href={'/account/login'}>
                    <a
                      className='py-1 text-lg font-medium text-gray-200 uppercase list-none cursor-pointer hover:text-gray-400'
                      style={{
                        color:
                          router.asPath === '/account/login' ? 'orange' : '',
                      }}>
                      Sign In
                    </a>
                  </Link>
                </button>
              </li>
            )}
          </ul>
        </div>
      </aside>
    </nav>
  );
};

const position = {
  left: 'hidden  pl-0 mb-0 mr-auto lg:flex md:pl-0 md:mb-0 md:items-center',
  right: 'hidden  pl-0 mb-0 ml-auto lg:flex md:pl-0 md:mb-0 md:items-center',
  center:
    'hidden  pl-0 mb-0 ml-auto lg:flex md:pl-0 md:mb-0 md:mx-auto md:items-center',
  default: 'hidden  pl-0 mb-0 mr-auto lg:flex md:pl-0 md:mb-0 md:items-center',
};

const classNames = {
  default: `lg:hidden flex h-screen fixed top-0 right-0 transition-all ease duration-200`,
  enabled: `w-7/12 md:w-60 bg-gray-900 z-50  text-white overflow-x-hidden `,
  disabled: `w-0  bg-gray-800 text-white overflow-x-hidden`,
};

export default Navbar;
