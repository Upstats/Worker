import * as mongoose from "mongoose";
import * as nodemailer from "nodemailer";
import { Credentials } from "nodemailer/lib/smtp-connection";
import SMTPTransport = require("nodemailer/lib/smtp-transport");
import * as config from "config";

export interface EmailDoc extends mongoose.Document {
  email: String;
}

const emailSchema = new mongoose.Schema({
  email: String,
});

const Email = mongoose.model<EmailDoc>("Email", emailSchema);

export async function mail(system: string) {
  const emailDocs = await Email.find({});
  const emails: Array<String> = emailDocs.map((email) => email.email);
  let account: Credentials = {
    user: process.env.smtp_user || config.get("smtp_user"),
    pass: process.env.smtp_pass || config.get("smtp_pass"),
  };
  let transporter = nodemailer.createTransport({
    host: process.env.smtp_host || config.get("smtp_host"),
    port: process.env.smtp_port || config.get("smtp_port"),
    // secure: (process.env.smtp_port || config.get("smtp_port")) == "465" ? true : false, // true for 465, false for other ports
    // secure: true, // true for 465, false for other ports
    auth: {
      user: account.user,
      pass: account.pass,
    },
  } as SMTPTransport.Options);

  emails.forEach((email) => {
    transporter
      .sendMail({
        from: account.user, // sender address
        to: email as string, // list of receivers
        subject: "System Down", // Subject line
        text: "", // plain text body
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title></title>
  <style type="text/css" rel="stylesheet" media="all">
    @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");

    body {
      width: 100% !important;
      height: 100%;
      margin: 0;
      -webkit-text-size-adjust: none;
    }

    a {
      color: #3869D4;
      text-decoration: none;
    }

    a img {
      border: none;
    }

    td {
      word-break: break-word;
    }

    body,
    td,
    th {
      font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
    }

    h1 {
      margin-top: 0;
      color: #333333;
      font-size: 22px;
      font-weight: bold;
      text-align: left;
    }

    h2 {
      margin-top: 0;
      color: #333333;
      font-size: 16px;
      font-weight: bold;
      text-align: left;
    }

    h3 {
      margin-top: 0;
      color: #333333;
      font-size: 14px;
      font-weight: bold;
      text-align: left;
    }

    td,
    th {
      font-size: 16px;
    }

    p {
      margin: .4em 0 1.1875em;
      font-size: 16px;
      line-height: 1.625;
    }

    .align-right {
      text-align: right;
    }

    .align-left {
      text-align: left;
    }

    .align-center {
      text-align: center;
    }



    .button {
      background-color: #3869D4;
      border-top: 10px solid #3869D4;
      border-right: 18px solid #3869D4;
      border-bottom: 10px solid #3869D4;
      border-left: 18px solid #3869D4;
      display: inline-block;
      color: #FFF;
      text-decoration: none;
      border-radius: 3px;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
      -webkit-text-size-adjust: none;
      box-sizing: border-box;
    }

    .button--green {
      background-color: #22BC66;
      border-top: 10px solid #22BC66;
      border-right: 18px solid #22BC66;
      border-bottom: 10px solid #22BC66;
      border-left: 18px solid #22BC66;
    }

    @media only screen and (max-width: 500px) {
      .button {
        width: 100% !important;
        text-align: center !important;
      }
    }


    body {
      background-color: #F2F4F6;
      color: #51545E;
    }

    p {
      color: #51545E;
    }

    .email-wrapper {
      width: 100%;
      margin: 0;
      padding: 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      background-color: #F2F4F6;
    }

    .email-content {
      width: 100%;
      margin: 0;
      padding: 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }

    .email-header {
      padding: 25px 0;
      text-align: center;
    }

    .email-body {
      width: 100%;
      margin: 0;
      padding: 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }

    .email-footer p {
      color: #A8AAAF;
    }

    .body-sub {
      margin-top: 25px;
      padding-top: 25px;
      border-top: 1px solid #EAEAEC;
    }

    .content-cell {
      padding: 45px;
    }

    @media only screen and (max-width: 600px) {

      .email-body_inner,
      .email-footer {
        width: 100% !important;
      }
    }

    @media (prefers-color-scheme: dark) {

      body,
      .email-body,
      .email-body_inner,
      .email-content,
      .email-wrapper,
      .email-header,
      .email-footer {
        background-color: #333333 !important;
        color: #FFF !important;
      }
    }

    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
  </style>
</head>

<body>
  <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td class="email-header">
              <a href="#" class="f-fallback email-masthead_name">
                UP Stats
              </a>
            </td>
          </tr>
          <tr>
            <td class="email-body" width="570" cellpadding="0" cellspacing="0">
              <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="content-cell">
                    <div class="f-fallback">
                      <h1>Currently ${system} System down</h1>
                      <p>you are receiving this email because you are subscribed.</p>
                      <p>View System Status</p>
                      <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td align="center"></td> <!-- Website URL -->
                                <a href="#" class=" button button--green" target="_blank">Visit Website</a>
                          </td>
                        </tr>
                      </table>
                  </td>
                </tr>
              </table>
          <tr>
            <td>
              <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="content-cell" align="center">
                    <p class="f-fallback sub align-center">&copy; 2021 UP Stats. All rights reserved.</p>
                    <a href="/">UnSubscribe</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>

</html>`, // html body
      })
      .then((info: string) => {
        console.log("Message sent:", info);
      });
  });
}

module.exports = { mail };
