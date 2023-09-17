import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

export const{
NODE_ENV,
PORT,
API_VERSION,
DB_HOST,
DB_PORT,
DB_NAME,
DB_PASSWORD,
DB_USER,
DB_CNN,
ORIGIN,
} = process.env