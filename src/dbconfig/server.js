import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const MONGODB_URI = process.env.MONGODB_URI;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;



// jsonwebtoke
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRTY = process.env.ACCESS_TOKEN_EXPIRTY
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY



export const API_KEY = process.env.API_KEY;
export const API_SECRET = process.env.API_SECRET;
export const CLOUD_NAME = process.env.CLOUD_NAME;