import { OrderProps } from "./types";

export const verifyEmail = (
  subject: string,
  name: string,
  url: string
) => ` <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${subject}</title>
    <style type="text/css">
      @import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap");

    </style>
  </head>
  <body style="margin: 0;">
    <center class="wrapper" style="width: 100%;table-layout: fixed; background-color: ghostwhite;padding-bottom: 60px;">
      <table width="100%" cellspacing="0" cellpadding="0" style="border-spacing: 0;max-width: 600px; background-color: #fff; font-family: sans-serif; color: #4a4a4a; box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);">
        <!-- BORDER -->
        <tr>
          <td height="8" style="background-color: #000; padding:0;"></td>
        </tr>
        <!-- LOGO SECTION -->
        <tr>
          <td style="padding: 14px 0 4px">
            <table width="100%" style="border-spacing: 0;">
              <tr>
                <td style="font-size: 0; text-align: left;">
                  <table style="border-spacing: 0; width: 50%; display: inline-block; vertical-align: top;">
                    <tr>
                      <td style="padding: 0 0 10px;">
                        <a href="https://bloomshair.co.uk" target="_blank">
						  <img src="https://res.cloudinary.com/dtkjg8f0n/image/upload/v1647901452/blooms_hair_products/bloomslogo_k0kx1c.png" alt="blooms hair logo" width="250" style="border: 0;" />
                        </a>
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
                   <td>
                     <table width="100%" cellspacing="0" cellpadding="0" style="border-spacing: 0;">
                     <tr>
                     <td style="padding: 5px 24px; ">
                        <p>Hello, ${name}</p>
                        <p>We're happy you're here. Let's get your email address verified:</p>
                     </td>
                     </tr>
                     </table>
                     <table width="100%" cellspacing="0" cellpadding="0" >
                    <tr>
                        <td style="padding: 5px 24px;">
                            <table cellspacing="0" cellpadding="0" >
                                <tr >
                                    <td align="center" style="border-radius: 5px; background-color: #1f457f;">
                                        <a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-weight: bold; text-decoration: none;border-radius: 5px; padding: 12px 18px; border: 1px solid #1f457f; display: inline-block;">Click to verify email &rarr;</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    </table>
                     <table width="100%" cellspacing="0" cellpadding="0" style="border-spacing: 0;">
                     <tr>
                     <td style="padding: 5px 24px 20px; text-align:left;">
                    <p>If you’re having trouble clicking the "Verify Email Address" button, copy
                        and
                        paste
                        the URL below
                        into your web browser:
                    </p>
                    <a href="${url}" style="padding-bottom: 5px;">${url}</a>
               
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
		<!-- End Border -->
		<tr>
          <td height="8" style="background-color: #000"></td>
        </tr>
      </table>
      <!-- End Main Class -->
    </center>
    <!-- End Wrapper -->
  </body>
</html>`;

