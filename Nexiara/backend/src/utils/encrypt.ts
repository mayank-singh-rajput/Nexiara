import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRE, EMAIL_SERVICE, EMAIL_USERNAME, EMAIL_PASSWORD } from '../config';

const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');

const secret_key: string = JWT_SECRET || "";
const expire_time: string = JWT_EXPIRE || "";

export const generatePassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const validatePassword = async (enteredPassword: string, savedPassword: string): Promise<boolean> => {
  const isPasswordValid = await bcrypt.compare(enteredPassword, savedPassword);
  return isPasswordValid;
};

export const generateSignature = async (payload: any): Promise<string> => {
  try {
    return jwt.sign(payload, secret_key, { expiresIn: expire_time });
  } catch (error) {
    throw error;
  }
};

export const validateSignature = async (token: string): Promise<any> => {
  try {
    const splitToken: string = token.split(' ')[1];
    const data = jwt.verify(splitToken, secret_key);
    return data;
  } catch (error) {
    throw error;
  }
};

export const OTPEmailSend = async (data: any): Promise<any> => {
  try {
    const transporter = await nodemailer.createTransport({
      service: EMAIL_SERVICE,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
    });

    const OTP = data.otp;

    const mailOptions = {
      to: data.email,
      from: EMAIL_USERNAME || '',
      subject: "Verify your account",
      html: `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Your OTP</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                }
                p {
                    color: #666;
                }
                .otp {
                    font-size: 24px;
                    font-weight: bold;
                    color: #0078d4;
                }
                .highlight {
                    background-color: #f7c44d;
                    padding: 5px;
                    border-radius: 5px;
                    font-weight: bold;
                }
                .contact {
                    color: #0078d4;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Your One-Time Password (OTP)</h1>
                <p>We hope this message finds you well. Your security is important to us, and we are committed to ensuring that your online experience is both convenient and safe.</p>
                
                <p>To proceed with your request, we have generated a One-Time Password (OTP) for you. Please find your OTP details below:</p>
                <p class="otp">Your OTP: <span class="highlight">${OTP}</span></p>
                
                <p>This OTP is valid for a single use. Please do not share this OTP with anyone, as it is a critical component of your account security.</p>
                
                <p>If you did not initiate this request, or if you have any concerns regarding the security of your account, please contact our support team immediately at <a href="mailto:[Customer Support Email]" class="contact">[Customer Support Email]</a> or <span class="contact">[Customer Support Phone Number]</span>.</p>
                
                <p>Thank you for choosing <span class="highlight">QuizPlay</span> for your <span class="highlight">Learn <b>•</b> Play <b>•</b> Enjoy</span>. We appreciate your trust in us, and we are here to assist you with any questions or concerns you may have.</p>
                
                <p>Best regards,</p>
                <p>QuizPlay team<p>
            </div>
        </body>
        </html>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.error("Email sending failed:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    throw error;
  }
}

export const isTokenExpired = async (token: string): Promise<boolean> => {
  try {
    const splitToken: string = token.split(' ')[1];
    const data = jwt.verify(splitToken, secret_key);


    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (typeof data === 'object' && data.exp && typeof data.exp === 'number') {
      return data.exp < currentTimestamp; // Token has expired
    } else {
      return false; // Token is still valid (or no expiration data in the token)
    }
  } catch (error) {
    console.log(error);
    return true; // Token is invalid or expired
  }
};