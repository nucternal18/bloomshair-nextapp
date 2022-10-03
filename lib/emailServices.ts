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
								<strong>${order?.id}</strong>
							</h1>
							<p>Placed on ${new Date(order.createdAt as Date).toLocaleDateString()}</p>
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

`
<!DOCTYPE html>
<html>
<head>
</head>
<body fontsize="10" style="font-family: verdana; font-size: 10pt; color: #000;">
    <center>
        <table width="60%">
            <tr>
                <td>
                    <table width="100%" cellpadding="5" id="business" style="border-bottom: solid 1px #333">
                        <tr>
                            
                            {{ #if settings.logoUrl }}
                            <td width="50%" align="left">
                                <img src="{{ settings.logoUrl }}" style="max-height: 80px;" />
                            </td>
                            {{ /if }}
                            <td width="50%" valign="top" align="right">
                                {{! Using settings object you'll be able to access some information about the account, such as the billing address or the logoUrl. }}
                                {{ #with settings.businessAddress }}
                                <p size="9">
                                    <b>
                                        {{company}}
                                    </b>

                                    <br />

                                    {{ #if address1 }}
                                    {{ address1 }}
                                    <br />
                                    {{ /if }}

                                    {{ #if address2 }}
                                    {{ address2 }}
                                    <br />
                                    {{ /if }}

                                    {{ #if city }}
                                    {{ city }},
                                    {{ /if }}

                                    {{ #if province }}
                                    {{ province }},
                                    {{ /if }}

                                    {{ #if country }}
                                    {{ country }}
                                    <br />
                                    {{ /if }}

                                    {{ #if postalCode }}
                                    {{ postalCode }}
                                    {{ /if }}

                                </p>
                                {{ /with }}
                            </td>
                        </tr>
                    </table>
                     <table style="border-bottom: solid 1px #333333" width="100%" cellpadding="5" id="header">
                        <tr>
                            <td>
                                <span size="10" color="#333333" style="color: #333333; font-size: 14pt;">
                                    <strong>
                                        {{! using the order object you have access to the whole order information and can display relevant information in the invoice. }}
                                        {{ order.invoiceNumber }}
                                    </strong>
                                </span>
                            </td>
                            <td align="right">
                                <span size="10" color="#333333" style="color: #333333; font-size: 14pt; text-align: left">
                                    <strong>
                                        {{ date order.completionDate }}
                                    </strong>
                                </span>
                            </td>
                        </tr>
                    </table>

                    {{! The context variable can be used to show information depending on the context the template is used for. It can be Email, Pdf or Html.}}
                    {{ #if_eq context 'Email' }}
                    <p style="margin: 0 0 10px;">
                        Hi {{ order.billingAddress.fullName }},
                    </p>
                    <p style="margin: 0 0 10px;">
                        Thank you for your order on {{ settings.businessAddress.company }}. You will find the order details below.
                    </p>
                     <p>
            {{! You have access to the whole order information using the order object. Might be helpful to show some contextual information }}
            Hey {{ order.billingAddress.fullName }},
        </p>

        <p>
            We're pleased to inform you that your order (<b>{{ order.invoiceNumber }}</b>) on <b>{{ settings.businessAddress.company }}</b> has shipped!
        </p>

        <p>
            Thanks!
        </p>
         <p>
            {{! You have access to the whole order information using the order object. Might be helpful to show some contextual information }}
            Hey {{ order.billingAddress.fullName }},
        </p>
        
        <p>
            We noticed you did not finish your checkout.
        </p>
        
        <div>
            {{! Use the variable message to display the message that you enter in the dashboard when consulting an abandoned cart details screen.}}
            {{{ message }}}
        </div>
        
        <p>
            {{! Using settings.cartUrl you can add a link for the customer to retrieve its cart. }}
            Follow this <a href="{{ settings.cartUrl }}">link</a> to get back to your cart instantly.
        </p>
        
        <p>
            If you have any questions, just hit reply.
        </p>
        
        <p>
            Thanks for shopping with us!
        </p>
                    {{ /if_eq }}


                    {{ #has_any order.customFields }}
                    <table width="100%" cellpadding="5" cellspacing="0">
                        <tr>
                            <td>
                                <h3 size="12">Your order</h3>

                                <ul>
                                    {{ #each order.customFields }}
                                    {{ #if_not_eq type 'hidden' }}
                                    <li style="list-style-type: square">
                                        <span size="9">
                                            {{ cleanHtml name }}: {{ cleanHtml value }}
                                        </span>
                                    </li>
                                    {{ /if_not_eq}}
                                    {{ /each }}
                                </ul>
                            </td>
                        </tr>
                    </table>
                    {{ /has_any }}

                    <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
                        <thead>
                            <tr>
                                <td align="left" valign="top" style="border-bottom: solid 1px #333; color: #333; padding: 5px;">
                                    <span color="#333333" size="10">
                                        <strong>ID</strong>
                                    </span>
                                </td>
                                <td align="left" valign="top" style="border-bottom: solid 1px #333; color: #333; padding: 5px;"></td>
                                <td align="left" valign="top" style="border-bottom: solid 1px #333; color: #333; padding: 5px;">
                                    <span color="#333333" size="10">
                                        <strong>Name</strong>
                                    </span>
                                </td>
                                <td align="center" valign="top" style="border-bottom: solid 1px #333; color: #333; padding: 5px;">
                                    <span color="#333333" size="10">
                                        <strong>Quantity</strong>
                                    </span>
                                </td>
                                <td align="right" valign="top" style="border-bottom: solid 1px #333; color: #333; padding: 5px;">
                                    <span color="#333333" size="10">
                                        <strong>Unit price</strong>
                                    </span>
                                </td>
                                <td align="right" valign="top" style="border-bottom: solid 1px #333; color: #333; padding: 5px;">
                                    <span color="#333333" size="10">
                                        <strong>Total price</strong>
                                    </span>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {{ #each order.items }}
                            <tr>
                                <td style="border-bottom: solid 1px #ccc; padding: 5px;">
                                    <span size="10">
                                        {{ this.id }}
                                    </span>
                                </td>
                                {{ #if ../settings.includeProductImagesInInvoice }}
                                {{ #is_absolute_url this.image }}
                                <td valign="top" align="right" style="border-bottom: solid 1px #ccc;">
                                    <img src="{{ this.image }}" style="margin-right: 5px; max-width: 75px;" height="75" width="75" />
                                </td>
                                {{ else }}
                                <td style="border-bottom: solid 1px #ccc;"></td>
                                {{ /is_absolute_url }}
                                {{ else }}
                                <td style="border-bottom: solid 1px #ccc;"></td>
                                {{ /if }}

                                <td style="border-bottom: solid 1px #ccc;">
                                    <span size="10">
                                        <strong>
                                            {{ this.name }}
                                        </strong>
                                    </span>

                                    {{ #if this.description }}
                                    <p size="9">
                                        {{{ this.description }}}
                                    </p>
                                    {{ /if }}

                                    {{ #has_any this.customFields }}
                                    <ul>
                                        {{ #each this.customFields }}
                                        {{ #if_not_eq type 'hidden' }}
                                        <li style="list-style-type: square">
                                            <span size="9">
                                                {{ cleanHtml name }}: {{ cleanHtml value }}
                                            </span>
                                        </li>
                                        {{ /if_not_eq }}
                                        {{ /each }}
                                    </ul>
                                    {{ /has_any }}
                                </td>
                                <td style="border-bottom: solid 1px #ccc; padding: 5px;" align="center">
                                    {{ this.quantity }}
                                </td>
                                <td style="border-bottom: solid 1px #ccc; padding: 5px;" align="right">
                                    {{ money this.unitPrice }}
                                </td>
                                <td style="border-bottom: solid 1px #ccc; padding: 5px;" align="right">
                                    {{ money this.totalPrice }}
                                </td>
                            </tr>
                            {{ /each }}

                            {{ #each order.plans }}
                            <tr>
                                <td align="center" style="border-bottom: solid 1px #ccc; padding: 5px;">
                                    <span size="10">
                                        {{ this.id }}
                                    </span>
                                </td>
                                <td style="border-bottom: solid 1px #ccc;"></td>
                                <td style="border-bottom: solid 1px #ccc;">
                                    <span size="10">
                                        <strong>
                                            {{ this.name }}
                                        </strong>
                                    </span>
                                </td>
                                <td align="center" style="border-bottom: solid 1px #ccc; padding: 5px;">
                                    <span size="9">
                                        {{ this.quantity }}
                                    </span>
                                </td>
                                <td align="right" style="border-bottom: solid 1px #ccc; padding: 5px; white-space: nowrap">
                                    <span size="9">
                                        {{ money this.amount }}/{{ this.interval }}
                                    </span>
                                </td>
                                <td align="right" style="border-bottom: solid 1px #ccc; padding: 5px; white-space: nowrap">
                                    <span size="9">
                                        {{ money this.totalAmount }}/{{ this.interval }}
                                    </span>
                                </td>
                            </tr>
                            {{ /each }}

                            {{ #each order.discounts }}
                            <tr>
                                <td colspan="5" style="border-bottom: solid 1px #ccc; padding: 5px;">
                                    <span size="9">
                                        {{ name }}
                                    </span>
                                </td>
                                <td align="right" style="border-bottom: solid 1px #ccc; padding: 5px;">
                                    <span size="9" color="red" style="color: red;">
                                        {{ money value }}
                                    </span>
                                </td>
                            </tr>
                            {{ /each }}

                            {{ #if_not_eq order.summary.discountInducedTaxesVariation 0 }}
                            <tr>
                                <td colspan="5" style="border-bottom: solid 1px #ccc; padding: 5px;">
                                    <span size="9">
                                        Tax adjustments
                                    </span>
                                </td>
                                <td align="right" style="border-bottom: solid 1px #ccc; padding: 5px;">
                                    <span size="9" color="red" style="color: red;">
                                        {{ money order.summary.discountInducedTaxesVariation }}
                                    </span>
                                </td>
                            </tr>
                            {{ /if_not_eq }}

                            <tr>
                                <td colspan="5" style="border-bottom: solid 1px #ccc; padding: 15px 5px;">
                                    <span size="9">
                                        <strong>
                                            Subtotal
                                        </strong>
                                    </span>
                                </td>
                                <td align="right" style="border-bottom: solid 1px #ccc; padding: 15px 5px;">
                                    <span size="9">
                                        <strong>
                                            {{ money order.summary.subTotal }}
                                        </strong>
                                    </span>
                                </td>
                            </tr>

                            {{ #if order.shippingInformation }}
                            <tr>
                                <td colspan="5" style="border-bottom: solid 1px #ccc; padding: 5px">
                                    <span size="9">
                                        {{ #if order.shippingInformation.localizedMethod }}
                                            {{ order.shippingInformation.localizedMethod }}
                                        {{ else }}
                                            {{ order.shippingInformation.method }}
                                        {{ /if }}
                                    </span>
                                </td>
                                <td align="right" style="border-bottom: solid 1px #ccc; padding: 5px">
                                    <span size="9">
                                        {{ money order.shippingInformation.fees }}
                                    </span>
                                </td>
                            </tr>
                            {{ /if }}

                            {{ #has_any order.summary.taxes }}
                            {{ #each order.summary.taxes }}
                            <tr>
                                <td colspan="5" size="9" style="border-bottom: solid 1px #ccc; padding: 5px">
                                    {{ name }}

                                    {{ #if numberForInvoice }}
                                    (<i>{{ numberForInvoice }}</i>)
                                    {{ /if }}
                                </td>
                                <td align="right" style="border-bottom: solid 1px #ccc; padding: 5px;">
                                    {{ money amount }}
                                </td>
                            </tr>
                            {{ /each }}
                            {{ /has_any}}

                            <tr>
                                <td colspan="5" style="padding: 15px 5px;">
                                    <span size="10">
                                        <strong>
                                            {{ #has_any order.plans }}
                                            Payable now
                                            {{ else }}
                                            Total
                                            {{ /has_any }}
                                        </strong>
                                    </span>
                                </td>
                                <td align="right" style="padding: 15px 5px;">
                                    <span size="10">
                                        {{ #has_any order.plans }}
                                        <strong>
                                            {{ money order.summary.payableNow }}
                                        </strong>
                                        {{ else }}
                                        <strong>
                                            {{ money order.summary.total }}
                                        </strong>
                                        {{ /has_any}}

                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 size="12" style="margin-top: 30px">
                        Payment information
                    </h3>
                    <table width="100%" color="#333333" cellspacing="0" style="border-collapse: collapse">
                        <tbody>
                            {{ #if_eq order.paymentMethod 'CreditCard' }}
                            {{ #if order.card.last4digits }}
                            <tr>
                                <td colspan="3" style="border-bottom: solid 1px #ccc; padding: 15px 5px;">
                                    <span size="10">
                                        Card last 4 digits:
                                    </span>
                                </td>
                                <td align="right" style="border-bottom: solid 1px #ccc; padding: 15px 5px;">
                                    <span size="10">
                                        <strong>
                                            {{ order.card.last4digits }}
                                        </strong>
                                    </span>
                                </td>
                            </tr>
                            {{ /if}}
                            {{ else }}
                            <tr>
                                <td colspan="3" style="border: solid 1px black; padding: 5px;">
                                    <span size="10">
                                        Payment method:
                                    </span>
                                </td>
                                <td align="right" style="border: solid 1px black; padding: 5px;">
                                    <span size="10">
                                        {{ #if_eq order.paymentMethod 'WillBePaidLater'}}
                                        Deferred
                                        {{ else }}
                                        {{ #if_eq order.paymentMethod 'Other' }}
                                        {{ order.paymentDetails.display }}
                                        {{ else }}
                                        {{ order.paymentMethod }}
                                        {{ /if_eq }}
                                        {{ /if_eq}}
                                    </span>
                                </td>
                            </tr>
                            {{ /if_eq }}
                            <tr>
                                <td colspan="3" style="padding: 15px 5px;">
                                    <span size="10">
                                        Payment date:
                                    </span>
                                </td>
                                <td align="right" style="padding: 15px 5px;">
                                    <span size="10">
                                        <strong>
                                            {{ date order.completionDate 'yyyy-MM-dd HH:mm:ss' }}
                                        </strong>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {{ #if settings.signature }}
                    <table width="100%" cellpadding="5" cellspacing="0" style="border: solid 1px #ccc; margin-top: 10px; padding: 5px; page-break-inside: avoid">
                        <tr>
                            <td>
                                <div size="9">
                                    {{{ settings.signature }}}
                                </div>
                            </td>
                        </tr>
                    </table>
                    {{ /if }}

                    {{ #if settings.orderHistoryUrl }}
                    <table width="100%" align="center" cellpadding="5" cellspacing="0" style="margin-top: 10px; padding: 5px;">
                        <tr>
                            <td align="left">
                                <div size="16">
                                    <a href="{{ settings.orderHistoryUrl }}" target="_blank">Click here to consult your orders history</a>
                                </div>
                            </td>
                        </tr>
                    </table>
                    {{ /if }}
                    <table width="100%" align="center" cellpadding="5" cellspacing="0" style="margin-top: 10px; padding: 5px;">
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
                    </table>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>`;
