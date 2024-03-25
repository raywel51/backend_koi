import nodemailer from "nodemailer";
import * as fs from "fs";
import path from "node:path";
export const testSentEmail = (
  name: string,
  phoneNumber: string,
  email: string,
  date: string,
  qrKey: string
): void => {
  const htmlFilePath = path.join(
    __dirname,
    "../template/email_approve_template.html"
  );
  const htmlContentTemplate = fs.readFileSync(htmlFilePath, "utf8");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD,
    },
  });

  const data: { [key: string]: string } = {
    name: name,
    phoneNumber: phoneNumber,
    email: email,
    date: date,
    confirmUrl: process.env.HOST_NAME + "/api/v1/approve/" + qrKey,
  };

  let htmlContent: string = htmlContentTemplate;
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      htmlContent = htmlContent.replace(new RegExp(`{${key}}`, "g"), data[key]);
    }
  }

  const mailOptions = {
    from: "raywelnoreply@gmail.com",
    to: "kittayawat.aong@gmail.com, Kotchakorn52001@gmail.com",
    subject: "QR Code รอการอนุมัติ",
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
