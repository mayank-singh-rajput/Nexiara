import dotEnv from "dotenv";
dotEnv.config();

export const PORT: string | undefined = process.env.PORT;

export const MONGO_URI: string | undefined = process.env.MONGO_URI || '';

export const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
export const JWT_EXPIRE: string | undefined = process.env.JWT_EXPIRE;

export const COOKIE_TOKEN: string | undefined = process.env.COOKIE_TOKEN;

export const EMAIL_SERVICE: string | undefined = process.env.EMAIL_SERVICE;
export const EMAIL_USERNAME: string | undefined = process.env.EMAIL_USERNAME;
export const EMAIL_PASSWORD: string | undefined = process.env.EMAIL_PASSWORD;

export const GOOGLE_CLIENT_ID: string | undefined = process.env.GOOGLE_CLIENT_ID;
