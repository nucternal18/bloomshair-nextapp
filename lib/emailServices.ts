import { OrderProps } from "../context/order/OrderContext";

export const verifyEmail = (
  subject: string,
  name: string,
  url: string
) => `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="flex items-center justify-center min-h-screen p-5 bg-blue-100 min-w-screen">
            <div class="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
                <h3 class="text-2xl">Thanks for signing up to Blooms Hair</h3>
                <div class="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-green-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                            d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                    </svg>
                </div>
                <p>Hello, ${name}</p>
                <p>We're happy you're here. Let's get your email address verified:</p>
                <div class="mt-4">
                    <button class="px-2 py-2 text-white bg-blue-600 rounded" type="button" value="button" onclick="${url}">Click to Verify Email</button>
                    <p class="mt-4 text-sm">If you’re having trouble clicking the "Verify Email Address" button, copy
                        and
                        paste
                        the URL below
                        into your web browser:
                        <a href="${url}" class="text-blue-600 underline">${url}</a>
                    </p>
                </div>
            </div>
        </div>
    </body>
</html>`;

export const resetPasswordRequestEmail = (
  subject: string,
  name: string,
  url: string
) => `<html lang='en'>
<head>
  <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
</head>
<body>
<div class="flex items-center justify-center min-h-screen p-5 bg-blue-100 min-w-screen">
            <div class="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
                <h3 class="text-2xl">Reset your password</h3>
                <div class="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-green-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                            d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                    </svg>
                </div>
                <p>Hello, ${name}</p>
                <div class="mt-4">
                    <button class="px-2 py-2 text-blue-200 bg-blue-600 rounded" type="button" value="button" onclick="${url}">Click to reset your password</button>
                    <p class="mt-4 text-sm">If you’re having trouble clicking the "Reset Password" button, copy
                        and
                        paste
                        the URL below
                        into your web browser:
                        <a href="${url}" class="text-blue-600 underline">${url}</a>
                    </p>
                </div>
            </div>
        </div>
</body>
</html></h1>`;

export const resetPasswordVerificationEmail = (
  subject: string,
  name: string
) => `<html lang='en'>
<head>
  <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
</head>
<body>
<div class="flex items-center justify-center min-h-screen p-5 bg-blue-100 min-w-screen">
            <div class="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
                <h3 class="text-2xl">Reset your password</h3>
                <div class="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-green-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                            d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                    </svg>
                </div>
                <p>Hello, ${name}</p>
                <div class="mt-4">
                    <p class="mt-4 text-sm">Password reset successfully.</p>
                </div>
            </div>
        </div>
</body>
</html></h1>`;

