import dotenv from "dotenv";
dotenv.config();

const Config = {
  database: {
    user: process.env.USER_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE,
    port: process.env.PORT,
  },
  secret: {
    access: process.env.ACCESS_TOKEN,
    refresh: process.env.REFRESH_TOKEN,
  },
};

export default Config;
