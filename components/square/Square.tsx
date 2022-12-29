/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";

// import {
//   SquarePaymentsForm,
//   CreditCardInput,
// } from "react-square-web-payments-sdk";
// import { NEXT_URL } from "../../config/index";
// import { TokenResult, payments } from "@square/web-sdk";

// type SquarePaymentResult = {
//   id: string;
//   status: string;
//   update_time: string;
//   orderId: string;
//   email_address: string;
// };

// function Square({
//   paymentAmount,
//   onSquarePayment,
// }: {
//   paymentAmount: string;
//   onSquarePayment: (data: SquarePaymentResult) => void;
// }) {
//   const [isSubmitting, setSubmitting] = useState(false);

//   return (
//     <>
//       <SquarePaymentsForm
//         applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID as string}
//         locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID as string}
//         cardTokenizeResponseReceived={async (token: TokenResult, buyer) => {
//           setSubmitting(true);
//           const paymentResponse = await fetch(
//             `${NEXT_URL}/api/process-payment/square`,
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 sourceId: token.token as string,
//                 paymentAmount,
//               }),
//             }
//           );
//           const data = await paymentResponse.json();
//           if (paymentResponse.ok) {
//             setSubmitting(false);
//             onSquarePayment(data);
//           }
//         }}
//       >
//         <CreditCardInput />
//       </SquarePaymentsForm>
//     </>
//   );
// }

// export default Square;
