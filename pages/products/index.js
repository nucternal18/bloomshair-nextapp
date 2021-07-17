// Components
import Paginate from '../../components/Paginate';
import Layout from '../../components/Layout';
import Product from '../../components/Product';

import { SERVER_URL } from '../../config';

const Products = (props) => {
  const { products } = props;

  return (
    <Layout>
      <main className='w-full p-2 mx-auto overflow-auto bg-white '>
        <section className='container px-2 pt-2 pb-8 mb-4 md:mx-auto '>
          <div className='flex items-center justify-between mb-6 border-b-4 border-current border-gray-200'>
            <div>
              <h1 className='p-3 text-4xl font-bold md:p-5 md:text-5xl'>
                Products
              </h1>
            </div>
          </div>

          <div className='container mx-auto'>
            <div className='grid grid-cols-1 gap-2 mx-auto my-8 sm:grid-cols-3 sm:mx-0'>
              {products.map((product) => {
                return (
                  <div key={product._id}>
                    <Product product={product} />
                  </div>
                );
              })}
            </div>

            <Paginate pages={props.pages} page={props.page} isAdmin={true} />
          </div>
        </section>
      </main>
    </Layout>
  );
};

export async function getServerSideProps({
  query: { pageNumber = 1, keyword = '' },
}) {
  const res = await fetch(
    `${SERVER_URL}/api/products?keyword=${keyword}&pageNumber=${pageNumber}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();

  return {
    props: { products: data.products, page: data.page, pages: data.pages }, // will be passed to the page component as props
  };
}
export default Products;
