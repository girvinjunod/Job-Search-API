import dotenv from 'dotenv';
dotenv.config();

const authConfig = {
  token_secret: process.env.TOKEN_SECRET,
  token_expire: 15 * 60 * 1000,
  salt: 10,
};

export default authConfig;
