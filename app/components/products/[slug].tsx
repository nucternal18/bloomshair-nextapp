"use client";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { buildImage } from "@lib/cloudinaryUrl";

// //Components
// import Layout from "../../Layout/MainLayout/Layout";
// import Button from "../Button";
// import useHasMounted from "../../hooks/useHasMounted";
// import { ProductPreview, ProductReviewSection } from "@components/index";

// // Server URL
// import { NEXT_URL } from "../../config";

// function ProductDetails({
//   product,
//   userInfo,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   const url = product.image.substring(61, product.image.lastIndexOf("."));
//   const productImageUrl = buildImage(url).toURL();
//   const router = useRouter();

//   const hasMounted = useHasMounted();

//   return (
//     hasMounted && (
//       <Layout title={product.name}>
//         {" "}
//         <main className="flex-grow w-full p-2 mx-auto text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 md:p-4">
//           <section className="container max-w-screen-lg px-2 pt-6 pb-8 mb-4 rounded shadow-xl md:px-12 md:mx-auto ">
//             <div className="flex items-center justify-between mb-6 border-b-2 border-current border-gray-200">
//               <div className="p-5">
//                 <Button
//                   type="button"
//                   color="dark"
//                   onClick={() => router.replace(`${NEXT_URL}/products`)}
//                 >
//                   Go Back
//                 </Button>
//               </div>
//             </div>

//             <ProductPreview
//               product={product}
//               productImageUrl={productImageUrl}
//             />
//             {/* Reviews section */}
//             <ProductReviewSection product={product} userInfo={userInfo} />
//           </section>
//         </main>
//       </Layout>
//     )
//   );
// }

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const req = context.req;
//   const session = await getSession({ req });

//   if (!session) {
//     const productRes = await fetch(
//       `${NEXT_URL}/api/products/${context.params?.slug}`
//     );
//     const productData = await productRes.json();
//     return {
//       props: {
//         product: productData,
//         productId: productData.id,
//       },
//     };
//   }

//   const [userRes, productRes] = await Promise.all([
//     fetch(`${NEXT_URL}/api/users/user`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         cookie: context.req.headers.cookie,
//       } as HeadersInit,
//     }),
//     fetch(`${NEXT_URL}/api/products/${context.params?.slug}`),
//   ]);

//   const [userData, productData] = await Promise.all([
//     userRes.json(),
//     productRes.json(),
//   ]);
//   if (!productData) {
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     props: {
//       product: productData,
//       productId: productData.id,
//       userInfo: userData,
//     }, // will be passed to the page component as props
//   };
// };

// export default ProductDetails;
