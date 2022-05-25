import { PrismaClient } from '@prisma/client';
import log from '../utils/logger';
import bcrypt from 'bcrypt';
import authConfig from '../configs/auth.config';

const prisma = new PrismaClient();

interface registerInput {
  password: string;
  username: string;
}

export const createAccount = async (input: registerInput) => {
  try {
    // log.info('Creating account');
    let { username, password } = input;
    let salt = await bcrypt.genSalt(authConfig.salt);
    let hash: string = await bcrypt.hash(password, salt);
    password = hash;

    let checkResult = findOneAccountByUsername(username);
    if (checkResult != null) {
      log.error('Username already exist');
      return false;
    }

    await prisma.user.create({
      data: {
        username,
        password,
      },
    });
    // log.info(result);

    return true;
  } catch (error: any) {
    log.error('Error in creating account');
    throw error;
  }
};

export const findOneAccountByUsername = async (username: string) => {
  let result = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  return result;
};

export const checkPassword = async (
  inputPassword: string,
  password: string
) => {
  let isValid = await bcrypt.compare(inputPassword, password);
  return isValid;
};
