import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import marked from 'marked';

import styles from '../../styles/Home.module.css';

//Components
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import Rating from '../../components/Rating';
import ErrorMessage from '../../components/ErrorMessage';

// Server URL
import { SERVER_URL } from '../../config';

function ProductDetails({ product, productId }) {
  const router = useRouter();

  const addToCartHandler = () => {};
  return (
    <Layout title={product.name}>
      {' '}
      <main className='flex-grow w-full p-2 mx-auto bg-gray-200 md:p-4'>
        <section className='container px-2 pt-6 pb-8 mb-4 bg-white rounded shadow-xl mx- md:px-12 md:mx-auto '>
          <div className='flex items-center justify-between mb-6 border-b-4 border-current border-gray-200'>
            <div className='p-5'>
              <Button color='dark' onClick={() => router.back()}>
                Go Back
              </Button>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-3 mt-2 md:grid-cols-2'>
            <div className='w-full '>
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
              />
            </div>
            <div className='w-full px-4'>
              <div>
                <div className='mb-4'>
                  <h1 className='text-4xl font-semibold '>{product.name}</h1>
                </div>
                <div className='mb-4'>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </div>
              </div>
              <div>
                <div>
                  <div className='mb-4'>
                    <div className='flex flex-row'>
                      <span className='mr-2'>Price:</span>
                      <span>
                        <strong>£ {product.price.toFixed(2)}</strong>
                      </span>
                    </div>
                  </div>

                  {!product.name.includes('Nashi') && (
                    <div className='mb-4'>
                      <div className='flex flex-row'>
                        <span className='mr-1'>Status:</span>
                        <span>
                          {product.countInStock > 0
                            ? 'In Stock'
                            : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                  )}

                  {product.countInStock > 0 && (
                    <form className='mb-4'>
                      <label
                        id='listbox-label'
                        className='block text-sm font-medium text-gray-700'>
                        Qty
                        <select
                          as='select'
                          value={product.qty}
                          onChange={(e) => setQty(e.target.value)}>
                          {[...Array(product.countInStock).keys()].map(
                            (item) => (
                              <option key={item + 1} value={item + 1}>
                                {item + 1}
                              </option>
                            )
                          )}
                        </select>
                      </label>
                    </form>
                  )}

                  <div className='mb-4'>
                    <Button
                      color='dark'
                      type='button'
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}>
                      <p className='text-xl font-semibold'>
                        {product.countInStock > 0
                          ? 'ADD TO CART'
                          : 'Contact Us For Details'}
                      </p>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className='mb-6 border-b-4 border-current border-gray-200'>
              <h1 className='my-2 text-3xl font-semibold md:text-4xl '>
                Product Description:
              </h1>
            </div>
            <div className={`mt-2 px-2 ${styles.description_text}`}>
              <div
                dangerouslySetInnerHTML={{
                  __html: marked(product.description),
                }}></div>
            </div>
          </div>
          {/* Reviews section */}
          <div className='mb-4'>
            <div className='flex flex-col'>
              <div className='mb-6 border-b-4 border-current border-gray-200'>
                <h1 className='my-2 text-3xl font-semibold md:text-4xl '>
                  Reviews
                </h1>
              </div>
              {product.reviews.length === 0 && (
                <ErrorMessage>No Reviews</ErrorMessage>
              )}
              <div className='flex flex-col'>
                {product.reviews.map((review) => (
                  <div key={review._id}>
                    <p className='mb-2 text-3xl font-semibold'>{review.name}</p>
                    <Rating value={review.rating} />
                    <p className='my-2'>{review.createdAt.substring(0, 10)}</p>
                    <p className='text-xl'>{review.comment}</p>
                  </div>
                ))}
                {/* <div>
                  <h2>Review this product</h2>
                   {errorProductReview && (
                    <ErrorMessage variant='danger'>
                      {errorProductReview}
                    </ErrorMessage>
                  )}
                  {userInfo && userInfo.isAdmin ? (
                    <div div className='flex flex-row py-3 mx-auto text-lg'>
                      <p>
                        Please{' '}
                        <strong>
                          <Link to='/login'>sign in</Link>
                        </strong>{' '}
                        as a customer to write a review
                      </p>
                    </div>
                  ) : userInfo ? (
                    <form
                      onSubmit={submitHandler}
                      className='px-12 pt-6 pb-8 mx-2 mb-4 bg-white rounded shadow-xl sm:mx-auto md:w-2/4'>
                      <div controlId='rating'>
                        <label>Rating</label>
                        <select
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}>
                          <option>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </select>
                      </div>
                      <div controlId='comment'>
                        <label>Comment</label>
                        <textarea
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) =>
                            setComment(e.target.value)
                          }></textarea>
                      </div>
                      <button type='submit' variant='primary'>
                        Submit
                      </button>
                    </form>
                  ) : (
                    <div div className='flex flex-row py-3 mx-auto text-lg'>
                      <p>
                        Please{' '}
                        <strong>
                          <Link href='/login'>
                            <a>sign in</a>
                          </Link>
                        </strong>{' '}
                        to write a review
                      </p>
                    </div>
                  )}
                </div>  */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await fetch(`${SERVER_URL}/api/products/${id}`);
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { product: data, productId: id }, // will be passed to the page component as props
  };
}

export default ProductDetails;
