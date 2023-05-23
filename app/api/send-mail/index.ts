/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

interface IFormData {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const { from, to, subject, html }: IFormData = req.body;

    if (
      !from ||
      !from.includes("@") ||
      !to ||
      !to.includes("@") ||
      !subject ||
      subject.trim() === "" ||
      !html ||
      html.trim() === ""
    ) {
      res.status(422).end();
    }

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

    // Setup email data with unicode symbols
    const mailOptions = {
      from, // sender address
      to, // list of receivers
      subject, // plain text body
      html, // html body
    };

    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log("Error while verifying connection configuration: " + error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return error;
      }

      return "Message sent: " + info.response;
    });
    console.log("Message sent");
    res
      .status(201)
      .json({ success: true, message: "Message sent successfully" });
  } else {
    res.status(405).json({
      success: false,
      error: "Server Error. Invalid Request",
    });
  }
};

export default handler;
