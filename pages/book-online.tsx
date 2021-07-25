import { useState, useEffect, useRef } from 'react';

// Components
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';

const url =
  'https://www.vagaro.com//resources/WidgetEmbeddedLoader/OZqnC3SqD3OcT3qmV35y6RuSdBuOc1WJD1wOc1WO61Ctdg4tjxMG9pUxapkUcXCu7gevEhAJDXwPW?v=CKUtPBdAwZby7jHVYN9lBBPoGztzzzdvamgsRAEGCUJu#';

function BookOnline() {
   const [loading, setLoading] = useState(false);
   const scriptEl = useRef(null);

   useEffect(() => {
     setLoading(true);
     const current = scriptEl.current;
     // Append a script tag to the end of the div
     const script = document.createElement('script');
     script.type = 'text/javascript';
     script.src = url;
      script.async = true;
     current.appendChild(script);
     setLoading(false);
     return () => {
       current.removeChild(script);
     };
   }, []);
  return (
    <Layout>
      <div className='flex flex-col justify-between w-full h-full py-6 bg-white'>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div
              id='frameTitle'
              className='embedded-widget-title'
              style={{
                fontSize: '23px',
                color: '#333',
                fontFamily: 'Arial, Helvetica, sans-serif',
                lineHeight: '24px',
                padding: '18px 10px 8px',
                textAlign: 'center',
                WebkitBoxSizing: 'border-box',
                MozBoxSizing: 'border-box',
                boxSizing: 'border-box',
              }}>
              Book Now
            </div>

            <div
              className='vagaro'
              style={{
                width: '250px',
                padding: '0',
                border: '0',
                margin: '0 auto',
                textAlign: 'center',
                fontSize: '14px',
                color: '#AAA',
              }}
              ref={scriptEl}>
              <a href='https://sales.vagaro.com/'>Powered by Vagaro</a>&nbsp;
              <a href='https://sales.vagaro.com/salon-software'>
                Salon Software
              </a>
              ,&nbsp;
              <a href='https://sales.vagaro.com/spa-software'>Spa Software</a>
              &nbsp;&amp;&nbsp;
              <a href='https://sales.vagaro.com/fitness-software'>
                Fitness Software
              </a>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default BookOnline;