export const resetPasswordRequestEmail = (
  subject: string,
  name: string,
  url: string
) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${subject}</title>
    <style type="text/css">
      @import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap");

    </style>
  </head>
  <body style="margin: 0;">
    <center class="wrapper" style="width: 100%;table-layout: fixed; background-color: ghostwhite;padding-bottom: 60px;">
      <table width="100%" cellspacing="0" cellpadding="0" style="border-spacing: 0;max-width: 600px; background-color: #fff; font-family: sans-serif; color: #4a4a4a; box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);">
        <!-- BORDER -->
        <tr>
          <td height="8" style="background-color: #000; padding:0;"></td>
        </tr>
        <!-- LOGO SECTION -->
        <tr>
          <td style="padding: 14px 0 4px">
            <table width="100%" style="border-spacing: 0;">
              <tr>
                <td style="font-size: 0; text-align: left;">
                  <table style="border-spacing: 0; width: 50%; display: inline-block; vertical-align: top;">
                    <tr>
                      <td style="padding: 0 0 10px;">
                        <a href="https://bloomshair.co.uk" target="_blank">
						  <img src="https://res.cloudinary.com/dtkjg8f0n/image/upload/v1647901452/blooms_hair_products/bloomslogo_k0kx1c.png" alt="blooms hair logo" width="250" style="border: 0;" />
                        </a>
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
                   <td>
                     <table width="100%" cellspacing="0" cellpadding="0" style="border-spacing: 0;">
                     <tr>
                     <td style="padding: 5px 24px; ">
                        <p>Hello, ${name}</p>
                     </td>
                     </tr>
                     </table>
                     <table width="100%" cellspacing="0" cellpadding="0" >
                    <tr>
                        <td style="padding: 5px 24px;">
                            <table cellspacing="0" cellpadding="0" >
                                <tr >
                                    <td align="center" style="border-radius: 5px; background-color: #1f457f;">
                                        <a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-weight: bold; text-decoration: none;border-radius: 5px; padding: 12px 18px; border: 1px solid #1F7F4C; display: inline-block;">Reset Password &rarr;</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    </table>
                     <table width="100%" cellspacing="0" cellpadding="0" style="border-spacing: 0;">
                     <tr>
                     <td style="padding: 5px 24px 20px; text-align:left;">
                    <p>If you’re having trouble clicking the "Reset Password" button, copy
                        and
                        paste
                        the URL below
                        into your web browser:
                    </p>
                    <a href="${url}" style="padding-bottom: 5px;">${url}</a>
               
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
		<!-- End Border -->
		<tr>
          <td height="8" style="background-color: #000"></td>
        </tr>
      </table>
      <!-- End Main Class -->
    </center>
    <!-- End Wrapper -->
  </body>
</html>`;

export const resetPasswordVerificationEmail = (
  subject: string,
  name: string
) => ` <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${subject}</title>
    <style type="text/css">
      @import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap");

    </style>
  </head>
  <body style="margin: 0;">
    <center class="wrapper" style="width: 100%;table-layout: fixed; background-color: ghostwhite;padding-bottom: 60px;">
      <table width="100%" cellspacing="0" cellpadding="0" style="border-spacing: 0;max-width: 600px; background-color: #fff; font-family: sans-serif; color: #4a4a4a; box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);">
        <!-- BORDER -->
        <tr>
          <td height="8" style="background-color: #000; padding:0;"></td>
        </tr>
        <!-- LOGO SECTION -->
        <tr>
          <td style="padding: 14px 0 4px">
            <table width="100%" style="border-spacing: 0;">
              <tr>
                <td style="font-size: 0; text-align: left;">
                  <table style="border-spacing: 0; width: 50%; display: inline-block; vertical-align: top;">
                    <tr>
                      <td style="padding: 0 0 10px;">
                        <a href="https://bloomshair.co.uk" target="_blank">
						  <img src="https://res.cloudinary.com/dtkjg8f0n/image/upload/v1647901452/blooms_hair_products/bloomslogo_k0kx1c.png" alt="blooms hair logo" width="250" style="border: 0;" />
                        </a>
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
            <td>
                <table width="100%" cellspacing="0" cellpadding="0" style="border-spacing: 0;">
                    <tr>
                        <td style="padding: 5px 24px; ">
                            <p>Hello, ${name}</p>
                            <p>Password reset successfully.</p>
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
		<!-- End Border -->
		<tr>
          <td height="8" style="background-color: #000"></td>
        </tr>
      </table>
      <!-- End Main Class -->
    </center>
    <!-- End Wrapper -->
  </body>
</html>`;

export const orderConfirmationEmail = (
  order: OrderProps
) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Order Confirmation Email</title>
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
                        <a href="https://bloomshair.co.uk" target="_blank">
						  <img src="https://res.cloudinary.com/dtkjg8f0n/image/upload/v1647901452/blooms_hair_products/bloomslogo_k0kx1c.png" alt="blooms hair logo" width="250" style="border: 0;"/>
						  </a>
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
