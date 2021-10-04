import nodemailer from "nodemailer";

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "outlook.office365.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  requireTLS: true,
  auth: {
    user: process.env.USER_EMAIL, // generated user
    pass: process.env.USER_PASS, // generated password
  },
  tls: {
    rejectUnauthorized: false,
    ciphers: "SSLv3",
  },
  // debug: true, // show debug output
  // logger: true, // log information in console
});

export async function sendMail({ from, to, subject, html }) {
  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
  } catch (e) {
    console.error(e);
    throw new Error(`Could not send email: ${e.message}`);
  }
}
