import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { useRouter } from 'next/router';

function Layout({ title, description, children }) {
  const router = useRouter();
  return (
    <div className='flex flex-col justify-between h-screen'>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta charSet='utf-8' />
        <meta name='description' content={description} />
        <meta name='og:title' content={title} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Navbar />
      <main
        className={`relative ${
          router.asPath === '/' ? 'mt-0' : 'mt-20'
        }`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: 'Welcome to Blooms Hair | Online Shop',
  description: 'We sell great hair care products',
  keywords: 'Hair Care, Shampoo, Conditioner, Nashi Hair Products',
};

export default Layout;