export const orderConfirmationEmail = (
  order: OrderProps
) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SailChimp HTML Email Template</title>
    <style type="text/css">
      @import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap");
    </style>
  </head>
  <body style="margin: 0;">
    <center class="wrapper" style="width: 100%;table-layout: fixed; background-color: ghostwhite;padding-bottom: 60px;">
      <table width="100%" style="border-spacing: 0;max-width: 600px; background-color: #fff; font-family: sans-serif; color: #4a4a4a; box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);">
        <tr>
          <td height="8" style="background-color: #000; padding:0;"></td>
        </tr>
        <tr>
          <td style="padding: 14px 0 4px">
            <table width="100%" style="border-spacing: 0;">
              <tr>
                <td style="font-size: 0; text-align: left;">
                  <table style="border-spacing: 0; width: 50%; display: inline-block; vertical-align: top;">
                    <tr>
                      <td style="padding: 0 22px 10px;">
                        <a href="https://bloomshair.co.uk"
                          >
						  <img src="https://res.cloudinary.com/dtkjg8f0n/image/upload/v1647901452/blooms_hair_products/bloomslogo_k0kx1c.png" alt="blooms hair logo" width="250" style="border: 0;">
						  </a
                        /></a>
                      </td>
                    </tr>
                  </table>
				  <table style="border-spacing: 0; width: 50%; display: inline-block; vertical-align: top;">
					  <tr>
						  <td style="padding: 12px 0 12px 62px">
							 
						  </td>
					  </tr>
				  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

		<tr>
		  <td style="padding: 0 0 20px">
			<a href="#"><img
			  src="https://res.cloudinary.com/dtkjg8f0n/image/upload/v1626474377/blooms_hair_products/lauren-fleischmann-akfxOADwNhk-unsplash_fcmoqo.jpg"
			  alt="Banner"
			  title="Banner"
			  width="600px"
			  height="300px"
			  style="max-width: 100%; border: 0;"
			/></a>
		  </td>
		  </tr>

		  <tr>
			  <td style="padding: 5px 14px;">
				  <table width="100%" style="border-spacing: 0;">
					  <tr>
						  <td>
							<p>Hey ${order?.user?.name},</p>
							<p>
								<span>
									It's official. Your order has been received and we're about to start getting it ready for delivery. 
								</span>
								<span>
									Look out for an order dispatch confirmation email coming soon
								</span>
							</p>
						  </td>
					  </tr>
				  </table>
			  </td>
		  </tr>

		  <tr>
          <td height="2" style="background-color: #000"></td>
        </tr>

		<tr>
			<td style="padding: 5px 14px;">
				<table style="border-spacing: 0;">
					<tr>
						<td style="line-height:none;">
							<h1>
								<strong>Here's Your Order Reference:</strong>
								<strong>${order?._id}</strong>
							</h1>
							<p>Placed on ${new Date(order.createdAt).toLocaleDateString()}</p>
						</td>
					</tr>
				</table>
			</td>
		</tr>

		<tr>
          <td height="2" style="background-color: #000"></td>
        </tr>

		 <tr>
          <td style="padding: 14px 0 4px">
            <table width="100%" style="border-spacing: 0;">
              <tr>
                <td style="font-size: 0; text-align: left;">
                  <table style="border-spacing: 0; width: 50%; display: inline-block; vertical-align: top;">
                    <tr>
                      <td style="padding: 0 22px 10px;text-align:left;">
						<h3 style="font-size: 1.5rem;  font-family: 'Roboto Condensed', sans-serif;">Billing Info</h3>
						<p style="font-size: 1rem;">
							<strong>Address:</strong> ${order?.shippingAddress?.address}<br>
							<strong>City:</strong> ${order?.shippingAddress?.city}<br>
							<strong>PostalCode:</strong> ${order?.shippingAddress?.postalCode}<br>
							<strong>Country:</strong> ${order?.shippingAddress?.country}<br>
						</p>
                      </td>
                    </tr>
                  </table>
				  <table style="border-spacing: 0; width: 50%; display: inline-block; vertical-align: top;">
					  <tr>
						  <td style="padding: 0 22px 10px;text-align:left;">
							<h3 style="font-size: 1.5rem;font-family: 'Roboto Condensed', sans-serif; ">Shipping Info</h3>
						<p style="font-size: 1rem;">
							<strong>Address:</strong> ${order?.shippingAddress?.address}<br>
							<strong>City:</strong> ${order?.shippingAddress?.city}<br>
							<strong>PostalCode:</strong> ${order?.shippingAddress?.postalCode}<br>
							<strong>Country:</strong> ${order?.shippingAddress?.country}<br>
						</p>
						  </td>
					  </tr>
				  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

		<tr>
          <td height="2" style="background-color: #000"></td>
        </tr>

		 <tr>
          <td style="padding: 14px 0 4px">
            <table width="100%" style="border-spacing: 0;">
              <tr>
                <td style="font-size: 0; text-align: left;">
                  <table  style="border-spacing: 0; width: 50%; display: inline-block; vertical-align: top;">
                    <tr>
                      <td style="padding: 0 22px 10px;text-align:left;">
						<h3 style="font-size: 1.5rem;font-family: 'Roboto Condensed', sans-serif;">Payment Method</h3>
						<p style="font-size: 1rem;text-align:left">
							${order?.paymentMethod}
						</p>
                      </td>
                    </tr>
                  </table>
				  <table style="border-spacing: 0; width: 50%; display: inline-block; vertical-align: top;">
					  <tr>
						  <td style="padding: 0 22px 10px;text-align:left;">
							<h3 style="font-size: 1.5rem;font-family: 'Roboto Condensed', sans-serif; ">Delivery Method</h3>
							<p style="font-size: 1rem;text-align:left">
								${order?.shippingAddress?.deliveryMethod}
							</p>
						  </td>
					  </tr>
				  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

		<tr>
			<td style="background-color: #000; color:#fff; padding: 5px 14px; text-align:center;">
				<table width="100%" style="border-spacing: 0;">
					<tr>
						<td style="padding: 45px 20px">
							
										<a href="https://bloomshair.co.uk"
										>
										<img src="https://res.cloudinary.com/dtkjg8f0n/image/upload/v1647901680/blooms_hair_products/bloomslogowhitebg_akhoao.png" alt="blooms hair logo" width="350" style="border: 0;">
										</a
										/></a>
								
										<p  style="text-decoration: none; color:#fff">
										9 Lever Street, London EC1V 3QU
										</p>
										<p >
										T: <a href="tel:07838849597" style="text-decoration: none; color:#fff">07838849597</a>
										</p>
										<p >
										E:
										<a href="mailto:appointments@bloomshair.co.uk" style="text-decoration: none; color:#fff">
											appointments@bloomshair.co.uk
										</a>
										</p>
								
							<a href="#" style="padding: 0 5px; text-decoration: none;">
								<img src="https://res.cloudinary.com/dtkjg8f0n/image/upload/v1647900844/blooms_hair_products/icons8-instagram-48_oicklp.png" alt="instagram logo" width="45" style="border: 0;">
							</a>
							<a href="#" style="padding: 0 5px;text-decoration: none;">
								<img src="https://res.cloudinary.com/dtkjg8f0n/image/upload/v1647900744/blooms_hair_products/icons8-facebook-48_ljwud3.png" alt="google logo" width="45" style="border: 0;">
							</a>
							<a href="#" style="padding: 0 5px;text-decoration: none;">
								<img src="https://res.cloudinary.com/dtkjg8f0n/image/upload/v1647900908/blooms_hair_products/icons8-google-48_zajlpq.png" alt="google logo" width="45" style="border: 0;">
							</a>
					
			</td>
		</tr>

		<tr>
          <td height="8" style="background-color: #000"></td>
        </tr>
      </table>

    </center>

  </body>
</html>
`;
